import {sum, mul, sub, div} from '.';

test('Adding 1 + 1 equals 2', () => {
    expect(sum(1, 1)).toBe(2);
});

test('Multiplying 1 * 1 equals 1', () => {
    expect(mul(1, 1)).toBe(1);
});

test('Subtracting 1 - 1 equals 0', () => {
    expect(sub(1, 1)).toBe(0);
});

test('Dividing 1 / 1 equals 1', () => {
    expect(div(1, 1)).toBe(1);
});

// ============= Группировка тестов ==================

describe('Sum', () => {
    test.each([
        {a: 1, b: 1, expected: 2},
        {a: 1, b: 2, expected: 3},
        {a: -2, b: -29, expected: -31},
        {a: -2, b: 5, expected: 3},
    ])('Adding $a + $b equals $expected', ({a, b, expected}) => {
        expect(sum(a, b)).toBe(expected);
    });
});

describe('Multiplying', () => {
    test.each([
        {a: 1, b: 1, expected: 1},
        {a: 3, b: 3, expected: 9},
    ])('Multiplying $a * $b equals $expected', ({a, b, expected}) => {
        expect(mul(a, b)).toBe(expected);
    });
});

describe('Subtracting', () => {
    test.each([
        {a: 1, b: 1, expected: 0},
        {a: 15, b: 3, expected: 12},
        {a: 2, b: -10, expected: 12},
        {a: -20, b: -10, expected: -10},
    ])('Subtracting $a - $b equals $expected', ({a, b, expected}) => {
        expect(sub(a, b)).toBe(expected);
    });
});

describe('Dividing', () => {
    test.each([
        {a: 1, b: 1, expected: 1},
        {a: 1, b: 2, expected: 0.5},
        {a: 2, b: 0, expected: Infinity},
    ])('Dividing $a / $b equals $expected', ({a, b, expected}) => {
        expect(div(a, b)).toBe(expected);
    });
});