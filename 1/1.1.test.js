const {
  fuelCaluclator,
  moduleMassesToFuel,
  counterUpper,
  fuelCounterUpper
} = require("./1.1");

describe("Fuel calulation", () => {
  test("example one", () => {
    expect(fuelCaluclator(12)).toBe(2);
  });
  test("example two", () => {
    expect(fuelCaluclator(14)).toBe(2);
  });
  test("example three", () => {
    expect(fuelCaluclator(1969)).toBe(654);
  });
  test("example four", () => {
    expect(fuelCaluclator(100756)).toBe(33583);
  });
});

describe("Fuel Counter-Upper", () => {
  test("calculates fuel each module and returns an array", () => {
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
