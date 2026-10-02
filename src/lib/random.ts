/**
 * 確定性亂數。同一個種子永遠得到同一條痕跡，
 * 所以每次建置產出的燒痕完全一致，不會讓視覺回歸測試誤報。
 */

/** FNV-1a：字串 → 32 位元種子 */
export function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 */
export function rng(seed: string | number): () => number {
  let a = typeof seed === 'string' ? hashSeed(seed) : seed;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
