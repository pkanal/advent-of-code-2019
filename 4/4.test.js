const { isValidPassword, getPossiblePasswordsInRange } = require("./4.1");

describe("valid password checks", () => {
  test("all the same number should be valid", () => {
    expect(isValidPassword(111111)).toBeTruthy();
  });
  test("increasing with a double adjacent number should be valid", () => {
    expect(isValidPassword(122345)).toBeTruthy();
  });
  test("decreasing pair should be invalid", () => {
    expect(isValidPassword(223450)).toBeFalsy();
  });
  test("no doubles should be invalid", () => {
    expect(isValidPassword(123789)).toBeFalsy();
  });

  test("decreasing pair should be invalid", () => {
    expect(isValidPassword(786399)).toBeFalsy();
  });

  test("password in range should be valid", () => {
    expect(isValidPassword(247789)).toBeTruthy();
  });
});

// describe("get possible passwords in range", () => {
//   test("less than 6 digits should be 0", () => {
//     expect(getPossiblePasswordsInRange(1, 10)).toBe(0);
//   });
// });
