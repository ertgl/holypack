import { SyncBailHook } from "tapable";

import { HookUIDIsNotDefinedError } from "../errors/HookUIDIsNotDefinedError";
import { validateHookUID } from "../validateHookUID";

describe(
  "validateHookUID",
  () =>
  {
    it(
      "should throw an error if the hook UID is `undefined`",
      () =>
      {
        const hook = new SyncBailHook<[], void>([]);

        expect(
          () =>
          {
            validateHookUID(
              hook.name,
              hook,
            );
          },
        ).toThrow(
          HookUIDIsNotDefinedError,
        );
      },
    );

    it(
      "should throw an error if the hook UID is an empty string",
      () =>
      {
        const hook = new SyncBailHook<[], void>([], "");

        expect(
          () =>
          {
            validateHookUID(
              hook.name,
              hook,
            );
          },
        ).toThrow(
          HookUIDIsNotDefinedError,
        );
      },
    );

    it(
      "should not throw any error if the hook UID is valid",
      () =>
      {
        const hook = new SyncBailHook<[], void>([], "test:sample");

        expect(
          () =>
          {
            validateHookUID(
              hook.name,
              hook,
            );
          },
        ).not.toThrow();
      },
    );
  },
);
