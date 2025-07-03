import { getValueByKeyPath } from "../getValueByKeyPath";

describe(
  "getValueByKeyPath",
  () =>
  {
    it(
      "should return undefined when object is undefined",
      () =>
      {
        const result = getValueByKeyPath(undefined, ["a", "b"]);

        expect(result).toBeUndefined();
      },
    );

    it(
      "should return undefined when object is null",
      () =>
      {
        const result = getValueByKeyPath(null, ["a", "b"]);

        expect(result).toBeUndefined();
      },
    );

    it(
      "should return the value at the specified key path",
      () =>
      {
        const obj = { a: { b: { c: 1 } } };
        const result = getValueByKeyPath(obj, ["a", "b", "c"]);

        expect(result).toBe(1);
      },
    );

    it(
      "should return undefined for non-existent key paths",
      () =>
      {
        const obj = { a: { b: { c: 1 } } };
        const result = getValueByKeyPath(obj, ["a", "b", "c", "d"]);

        expect(result).toBeUndefined();
      },
    );

    it(
      "should handle empty key paths",
      () =>
      {
        const obj = { a: 1 };
        const result = getValueByKeyPath(obj, []);

        expect(result).toBe(obj);
      },
    );
  },
);
