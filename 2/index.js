const { textFileToArray } = require("../helpers");
const { interpret } = require("./2.1");

const main = async () => {
  let code = await textFileToArray("2/2.data.txt", ",");
  // restore to 1202 error code
  code = code.map(e => parseInt(e, 10));
  code[1] = 12;
  code[2] = 2;
  console.log("2.1:", interpret(code));
};

main();
