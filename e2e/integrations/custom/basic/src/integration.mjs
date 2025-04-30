/**
 * @import { type Integration } from "@holypack/core";
 */

/**
 * @type {Integration}
 */
export const EXAMPLE_INTEGRATION = {
  name: "example",

  onContextReady: (
    context,
  ) =>
  {
    context.example.custom++;
  },

  resolveConfig: (
    context,
    config,
  ) =>
  {
    context.config.example = {
      flag: config.example?.flag ?? false,
    };
  },

  resolveContext: (
    context,
    options,
  ) =>
  {
    context.example = {
      custom: 0,
    };
  },
};
