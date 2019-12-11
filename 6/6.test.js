const { findParents, countOrbits, parseOrbitData } = require("./6.1");

`
COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
`;

describe("parse raw data", () => {
  const rawData = [
    "COM)B",
    "B)C",
    "C)D",
    "D)E",
    "E)F",
    "B)G",
    "G)H",
    "D)I",
    "E)J",
    "J)K",
    "K)L"
  ];

  const parsedData = [
    { id: "B", parentId: "COM" },
    { id: "C", parentId: "B" },
    { id: "D", parentId: "C" },
    { id: "E", parentId: "D" },
    { id: "F", parentId: "E" },
    { id: "G", parentId: "B" },
    { id: "H", parentId: "G" },
    { id: "I", parentId: "D" },
    { id: "J", parentId: "E" },
    { id: "K", parentId: "J" },
    { id: "L", parentId: "K" }
  ];

  test("parse raw orbit data into an array", () => {
    expect(parseOrbitData(rawData)).toEqual(parsedData);
  });
});

describe("find parent orbits", () => {
  const orbitalDataParsed = [
    { id: "B", parentId: "COM" },
    { id: "C", parentId: "B" },
    { id: "D", parentId: "C" },
    { id: "E", parentId: "D" },
    { id: "F", parentId: "E" },
    { id: "G", parentId: "B" },
    { id: "H", parentId: "G" },
    { id: "I", parentId: "D" },
    { id: "J", parentId: "E" },
    { id: "K", parentId: "J" },
    { id: "L", parentId: "K" }
  ];

  test("find parents for B", () => {
    expect(findParents("B", orbitalDataParsed)).toEqual(["COM"]);
  });
  test("find parents for C", () => {
    expect(findParents("C", orbitalDataParsed)).toEqual(["B", "COM"]);
  });
  test("find parents for H", () => {
    expect(findParents("H", orbitalDataParsed)).toEqual(["G", "B", "COM"]);
  });
});

describe("count parent orbits (direct and indirect)", () => {
  const rawData = [
    "COM)B",
    "B)C",
    "C)D",
    "D)E",
    "E)F",
    "B)G",
    "G)H",
    "D)I",
    "E)J",
    "J)K",
    "K)L"
  ];

  test("example one", () => {
    expect(countOrbits(rawData)).toBe(42);
  });
});
