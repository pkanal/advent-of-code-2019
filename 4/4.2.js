const { hasNoDecreasingDigits } = require("./4.1");

const hasAtLeastOneExclusiveAdjacentPair = passwordAsArray => {
  const pairs = passwordAsArray.reduce((acc, val, index, array) => {
    return val === array[index - 1] && val !== array[index - 2]
      ? { ...acc, [val]: acc[val] + 1 || 0 }
      : { ...acc, [val]: acc[val] - 1 || 0 };
  }, {});
  return Object.values(pairs).includes(1);
};

const isMoreAccurateValidPassword = password => {
  const passwordAsArray = password
    .toString()
    .split("")
    .map(s => parseInt(s, 10));

  return (
    passwordAsArray.length === 6 &&
    hasAtLeastOneExclusiveAdjacentPair(passwordAsArray) &&
    hasNoDecreasingDigits(passwordAsArray)
  );
};

module.exports = {
  isMoreAccurateValidPassword
};
