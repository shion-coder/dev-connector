const { MONGO_URI, SECRET_OR_KEY } = process.env;

module.exports = {
  mongoURI: MONGO_URI,
  secretOrKey: SECRET_OR_KEY,
};
