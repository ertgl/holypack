import type { ContextAsync } from "../../ContextAsync";
import type { ContextSync } from "../../ContextSync";
import { resolveContext } from "../resolveContext";

describe(
  "resolveContext",
  () =>
  {
    it(
      "should return a promise that resolves to a context, when no options are provided",
      async () =>
      {
        await expect(
          resolveContext({
            loadConfigFile: false,
          }),
        ).resolves.toEqual(
          expect.objectContaining<ContextAsync>({
            cwd: expect.any(String) as ContextAsync["cwd"],
            extensions: expect.any(Map) as ContextAsync["extensions"],
            fs: expect.any(Object) as ContextAsync["fs"],
            hooks: expect.any(Map) as ContextAsync["hooks"],
            sync: false,
          }),
        );
      },
    );

    it(
      "should return a promise that resolves to a context, when `sync` is `false`",
      async () =>
      {
        await expect(
          resolveContext({
            loadConfigFile: false,
            sync: false,
          }),
        ).resolves.toEqual(
          expect.objectContaining<ContextAsync>({
            cwd: expect.any(String) as ContextAsync["cwd"],
            extensions: expect.any(Map) as ContextAsync["extensions"],
            fs: expect.any(Object) as ContextAsync["fs"],
            hooks: expect.any(Map) as ContextAsync["hooks"],
            sync: false,
          }),
        );
      },
    );

    it(
      "should return a resolved context directly, when `sync` is `true`",
      () =>
      {
        const result = resolveContext({
          loadConfigFile: false,
          sync: true,
        });

        expect(result).not.toBeInstanceOf(Promise);

        expect(
          result,
        ).toEqual(
          expect.objectContaining<ContextSync>({
            cwd: expect.any(String) as ContextAsync["cwd"],
            extensions: expect.any(Map) as ContextSync["extensions"],
            fs: expect.any(Object) as ContextAsync["fs"],
            hooks: expect.any(Map) as ContextSync["hooks"],
            sync: true,
          }),
        );
      },
    );
  },
);
