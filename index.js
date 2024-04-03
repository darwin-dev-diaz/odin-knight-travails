const legalMoves = Array.from({ length: 64 }, () => []);

const hash = (arr) => {
  return arr[0] * 8 + arr[1];
};

const getLegalMoves = (coords) => {
  const returnArr = [];
  returnArr.push([coords[0] + 1, coords[1] + 2]);
  returnArr.push([coords[0] + 2, coords[1] + 1]);
  returnArr.push([coords[0] + 2, coords[1] - 1]);
  returnArr.push([coords[0] + 1, coords[1] - 2]);
  returnArr.push([coords[0] - 1, coords[1] - 2]);
  returnArr.push([coords[0] - 2, coords[1] - 1]);
  returnArr.push([coords[0] - 2, coords[1] + 1]);
  returnArr.push([coords[0] - 1, coords[1] + 2]);
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
  // base case: the move count is greater than 6
  if (moveCount > 6) return false;
  // base case: the knight is on goalCoords
  else if (JSON.stringify(startCoords) === JSON.stringify(goalCoords)) {
    return [startCoords];
  }
  // all possible moves
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

  const moveChainList = closerMoves.map((move) => {
    const moveChain = [startCoords].concat(
      knightMoves(move, goalCoords, moveCount + 1)
    );
    return moveChain;
  });
  const legalChains = moveChainList.filter((chain) => chain[chain.length - 1]);
  if (!legalChains.length) return false;

  const shortestPath = legalChains.reduce((prev, next) =>
    prev.length > next.length ? next : prev
  );
  return shortestPath;
};

console.log(knightMoves([0, 0], [7, 7]));
console.log();
console.log(knightMoves([0, 0], [2, 1])); // 1 move
console.log();
console.log(knightMoves([0, 0], [1, 2])); // 1 move
console.log();
console.log(knightMoves([0, 0], [3, 3])); // 2 moves
console.log();
console.log(knightMoves([4, 4], [4, 4])); // 0 moves
console.log();
console.log(knightMoves([0, 0], [7, 7])); // 6 moves
console.log();
console.log(knightMoves([7, 0], [0, 7])); // 5 moves
console.log();
console.log(knightMoves([0, 0], [6, 2])); // 4 moves
console.log();
console.log(knightMoves([7, 7], [5, 5])); // 4 moves
console.log();
console.log(knightMoves([2, 1], [0, 0])); // 1 move
console.log();
console.log(knightMoves([2, 1], [4, 2])); // 1 move
console.log();
console.log(knightMoves([3, 3], [4, 5])); // 1 move
console.log();
console.log(knightMoves([6, 6], [7, 4])); // 1 move
console.log();
console.log(knightMoves([1, 0], [2, 2])); // 2 moves
console.log();
