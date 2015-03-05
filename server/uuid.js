var uuidTemplate = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

function randomHex() {
  return (Math.floor(Math.random() * 16)).toString(16);
}

function uuid() {
  return uuidTemplate.replace(/x/g, function(match) {
    return randomHex();
  });
}

module.exports = {
  uuid: uuid
};