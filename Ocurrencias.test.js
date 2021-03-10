const Ocurrencias = require('./Ocurrencias');

test('retorna test passed si la candidad de genes esperados concuerda con la cantidad de genes mutantes en la matriz', () => {
    expect(Ocurrencias([
        "AAAAT",
        "AAACT",
        "TAAAG",
        "TAAAA",
        "AGCAT"
    ])).toBe(7);
});
