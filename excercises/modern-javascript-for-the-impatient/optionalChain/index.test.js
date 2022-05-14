import { optionalChain } from ".";
import fc from "fast-check";

describe("optionalChain", () => {
  describe("plain object", () => {
    it("should return own property", () => {
      fc.assert(
        fc.property(fc.string(), fc.anything(), (key, value) => {
          if (value === null || value === undefined) return;
          const o = optionalChain({ [key]: value });
          expect(o[key]).toEqual(value);
        }),
        { seed: 0 }
      );
    });

    it("should return zero for undefined key", () => {
      fc.assert(
        fc.property(fc.string(), fc.string(), (key, key2) => {
          const o = optionalChain({});
          expect(key2 in o[key]).toBe(true);
        })
      );
    });

    it("should accept arbitrary method chain", () => {
      fc.assert(
        fc.property(
          fc.string(),
          fc.string(),
          fc.string(),
          fc.string(),
          (...keys) => {
            const o = optionalChain({});
            expect(keys[3] in o[keys[0]]()[keys[1]]()[keys[2]]()).toBe(true);
          }
        ),
        { seed: 0 }
      );
    });
  });

  describe("class instance", () => {
    it("should return own method", () => {
      const d = optionalChain(new Date("2022-05-14"));
      expect(d.getFullYear()).toBe(2022);
      expect(d.getMonth()).toBe(4);
    });

    it("object returned by a method is also proxy", () => {
      const p = optionalChain(Promise.resolve(1));
      fc.assert(
        fc.property(fc.string(), fc.string(), (key1, key2) => {
          expect(key2 in p.then()[key1]()).toBe(true);
        }),
        { seed: 0 }
      );
    });

    it("should accept arbitrary method chain", () => {
      fc.assert(
        fc.property(
          fc.string(),
          fc.string(),
          fc.string(),
          fc.string(),
          (...keys) => {
            const o = optionalChain({});
            expect(keys[3] in o[keys[0]]()[keys[1]]()[keys[2]]()).toBe(true);
          }
        ),
        { seed: 0 }
      );
    });
  });
});
