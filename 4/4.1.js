// It is a six-digit number.
// The value is within the range given in your puzzle input.
// Two adjacent digits are the same (like 22 in 122345).
// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).

// 111111 meets these criteria (double 11, never decreases).
// 223450 does not meet these criteria (decreasing pair of digits 50).
// 123789 does not meet these criteria (no double).

const isValidPassword = password => {
  const passwordAsArray = password
    .toString()
    .split("")
    .map(s => parseInt(s, 10));
  // two adjacent digits are the same
  const hasTwoSameAdjacentDigits = passwordAsArray.reduce(
    (acc, val, index, array) => {
      if (acc === true) {
        return acc;
      }
      if (index === 0) {
        return false;
      }

      return val === array[index - 1];
    },
    false
  );

  // has no decreasing digits
  const hasNoDecreasingDigits = passwordAsArray.reduce(
    (acc, val, index, array) => {
      if (index === 0) {
        return null;
      }

      if (acc === false) {
        return acc;
      }
      return val >= array[index - 1];
    },
    null
  );

  return (
    passwordAsArray.length === 6 &&
    hasTwoSameAdjacentDigits &&
    hasNoDecreasingDigits
  );
};

const getPossiblePasswordsInRange = (min, max) => {
  const range = (start, end, length = end - start) =>
    Array.from({ length }, (_, i) => start + i);

  const passwords = range(min, max + 1);

  return passwords.reduce((possiblePasswordsCount, password) => {
    // console.log(password, isValidPassword(password));
    return isValidPassword(password)
      ? possiblePasswordsCount + 1
      : possiblePasswordsCount;
  }, 0);
};

module.exports = {
  isValidPassword,
  getPossiblePasswordsInRange
};
