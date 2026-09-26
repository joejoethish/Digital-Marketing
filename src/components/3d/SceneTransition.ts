export class SceneTransition {
  public static lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
  }

  public static easeInOut(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  public static easeOutQuad(t: number): number {
    return 1 - (1 - t) * (1 - t);
  }

  /**
   * Calculates continuous scroll transition state for a scene index given total scroll progress
   */
  public static getSceneState(sceneIndex: number, scrollProgress: number, totalScenes: number = 6) {
    const total = totalScenes - 1;
    const scaled = Math.min(scrollProgress * total, total - 0.0001);
    const dist = sceneIndex - scaled;
    const absDist = Math.abs(dist);

    let opacity = 0;
    if (absDist < 0.75) {
      opacity = 1 - absDist * 0.5;
    } else if (absDist < 1.2) {
      opacity = (1.2 - absDist) * 1.25;
    }

    const depthOffset = dist * -2.2;
    const scaleFactor = 1 - Math.min(absDist * 0.15, 0.4);

    return {
      active: absDist < 1.0,
      opacity: Math.max(0, Math.min(1, opacity)),
      depthOffset,
      scaleFactor,
      dist,
    };
  }
}
