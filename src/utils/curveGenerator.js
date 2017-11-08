export function iterateForward(points) {
  const fullPoints = points;
  let iteratorPointIndex = points.findIndex(point => point.iterator);

  if (iteratorPointIndex === points.length - 1) {
    delete fullPoints[iteratorPointIndex].iterator;
    iteratorPointIndex = 0;
  }

  delete fullPoints[iteratorPointIndex].iterator;
  fullPoints[iteratorPointIndex + 1].iterator = true;

  fullPoints[iteratorPointIndex] = defragmentPath(fullPoints[iteratorPointIndex], fullPoints[iteratorPointIndex + 1]);
  return fullPoints.reduce((prev, next) => prev.concat(next), []);
}

function defragmentPath(point1, point9) {
  const point2 = {
      x: point1.x + (point9.x - point1.x) * 1/4,
      y: point1.y + (point9.y - point1.y) * 1/4
    },
    point5 = {
      x: point1.x + (point9.x - point1.x) * 2/4,
      y: point1.y + (point9.y - point1.y) * 2/4
    },
    point8 = {
      x: point1.x + (point9.x - point1.x) * 3/4,
      y: point1.y + (point9.y - point1.y) * 3/4
    },

    point3 = {
      x: point2.x + (point5.x - point2.x) * 0 - (-1) * (point5.y - point2.y),
      y: point2.y + (point5.x - point2.x) * (-1) + 0 * (point5.y - point2.y)
    },
    point4 = {
      x: point3.x + (point5.x - point2.x),
      y: point3.y + (point5.y - point2.y)
    },

    point6 = {
      x: point5.x + (point8.x - point5.x) * 0 - 1 * (point8.y - point5.y),
      y: point5.y + (point8.x - point5.x) * 1 + 0 * (point8.y - point5.y)
    },
    point7 = {
      x: point6.x + (point8.x - point5.x),
      y: point6.y + (point8.y - point5.y)
    };

  return [point1, point2, point3, point4, point5, point6, point7, point8];
}

// TODO: Future update
export function iterateBackward(points) {
  const fullPoints = points;
  let iteratorPointIndex = points.findIndex(point => point.iterator);

  console.log(fullPoints, iteratorPointIndex);

  fullPoints[iteratorPointIndex - 8].iterator = true;
  fullPoints.splice(iteratorPointIndex - 7, 8);


  return fullPoints;
}
