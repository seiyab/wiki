import fc from "fast-check";
import { Natural } from ".";

describe("Natural", () => {
  type TestCase = [any, boolean];
  const testCases: TestCase[] = [
    [1, true],
    [2, true],
    [3, true],
    [100, true],
    [1000_000_000, true],
    [0, false],
    [0.1, false],
    [0.2, false],
    [0.3, false],
    [100.1, false],
    ["1", false],
    ["2", false],
    ["", false],
    [{}, false],
    [[], false],
    [null, false],
    [undefined, false],
    [() => 1, false],
    [Natural, false],
  ];

  it.each(testCases)("%s", (obj, isNatural) => {
    expect(obj instanceof Natural).toBe(isNatural);
  });

  describe("integer should always be an instance", () => {
    it("integer should always be an instance", () => {
      fc.assert(
        fc.property(fc.maxSafeNat(), (i: unknown) => {
          expect(i).toBeInstanceOf(Natural);
        }),
        { seed: 0 }
      );
    });

    it("integer should always not be an instance", () => {
      fc.assert(
        fc.property(fc.string(), (i: unknown) => {
          expect(i).not.toBeInstanceOf(Natural);
        }),
        { seed: 0 }
      );
    });

    it("array should always not be an instance", () => {
      fc.assert(
        fc.property(fc.int16Array(), (i: unknown) => {
          expect(i).not.toBeInstanceOf(Natural);
        }),
        { seed: 0 }
      );
    });
  });
});
