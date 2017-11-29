const colors = require('colors');

module.exports = {
  errorMessage : str => {
    return str.red;
  },
  infoMessage : str => {
    return str.green;
  }
};
