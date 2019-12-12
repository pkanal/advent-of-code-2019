const { textFileToArray } = require("../helpers");
const { countOrbits } = require("./6.1");
const { calculateOrbitalTransfers } = require("./6.2");

const main = async () => {
  const data = await textFileToArray("6/6.data.txt");
  console.log("6.1:", countOrbits(data));
  console.log("6.2:", calculateOrbitalTransfers("YOU", "SAN", data));
};

main();
