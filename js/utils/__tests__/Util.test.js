jest.dontMock('../Util.js');

var Util = require('../Util');

describe('Util', function() {

  describe('capitalize', function() {

    it('should capitalize first letter', function() {
      expect(Util.capitalize('abcdef')).toBe('Abcdef');
    });

    it('should return empty string for empty string', function() {
      expect(Util.capitalize('')).toBe('');
    });

    it('should capitalize single letter string', function() {
      expect(Util.capitalize('a')).toBe('A');
    });

    it('should not fail on null', function() {
      expect(Util.capitalize(null)).toBe(null);
    });

    it('should not fail on undefined', function() {
      expect(Util.capitalize()).toBe(void 0);
    });

    it('should not fail on non-string', function() {
      expect(Util.capitalize(201)).toBe(201);
    });
  });
});