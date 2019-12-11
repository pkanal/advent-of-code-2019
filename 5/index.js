const { textFileToArray } = require("../helpers");
const { interpret } = require("./5");

const main = async () => {
  const data = await textFileToArray("5/5.data.txt", ",");
  const code = data.map(e => parseInt(e, 10));
  console.log("5.1", interpret(code, 1).output);
  console.log("5.2", interpret(code, 5).output);
};

main();
