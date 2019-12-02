const { textFileToArray } = require("../helpers");
const { interpret } = require("./2.1");
const { bruteForceGetInputs, replaceInputs } = require("./2.2");

const main = async () => {
  const data = await textFileToArray("2/2.data.txt", ",");
  // restore to 1202 error code
  const code = data.map(e => parseInt(e, 10));
  const errorCodeOpCode = replaceInputs(12, 2, code);
  console.log("2.1:", interpret(errorCodeOpCode)[0]);

  // brute force to find inputs from 0 - 99 that give an output of 19690720
  const combination = bruteForceGetInputs(19690720, code);
  console.log("2.2:", 100 * combination[0] + combination[1]);
};

main();
