const {
  getCoordinates,
  calculateNextMove,
  findIntersections,
  findClosestIntersection,
  parsePathString
} = require("./3.1");

const {
  calculateStepsToIntersection,
  calculateStepsToMinimizeSignalDelay
} = require("./3.2");

describe("Convert relative path to coordinates", () => {
  test("splits the path string with direction and distance", () => {
    expect(parsePathString("R1004")).toEqual(["R", 1004]);
  });
  test("draw path movement on absolute coordinates", () => {
    expect(calculateNextMove([0, 0], "R6")).toEqual([
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0]
    ]);
    expect(calculateNextMove([6, 0], "U7")).toEqual([
      [6, 1],
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7]
    ]);
  });
  test("get coordinates: example one", () => {
    const relativePath = ["R8", "U5", "L5", "D3"];
    expect(getCoordinates(relativePath)).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
      [8, 1],
      [8, 2],
      [8, 3],
      [8, 4],
      [8, 5],
      [7, 5],
      [6, 5],
      [5, 5],
      [4, 5],
      [3, 5],
      [3, 4],
      [3, 3],
      [3, 2]
    ]);
  });
  test("get coordinates: example two", () => {
    const relativePath = ["U7", "R6", "D4", "L4"];
    expect(getCoordinates(relativePath)).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [1, 7],
      [2, 7],
      [3, 7],
      [4, 7],
      [5, 7],
      [6, 7],
      [6, 6],
      [6, 5],
      [6, 4],
      [6, 3],
      [5, 3],
      [4, 3],
      [3, 3],
      [2, 3]
    ]);
  });
});

describe("Find intersections and determine closest intersection", () => {
  test("find duplicate points", () => {
    const firstPath = [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
      [8, 1],
      [8, 2],
      [8, 3],
      [8, 4],
      [8, 5],
      [7, 5],
      [6, 5],
      [5, 5],
      [4, 5],
      [3, 5],
      [3, 4],
      [3, 3],
      [3, 2]
    ];
    const secondPath = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [1, 7],
      [2, 7],
      [3, 7],
      [4, 7],
      [5, 7],
      [6, 7],
      [6, 6],
      [6, 5],
      [6, 4],
      [6, 3],
      [5, 3],
      [4, 3],
      [3, 3],
      [2, 3]
    ];
    expect(findIntersections(firstPath, secondPath)).toEqual([
      [6, 5],
      [3, 3]
    ]);
  });

  test("find closest intersection: example one", () => {
    const firstPath = ["R8", "U5", "L5", "D3"];
    const secondPath = ["U7", "R6", "D4", "L4"];
    expect(findClosestIntersection(firstPath, secondPath)).toBe(6);
  });
  test("find closest intersection: example two", () => {
    const firstPath = [
      "R75",
      "D30",
      "R83",
      "U83",
      "L12",
      "D49",
      "R71",
      "U7",
      "L72"
    ];
    const secondPath = ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"];
    expect(findClosestIntersection(firstPath, secondPath)).toBe(159);
  });
  test("find closest intersection: example three", () => {
    const firstPath = [
      "R98",
      "U47",
      "R26",
      "D63",
      "R33",
      "U87",
      "L62",
      "D20",
      "R33",
      "U53",
      "R51"
    ];
    const secondPath = [
      "U98",
      "R91",
      "D20",
      "R16",
      "D67",
      "R40",
      "U7",
      "R15",
      "U6",
      "R7"
    ];
    expect(findClosestIntersection(firstPath, secondPath)).toBe(135);
  });
});

describe("Calculate steps to an intersection", () => {
  const firstPath = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 4],
    [8, 5],
    [7, 5],
    [6, 5],
    [5, 5],
    [4, 5],
    [3, 5],
    [3, 4],
    [3, 3],
    [3, 2]
  ];
  const secondPath = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [1, 7],
    [2, 7],
    [3, 7],
    [4, 7],
    [5, 7],
    [6, 7],
    [6, 6],
    [6, 5],
    [6, 4],
    [6, 3],
    [5, 3],
    [4, 3],
    [3, 3],
    [2, 3]
  ];
  test("example one", () => {
    expect(calculateStepsToIntersection([3, 3], firstPath)).toBe(20);
    expect(calculateStepsToIntersection([3, 3], secondPath)).toBe(20);
  });

  test("example two", () => {
    expect(calculateStepsToIntersection([6, 5], firstPath)).toBe(15);
    expect(calculateStepsToIntersection([6, 5], secondPath)).toBe(15);
  });
});

describe("Find minimal signal delay distance", () => {
  test("example one", () => {
    const firstPath = ["R8", "U5", "L5", "D3"];
    const secondPath = ["U7", "R6", "D4", "L4"];
    expect(calculateStepsToMinimizeSignalDelay(firstPath, secondPath)).toBe(30);
  });
  test("example two", () => {
    const firstPath = [
      "R75",
      "D30",
      "R83",
      "U83",
      "L12",
      "D49",
      "R71",
      "U7",
      "L72"
    ];
    const secondPath = ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"];
    expect(calculateStepsToMinimizeSignalDelay(firstPath, secondPath)).toBe(
      610
    );
  });
  test("example three", () => {
    const firstPath = [
      "R98",
      "U47",
      "R26",
      "D63",
      "R33",
      "U87",
      "L62",
      "D20",
      "R33",
      "U53",
      "R51"
    ];
    const secondPath = [
      "U98",
      "R91",
      "D20",
      "R16",
      "D67",
      "R40",
      "U7",
      "R15",
      "U6",
      "R7"
    ];
    expect(calculateStepsToMinimizeSignalDelay(firstPath, secondPath)).toBe(
      410
    );
  });
});
