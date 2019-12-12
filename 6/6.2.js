const { remove, findIndex } = require("ramda");
const { parseOrbitData, findParents } = require("./6.1");

const calculateOrbitalTransfers = (origin, destination, data) => {
  const parsedOrbitData = parseOrbitData(data);

  const originParents = findParents(origin, parsedOrbitData);
  const destinationParents = findParents(destination, parsedOrbitData);
  const duplicates = originParents.filter(s => destinationParents.includes(s));
  return (
    remove(
      findIndex(e => e === duplicates[0], originParents),
      duplicates.length,
      originParents
    ).length +
    remove(
      findIndex(e => e === duplicates[0], destinationParents),
      duplicates.length,
      destinationParents
    ).length
  );
};

module.exports = {
  calculateOrbitalTransfers
};
