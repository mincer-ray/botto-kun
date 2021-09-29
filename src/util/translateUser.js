const cache = require('memory-cache');

// doesnt really work? unclear
const translateUser = (id) => cache.get('users')[id];

module.exports = translateUser;
