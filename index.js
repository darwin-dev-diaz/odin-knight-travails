const legalMoves = Array.from({ length: 64 }, () => []);

const hash = (arr) => arr[0] * 8 + arr[1];

const getLegalMoves = (coords) => {
  const returnArr = [];
  const dX = [1, 2, 2, 1, -1, -2, -2, -1];
  const dY = [2, 1, -1, -2, -2, -1, 1, 1];
  for (let i = 0; i < 8; i++) {
    returnArr.push([coords[0] + dX[i], coords[1] + dY[i]]);
  }
  return returnArr.filter(
    (x) => x[0] > -1 && x[0] < 8 && x[1] > -1 && x[1] < 8
  );
};

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const index = hash([i, j]);
    legalMoves[index].push(...getLegalMoves([i, j]));
  }
}

const knightMoves = (startCoords, goalCoords, moveCount = 0) => {
  if (moveCount > 6) return false;
  else if (JSON.stringify(startCoords) === JSON.stringify(goalCoords))
    return [startCoords];

  const previousDistance = [
    Math.abs(startCoords[0] - goalCoords[0]),
    Math.abs(startCoords[1] - goalCoords[1]),
  ];
  const moves = legalMoves[hash(startCoords)];
  const closerMoves = moves.filter((move) => {
    const newDistance = [
      Math.abs(move[0] - goalCoords[0]),
      Math.abs(move[1] - goalCoords[1]),
    ];
    return (
      newDistance[0] < previousDistance[0] ||
      newDistance[1] < previousDistance[1]
    );
  });

  const legalChains = closerMoves
    .map((move) => {
      return [startCoords].concat(knightMoves(move, goalCoords, moveCount + 1));
    })
    .filter((chain) => chain[chain.length - 1]);

  if (!legalChains.length) return false;

  // returns shortest path to goal
  return legalChains.reduce((prev, next) =>
    prev.length > next.length ? next : prev
  );
};