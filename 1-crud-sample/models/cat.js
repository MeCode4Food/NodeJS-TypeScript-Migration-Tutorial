module.exports = class Cat {
  constructor(name) {
    this.name = name;
    this.microchipId = null;
  }

  get details() {
    return {
      name: this.name,
      microchipId: this.microchipId
    }
  }
}