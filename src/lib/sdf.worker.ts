// Background thread for the footer wordmark's distance-field atlas: the main
// thread only rasterises each glyph; the distance transform runs here.
import { compositeGlyph, signedDistance } from './sdf';

interface Scope {
  onmessage: ((e: MessageEvent) => void) | null;
  postMessage(message: unknown, transfer: Transferable[]): void;
}

const scope = self as unknown as Scope;
let atlas = new Uint8Array(0);
let atlasWidth = 0;
let spread = 1;

scope.onmessage = (e) => {
  const msg = e.data;
  if (msg.type === 'init') {
    atlas = new Uint8Array(msg.width * msg.height * 2);
    atlasWidth = msg.width;
    spread = msg.spread;
  } else if (msg.type === 'glyph') {
    const dist = signedDistance(msg.rgba, msg.width, msg.height);
    compositeGlyph(atlas, atlasWidth, dist, msg.width, msg.height, msg.x0, msg.y0, msg.channel, spread);
  } else if (msg.type === 'finish') {
    scope.postMessage({ type: 'done', data: atlas }, [atlas.buffer]);
    atlas = new Uint8Array(0);
  }
};
