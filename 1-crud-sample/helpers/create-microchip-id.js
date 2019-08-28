const uuidv4 = require('uuid/v4');

module.exports = createMicrochipId = (animalName, animalType) => {
  return `${uuidv4()}-${animalType}-${animalName}`;
}