function rndInt(maxValue) {
  let result = Math.floor(Math.random() * maxValue) + 1;
  return result;
};

module.exports = rndInt;