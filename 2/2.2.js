const { interpret } = require("./2.1");

// Cartesian product lifted from
// https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

const replaceInputs = (noun, verb, opCodes) =>
  opCodes.map((e, i) => {
    if (i === 1) {
      return noun;
    }
    if (i === 2) {
      return verb;
    }
    return e;
  });

const bruteForceGetInputs = (target, opCodes) => {
  const nouns = [...Array(100).keys()];
  const verbs = [...Array(100).keys()];
  const possibleCombinations = cartesian(nouns, verbs);
  let values;

  possibleCombinations.forEach(combination => {
    const code = replaceInputs(combination[0], combination[1], opCodes);
    const result = interpret(code)[0];
    if (result === target) {
      values = combination;
    }
  });

  return values ? values : "Oops this doesn't work";
};

module.exports = {
  cartesian,
  bruteForceGetInputs,
  replaceInputs
};
