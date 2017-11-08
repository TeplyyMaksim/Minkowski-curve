import { addLine } from './generateShape';

export default function (data) {
  const x1 = data.coords.x - data.lineWidth / 2,
    x2 = data.coords.x + data.lineWidth / 2;

  if (x1 < 0
    || x1 > data.areaWidth
    || x2 < 0
    || x2 > data.areaWidth
    || data.coords.y < 0
    || data.coords.y > data.areaHeight) {
    return null;
  }

  addLine({ x1, x2, ctx: data.ctx, y1: data.coords.y, y2: data.coords.y });

  return [{ x: x1, y: data.coords.y, iterator: true }, { x: x2, y: data.coords.y }];
}
