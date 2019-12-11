const { find, propEq } = require("ramda");

const parseOrbitData = data =>
  data.map(orbit => {
    const [parent, planet] = orbit.split(")");
    return { id: planet, parentId: parent };
  });

const findParents = (target, data, state = []) => {
  const parent = find(propEq("id", target), data).parentId;
  return parent === "COM"
    ? [...state, parent]
    : findParents(parent, data, [...state, parent]);
};

const countOrbits = data => {
  const parsedOrbitData = parseOrbitData(data);
  return parsedOrbitData.reduce((count, planet, i, array) => {
    const parents = findParents(planet.id, array);
    return count + parents.length;
  }, 0);
};

module.exports = {
  findParents,
  countOrbits,
  parseOrbitData
};
