var Util = {

  capitalize: function(str) {
    return (str && str.length > 0) ?
      str[0].toUpperCase() + str.slice(1)
      : str;
  }
};

module.exports = Util;