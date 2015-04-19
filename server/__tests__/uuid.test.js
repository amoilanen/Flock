jest.dontMock('../uuid.js');

var {uuid} = require('../uuid.js');

describe('uuid', function() {

  var originalMathRandom = Math.random;

  afterEach(function() {
    Math.random = originalMathRandom;
  });

  it('should fit the format', function() {
    var uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

    expect(uuid().match(uuidRegex)).not.toBe(null);
  });

  it('should be random', function() {
    Math.random = jest.genMockFunction().mockReturnValue(0);

    expect(uuid()).toBe('00000000-0000-0000-0000-000000000000');
  });
});