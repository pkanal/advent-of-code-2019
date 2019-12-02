const { add, multiply, interpret } = require("./2.1");

describe("Operations", () => {
  test("addition", () => {
    expect(add(10, 40)).toBe(50);
  });

  test("multiplication", () => {
    expect(multiply(70, 50)).toBe(3500);
  });
});

describe("Interpret Opt Code", () => {
  test("example one", () => {
    expect(interpret([1, 0, 0, 0, 99])).toEqual([2, 0, 0, 0, 99]);
  });
  test("example one", () => {
    expect(interpret([2, 3, 0, 3, 99])).toEqual([2, 3, 0, 6, 99]);
  });
  test("example one", () => {
    expect(interpret([2, 4, 4, 5, 99, 0])).toEqual([2, 4, 4, 5, 99, 9801]);
  });
  test("example one", () => {
    expect(interpret([1, 1, 1, 4, 99, 5, 6, 0, 99])).toEqual([
      30,
      1,
      1,
      4,
      2,
      5,
      6,
      0,
      99
    ]);
  });
});
