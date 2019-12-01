const { textFileToArray } = require("../helpers");
const { fuelCounterUpper } = require("./1.1");
const { moreAccurateFuelCounterUpper } = require("./1.2");

const main = async () => {
  const moduleMasses = await textFileToArray("1/1.data.txt");
  console.log("1.1:", fuelCounterUpper(moduleMasses));
  console.log("1.2:", moreAccurateFuelCounterUpper(moduleMasses));
};

main();
