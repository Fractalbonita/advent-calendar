// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('./db.json');
// Improve random pick by using the Fisher-Yates Algorithm, since this method has bias

module.exports = () => {
  return { beers: db.beers.sort(() => (Math.random() > 0.5 ? 1 : -1)) };
};
