const add = (n, m) => n + m;
const multiply = (x, y) => x * y;

const interpret = array => {
  return array.reduce((acc, number, index) => {
    if (index % 4 !== 0) {
      return acc;
    }

    const optCode = number;

    if (optCode !== 1 && optCode !== 2) {
      return acc;
    }

    const positionOne = acc[index + 1];
    const positionTwo = acc[index + 2];
    const writePosition = acc[index + 3];
    let result;

    if (optCode === 1) {
      result = add(acc[positionOne], acc[positionTwo]);
      acc[writePosition] = result;
      return acc;
    }

    if (optCode === 2) {
      result = multiply(acc[positionOne], acc[positionTwo]);
    }

    acc[writePosition] = result;
    return acc;
  }, array);
};

module.exports = {
  add,
  multiply,
  interpret
};
