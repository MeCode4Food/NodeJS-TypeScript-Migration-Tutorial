import uuidv4 from 'uuid/v4';

const createMicrochipId = (animalName, animalType) => {
  return `${uuidv4()}-${animalType}-${animalName}`;
}

export default createMicrochipId