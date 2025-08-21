export const DIR = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
} 

export function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n))
}

/**
 * Move a position on an N x N grid.
 * @param {{x:number, y:number}} pos  Current position
 * @param {'UP'|'DOWN'|'LEFT'|'RIGHT'} dir  Direction
 * @param {number} size  Grid size (e.g., 3 for 3x3)
 * @returns {{x:number, y:number}} New position
 */
export function move(pos, dir, size) {
    const last  = size - 1
    switch (dir) {
        case DIR.UP:
            return { x: clamp(pos.x - 1, 0, last), y: pos.y }
        case DIR.DOWN:
            return { x: clamp(pos.x + 1, 0, last), y: pos.y }
        case DIR.LEFT:
            return { x: pos.x, y: clamp(pos.y - 1, 0, last) }
        case DIR.RIGHT:
            return { x: pos.x, y: clamp(pos.y + 1, 0, last) }
        default:
            return pos
    }
}

export function idxToRC(idx, size) {
  return { x: Math.floor(idx / size), y: idx % size };
}
export function rcToIdx({ x, y }, size) {
  return x * size + y;
}
export function moveIndex(idx, dir, size) {
  const pos = idxToRC(idx, size);
  const next = move(pos, dir, size); // reuse the earlier function
  return rcToIdx(next, size);
}