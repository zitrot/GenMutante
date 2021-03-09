const Ocurrencias = require('../Ocurrencias');

test('returns a personalized greeting', () => {
    expect(Ocurrencias([
        "AAAAT",
        "AAACT",
        "TAAAG",
        "TAAAA",
        "AGCAT"
    ])).toBe(6);
});