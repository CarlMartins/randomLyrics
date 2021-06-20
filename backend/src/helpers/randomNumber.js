function rndInt() {
  let result = Math.floor(Math.random() * 300000) + 1;
  return result;
};

module.exports = rndInt;