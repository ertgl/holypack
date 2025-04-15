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
      integrationSpecificConfig: config.example.integrationSpecificConfig ?? false,
    };
  },

  resolveContext: (
    context,
    options,
  ) =>
  {
    context.example = {
      integrationSpecificContextData: "DATA",
    };
  },
};

export default exampleIntegration;
