export function addLine({ ctx, x1, y1, x2, y2, color='black', lineWidth=1 }) {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

export function addText({ ctx, text, font='16px serif', x, y }) {
  ctx.font = font;
  ctx.fillText(text, x, y);
};

export function addPath({ ctx, path, color='black', lineWidth=1 }) {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.moveTo(path[0].x, path[0].y);
  path.forEach((point, index) => {
    if (!index) {
      return;
    }

    ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();
}
