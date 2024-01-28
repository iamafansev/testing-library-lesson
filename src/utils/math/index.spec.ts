import { div, mul, random, sub, sum } from ".";

test("Adding 1 + 1 equals 2", () => {
  expect(sum(1, 1)).toBe(2);
});

test("Multiplying 1 * 1 equals 1", () => {
  expect(mul(1, 1)).toBe(1);
});

test("Subtracting 1 - 1 equals 0", () => {
  expect(sub(1, 1)).toBe(0);
});

test("Dividing 1 / 1 equals 1", () => {
  expect(div(1, 1)).toBe(1);
});

// ============= Группировка тестов ==================

describe("Sum", () => {
  test.each([
    { a: 1, b: 1, expected: 2 },
    { a: 1, b: 2, expected: 3 },
    { a: -2, b: -29, expected: -31 },
    { a: -2, b: 5, expected: 3 },
  ])("Adding $a + $b equals $expected", ({ a, b, expected }) => {
    expect(sum(a, b)).toBe(expected);
  });
});

describe("Multiplying", () => {
  test.each([
    { a: 1, b: 1, expected: 1 },
    { a: 3, b: 3, expected: 9 },
  ])("Multiplying $a * $b equals $expected", ({ a, b, expected }) => {
    expect(mul(a, b)).toBe(expected);
  });
});

describe("Subtracting", () => {
  test.each([
    { a: 1, b: 1, expected: 0 },
    { a: 15, b: 3, expected: 12 },
    { a: 2, b: -10, expected: 12 },
    { a: -20, b: -10, expected: -10 },
  ])("Subtracting $a - $b equals $expected", ({ a, b, expected }) => {
    expect(sub(a, b)).toBe(expected);
  });
});

describe("Dividing", () => {
  test.each([
    { a: 1, b: 1, expected: 1 },
    { a: 1, b: 2, expected: 0.5 },
    { a: 2, b: 0, expected: Infinity },
  ])("Dividing $a / $b equals $expected", ({ a, b, expected }) => {
    expect(div(a, b)).toBe(expected);
  });
});

describe("Random with default params (min=0 and max=1)", () => {
  test.each(Array.from({ length: 30 }).map(() => ({ randomValue: random() })))(
    "random value $randomValue",
    ({ randomValue }) => {
      // Проверяем, что это число
      expect(randomValue).toEqual(expect.any(Number));

      // Проверяем, что оно в диапазоне от 0 до 1 (дефолтное поведение)
      expect(randomValue).toBeGreaterThanOrEqual(0);
      expect(randomValue).toBeLessThanOrEqual(1);
    }
  );
});

describe.each([
  { methodParams: { min: 0, max: 4 }, length: 6 },
  { methodParams: { min: -5, max: 2 }, length: 10 },
])("Random with params $methodParams", ({ length, methodParams }) => {
  test.each(
    Array.from({ length }).map(() => {
      return {
        min: methodParams.min,
        max: methodParams.max,
        randomValue: random(methodParams),
      };
    })
  )(
    "random value ($randomValue) between: min=$min, max=$max",
    ({ min, max, randomValue }) => {
      // Проверяем, что это число
      expect(randomValue).toEqual(expect.any(Number));

      // Проверяем, что оно в диапазоне от 0 до 1 (дефолтное поведение)
      expect(randomValue).toBeGreaterThanOrEqual(min);
      expect(randomValue).toBeLessThanOrEqual(max);
    }
  );
});
