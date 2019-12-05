const { isValidPassword, getPossiblePasswordsInRange } = require("./4.1");
const { isMoreAccurateValidPassword } = require("./4.2");

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

describe("get possible passwords in range", () => {
  test("less than 6 digits should be 0", () => {
    expect(getPossiblePasswordsInRange(1, 10, isValidPassword)).toBe(0);
  });
});

describe("More accurate password validation checks", () => {
  test("all the same number should be invalid", () => {
    expect(isMoreAccurateValidPassword(111111)).toBeFalsy();
  });
  test("repeats and increases should be valid", () => {
    expect(isMoreAccurateValidPassword(112233)).toBeTruthy();
  });
  test("more than 2 adjacent numbers should be invalid", () => {
    expect(isMoreAccurateValidPassword(123444)).toBeFalsy();
  });
  test("more than 2 adjacent numbers should be valid", () => {
    expect(isMoreAccurateValidPassword(223444)).toBeTruthy();
  });
  test("more than two adjacent numbers but one correct adjacent pair should be valid", () => {
    expect(isMoreAccurateValidPassword(111122)).toBeTruthy();
  });
  test("more than two adjacent numbers but one correct adjacent pair should be valid", () => {
    expect(isMoreAccurateValidPassword(112222)).toBeTruthy();
  });
});
