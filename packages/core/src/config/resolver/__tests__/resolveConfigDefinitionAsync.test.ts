import { jest } from "@jest/globals";

import { resolveCWD } from "../../../lib/process/cwd/resolveCWD";
import type { ConfigDefinitionContext } from "../../context/ConfigDefinitionContext";
import type { ConfigDefinition } from "../../definition/ConfigDefinition";
import type { ConfigDefinitionProviderAsync } from "../../provider/ConfigDefinitionProviderAsync";
import { resolveConfigAsync } from "../resolveConfigAsync";

describe(
  "resolveConfigAsync",
  () =>
  {
    it(
      "should resolve a config definition with a provider function",
      async () =>
      {
        const configDefinitionContext: ConfigDefinitionContext = {
          cwd: resolveCWD(),
          referrerPath: undefined,
        };

        const configDefinition: ConfigDefinition = {
          key: "value",
        };

        const configDefinitionMock = jest.fn<ConfigDefinitionProviderAsync>().mockResolvedValue(
          configDefinition,
        );

        const result = await resolveConfigAsync(
          configDefinitionContext,
          configDefinitionMock as ConfigDefinitionProviderAsync,
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
