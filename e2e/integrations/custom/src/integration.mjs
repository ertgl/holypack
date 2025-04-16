/**
 * @import { type Integration } from "@holypack/core";
 */

/**
 * @type {Integration}
 */
export const exampleIntegration = {
  name: "example",

  resolveConfig: (
    context,
    config,
  ) =>
  {
    context.config.example = {
      integrationSpecificResolvedConfig: config.example.integrationSpecificConfig ?? false,
    };
  },

  resolveContext: (
    context,
    options,
  ) =>
  {
    context.example = {
      integrationSpecificContextData: {},
    };
  },
};

export default exampleIntegration;
