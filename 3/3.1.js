const { sort, head } = require("ramda");

const parsePathString = pathString => {
  const array = pathString.split("");
  const direction = head(pathString);
  const distance = parseInt(array.splice(1, array.length).join(""), 10);

  return [direction, distance];
};

const calculateNextMove = (currentPosition, pathString) => {
  const [x, y] = currentPosition;
  const [direction, distance] = parsePathString(pathString);
  const distanceMarkers = [...Array(distance + 1).keys()].splice(1, distance);
  switch (direction) {
    case "U":
      return distanceMarkers.map(d => [x, y + d]);
    case "D":
      return distanceMarkers.map(d => [x, y - d]);
    case "R":
      return distanceMarkers.map(d => [x + d, y]);
    case "L":
      return distanceMarkers.map(d => [x - d, y]);
    default:
      throw Error("No direction");
  }
};

const getCoordinates = path =>
  path.reduce(
    (coordinates, pathString, i) => {
      const currentPosition = coordinates[coordinates.length - 1];
      const nextPosition = calculateNextMove(currentPosition, pathString);
      return [...coordinates, ...nextPosition];
    },
    [[0, 0]]
  );

// TODO: make this better than O(n^2) :grimacing:
const findIntersections = (first, second) => {
  const firstStrings = first.map(e => e.join(","));
  const secondStrings = second.map(e => e.join(","));
  return firstStrings
    .filter(s => secondStrings.includes(s) && s !== "0,0")
    .map(s => s.split(",").map(n => parseInt(n, 10)));
};

const findClosestIntersection = (firstPath, secondPath) => {
  const firstAbsolutePath = getCoordinates(firstPath);
  const secondAbsolutePath = getCoordinates(secondPath);

  const intersections = findIntersections(
    firstAbsolutePath,
    secondAbsolutePath
  );

  const manhattanDistances = intersections.map(intersection => {
    return Math.abs(intersection[0]) + Math.abs(intersection[1]);
  });

  const diff = function(a, b) {
    return a - b;
  };

  return head(sort(diff, manhattanDistances));
};

module.exports = {
  calculateNextMove,
  getCoordinates,
  findIntersections,
  findClosestIntersection,
  parsePathString
};
