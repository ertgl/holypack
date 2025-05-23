import {
  defineMetaOperator,
  isMetaOperator,
} from "babel-plugin-comment-attributes";

/**
 * @import { type MetaOperator } from "babel-plugin-comment-attributes";
 */

/**
 * @param {(Function | MetaOperator)[]} args
 * @returns {MetaOperator | null}
 */
export const esm = (
  ...args
) =>
{
  return defineMetaOperator({
    name: "esm",
    operate: (
      programPath,
      programState,
      nodePath,
      nodeState,
      context,
    ) =>
    {
      if (!context.ESM)
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
