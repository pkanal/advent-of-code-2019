const fs = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);

const textFileToArray = async filename => {
  const data = await readFileAsync(filename);
  return data.toString().split("\n");
};

module.exports = {
  textFileToArray
};
