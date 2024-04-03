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
    legalMoves[index].push(...getLegalMoves([i,j]))
  }
}

const knightMoves = (startCoords, goalCoords, moveCount = 0) => {
  // base case: the move count is greater than 6
  if (moveCount > 6) return false;
  // base case: the knight is on goalCoords
  if (JSON.stringify(startCoords) === JSON.stringify(goalCoords)) {
    console.log("You made it to the goal");
    return goalCoords;
  }

  // print all possible moves
};