const { findIndex, equals, sort, head } = require("ramda");
const { getCoordinates, findIntersections } = require("./3.1");

const calculateStepsToIntersection = (intersection, wirePath) => {
  return findIndex(equals(intersection), wirePath);
};

const calculateStepsToMinimizeSignalDelay = (firstPath, secondPath) => {
  const firstAbsolutePath = getCoordinates(firstPath);
  const secondAbsolutePath = getCoordinates(secondPath);

  const intersections = findIntersections(
    firstAbsolutePath,
    secondAbsolutePath
  );

  const stepsToIntersections = intersections.map(
    intersection =>
      calculateStepsToIntersection(intersection, firstAbsolutePath) +
      calculateStepsToIntersection(intersection, secondAbsolutePath)
  );

  const diff = function(a, b) {
    return a - b;
  };

  return head(sort(diff, stepsToIntersections));
};

module.exports = {
  calculateStepsToIntersection,
  calculateStepsToMinimizeSignalDelay
};
