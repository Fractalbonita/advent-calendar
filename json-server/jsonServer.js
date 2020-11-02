// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('./db.json');
const beers = db.beers.sort(() => (Math.random() > 0.5 ? 1 : -1));

module.exports = () => {
  return { beers };
};
