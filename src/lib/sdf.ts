// Signed distance fields from anti-aliased glyph bitmaps, using the linear-time
// Euclidean distance transform of Felzenszwalb & Huttenlocher (the approach
// popularised by Mapbox's TinySDF). A distance field lets the GPU draw text
// razor-sharp at any zoom from one small texture.

const INF = 1e20;

/** 1D squared-distance transform of `length` samples in `grid`, in place. */
function edt1d(
  grid: Float64Array,
  offset: number,
  stride: number,
  length: number,
  f: Float64Array,
  v: Int32Array,
  z: Float64Array,
) {
  v[0] = 0;
  z[0] = -INF;
  z[1] = INF;
  f[0] = grid[offset];
  for (let q = 1, k = 0, s = 0; q < length; q++) {
    f[q] = grid[offset + q * stride];
    const q2 = q * q;
    do {
      const r = v[k];
      s = (f[q] - f[r] + q2 - r * r) / (q - r) / 2;
    } while (s <= z[k] && --k > -1);
    k++;
    v[k] = q;
    z[k] = s;
    z[k + 1] = INF;
  }
  for (let q = 0, k = 0; q < length; q++) {
    while (z[k + 1] < q) k++;
    const r = v[k];
    const qr = q - r;
    grid[offset + q * stride] = f[r] + qr * qr;
  }
}

function edt(grid: Float64Array, width: number, height: number) {
  const n = Math.max(width, height);
  const f = new Float64Array(n);
  const v = new Int32Array(n);
  const z = new Float64Array(n + 1);
  for (let x = 0; x < width; x++) edt1d(grid, x, width, height, f, v, z);
  for (let y = 0; y < height; y++) edt1d(grid, y * width, 1, width, f, v, z);
}

/**
 * Signed distance (in pixels, positive inside the shape) for every pixel of an
 * RGBA bitmap whose alpha channel holds anti-aliased coverage.
 */
export function signedDistance(rgba: Uint8ClampedArray, width: number, height: number): Float32Array {
  const size = width * height;
  const outer = new Float64Array(size);
  const inner = new Float64Array(size);
  for (let i = 0; i < size; i++) {
    const a = rgba[i * 4 + 3] / 255;
    if (a >= 1) {
      outer[i] = 0;
      inner[i] = INF;
    } else if (a <= 0) {
      outer[i] = INF;
      inner[i] = 0;
    } else {
      // Partial coverage places the edge inside the pixel (sub-pixel accuracy).
      const d = 0.5 - a;
      outer[i] = d > 0 ? d * d : 0;
      inner[i] = d < 0 ? d * d : 0;
    }
  }
  edt(outer, width, height);
  edt(inner, width, height);
  const out = new Float32Array(size);
  for (let i = 0; i < size; i++) out[i] = Math.sqrt(inner[i]) - Math.sqrt(outer[i]);
  return out;
}

/**
 * Writes a glyph's signed distances into a two-channel (LUMINANCE_ALPHA) atlas,
 * encoded as 0.5 ± distance / (2 · spread), keeping the max where glyphs meet.
 */
export function compositeGlyph(
  atlas: Uint8Array,
  atlasWidth: number,
  dist: Float32Array,
  width: number,
  height: number,
  x0: number,
  y0: number,
  channel: number,
  spread: number,
) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const d = 0.5 + dist[y * width + x] / (2 * spread);
      const v = Math.round((d < 0 ? 0 : d > 1 ? 1 : d) * 255);
      const k = ((y0 + y) * atlasWidth + x0 + x) * 2 + channel;
      if (v > atlas[k]) atlas[k] = v;
    }
  }
}
