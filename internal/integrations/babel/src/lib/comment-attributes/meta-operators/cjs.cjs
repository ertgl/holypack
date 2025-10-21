/* eslint-disable jsdoc/reject-function-type */

const {
  defineMetaOperator,
  isMetaOperator,
} = require("babel-plugin-comment-attributes");

/**
 * @import { type MetaOperator } from "babel-plugin-comment-attributes";
 */

/**
 * @param {(Function | MetaOperator)[]} args
 * @returns {MetaOperator | null}
 */
module.exports.cjs = (
  ...args
) =>
{
  return defineMetaOperator({
    name: "cjs",
    operate: (
      programPath,
      programState,
      nodePath,
      nodeState,
      context,
    ) =>
    {
      if (!context.CJS)
      {
        return;
      }

      for (let arg of args)
      {
        if (
          !isMetaOperator(arg)
          && typeof arg === "function"
          && arg.length === 0
        )
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          arg = arg();
        }

        if (isMetaOperator(arg))
        {
          arg.call(
            undefined,
            programPath,
            programState,
            nodePath,
            nodeState,
            context,
          );
        }
      }
    },
  });
};
