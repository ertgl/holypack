import { defineMetaOperator } from "babel-plugin-comment-attributes";

export const META_OPERATOR_SKIP = defineMetaOperator({
  name: "skip",
  operate: (
    programPath,
    programState,
    nodePath,
    nodeState,
    context,
  ) =>
  {},
});

export const skip = () => META_OPERATOR_SKIP;
