const {
  fuelCalculator,
  moduleMassesToFuel,
  counterUpper,
  fuelCounterUpper
} = require("./1.1");

const {
  recursiveFuelCalculator,
  moreAccurateModuleMassesToFuel,
  moreAccurateFuelCounterUpper
} = require("./1.2");

describe("Basic fuel calulation", () => {
  test("example one", () => {
    expect(fuelCalculator(12)).toBe(2);
  });
  test("example two", () => {
    expect(fuelCalculator(14)).toBe(2);
  });
  test("example three", () => {
    expect(fuelCalculator(1969)).toBe(654);
  });
  test("example four", () => {
    expect(fuelCalculator(100756)).toBe(33583);
  });
});

describe("Fuel Counter-Upper", () => {
  test("calculates fuel for each module and returns an array", () => {
    const moduleMasses = [12, 14, 1969, 100756];
    expect(moduleMassesToFuel(moduleMasses)).toEqual([2, 2, 654, 33583]);
  });
  test("adds up an array of numbers", () => {
    const fuelNumbers = [2, 2, 654, 33583];
    expect(counterUpper(fuelNumbers)).toBe(34241);
  });

  test("maps module mass to fuel and adds them up", () => {
    const moduleMasses = [12, 14, 1969, 100756];
    expect(fuelCounterUpper(moduleMasses)).toBe(34241);
  });
});

describe("Fuel calculator that takes fuel mass into account", () => {
  test("example one", () => {
    expect(recursiveFuelCalculator(12)).toBe(2);
  });

  test("example two", () => {
    expect(recursiveFuelCalculator(1969)).toBe(966);
  });

  test("example three", () => {
    expect(recursiveFuelCalculator(100756)).toBe(50346);
  });
});

describe("More accurate fuel Counter-Upper", () => {
  test("calculates true fuel for each module and returns an array", () => {
    const moduleMasses = [14, 1969, 100756];
    expect(moreAccurateModuleMassesToFuel(moduleMasses)).toEqual([
      2,
      966,
      50346
    ]);
  });

  test("calculates total fuel required for all modules, with fuel mass accounted for", () => {
    const moduleMasses = [14, 1969, 100756];
    expect(moreAccurateFuelCounterUpper(moduleMasses)).toBe(51314);
  });
});
