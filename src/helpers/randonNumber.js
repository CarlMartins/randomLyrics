function getRandom() {
    let min = 1;
    let max = 3000000;
    return Math.random() * (max - min) + min;
}

module.exports = getRandom;