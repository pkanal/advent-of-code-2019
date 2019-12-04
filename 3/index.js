const { textFileToArray } = require("../helpers");
const { findClosestIntersection } = require("./3.1");

const main = async () => {
  const [path1, path2] = await textFileToArray("3/3.data.txt");
  const firstPath = path1.split(",");
  const secondPath = path2.split(",");
  console.log("3.1:", findClosestIntersection(firstPath, secondPath));
};

main();
