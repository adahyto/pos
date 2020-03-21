const crypto = require("crypto");
module.exports = {
  genID: function () {
    return `${crypto.randomBytes(20).toString('hex')}`;
  }
};
