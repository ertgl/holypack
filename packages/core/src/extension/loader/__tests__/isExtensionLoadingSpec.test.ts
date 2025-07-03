import { isExtensionLoadingSpec } from "../isExtensionLoadingSpec";

describe(
  "isExtensionLoadingSpec",
  () =>
  {
    it(
      "should return true for a string",
      () =>
      {
        expect(isExtensionLoadingSpec("test")).toBe(true);
      },
    );

    it(
      "should return true for a function",
      () =>
      {
        expect(isExtensionLoadingSpec(() => {})).toBe(true);
      },
    );

    it(
      "should return true for an array with a string",
      () =>
      {
        expect(isExtensionLoadingSpec(["test"])).toBe(true);
      },
    );

    it(
      "should return true for an array with a string and an object",
      () =>
      {
        expect(
          isExtensionLoadingSpec([
            "test",
            {},
          ]),
        ).toBe(true);
      },
    );

    it(
      "should return true for an array with a function",
      () =>
      {
        expect(isExtensionLoadingSpec([() => {}])).toBe(true);
      },
    );

    it(
      "should return true for an array with a function and an object",
      () =>
      {
        expect(
          isExtensionLoadingSpec([
            () => {},
            {},
          ]),
        ).toBe(true);
      },
    );

    it(
      "should return false for an object",
      () =>
      {
        expect(isExtensionLoadingSpec({})).toBe(false);
      },
    );

    it(
      "should return false for an array with an object",
      () =>
      {
        expect(isExtensionLoadingSpec([{}])).toBe(false);
      },
    );
  },
);
