const fs = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);

const textFileToArray = async (filename, separator = "\n") => {
  const data = await readFileAsync(filename);
  return data.toString().split(separator);
};

module.exports = {
  textFileToArray
};
