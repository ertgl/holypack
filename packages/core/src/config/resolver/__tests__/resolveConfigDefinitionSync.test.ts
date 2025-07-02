import { jest } from "@jest/globals";

import { resolveCWD } from "../../../lib/process/cwd/resolveCWD";
import type { ConfigDefinitionContext } from "../../context/ConfigDefinitionContext";
import type { ConfigDefinition } from "../../definition/ConfigDefinition";
import type { ConfigDefinitionProviderSync } from "../../provider/ConfigDefinitionProviderSync";
import { resolveConfigSync } from "../resolveConfigSync";

describe(
  "resolveConfigSync",
  () =>
  {
    it(
      "should resolve a config definition with a provider function",
      () =>
      {
        const configDefinitionContext: ConfigDefinitionContext = {
          cwd: resolveCWD(),
          referrerPath: undefined,
        };

        const configDefinition: ConfigDefinition = {
          key: "value",
        };

        const configDefinitionMock = jest.fn().mockReturnValue(
          configDefinition,
        );

        const result = resolveConfigSync(
          configDefinitionContext,
          configDefinitionMock as ConfigDefinitionProviderSync,
        );

        expect(configDefinitionMock).toHaveBeenCalledTimes(1);

        expect(result).toEqual(
          expect.objectContaining({
            extensions: expect.any(Array) as ConfigDefinition["extensions"],
            key: "value",
          }),
        );
      },
    );
  },
);
