import { addLine } from './generateShape';

export function generateGrid ({ ctx, gridStep, areaWidth, areaHeight }) {
  for(let i = gridStep; i < areaWidth; i += gridStep) {
    addLine({ ctx, x1: i, y1: 0, x2: i, y2: areaHeight, lineWidth: 0.1 });
  }
  for(let i = gridStep; i < areaHeight; i += gridStep) {
    addLine({ ctx, x1: 0, y1: i, x2: areaWidth, y2: i, lineWidth: 0.1 });
  }

  // Middle point
  ctx.beginPath();
  ctx.arc(areaWidth / 2, areaHeight / 2, 3, 0, 2 * Math.PI, true);
  ctx.fill();
}

export function reloadCanvas ({ ctx, newGridStep, areaWidth, areaHeight }) {
  ctx.clearRect(0, 0, areaWidth, areaHeight);
  generateGrid({ ctx, areaHeight, areaWidth, gridStep: newGridStep });
}
