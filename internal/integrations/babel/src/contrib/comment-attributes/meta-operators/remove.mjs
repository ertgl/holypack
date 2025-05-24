import { defineMetaOperator } from "babel-plugin-comment-attributes";

const META_OPERATOR_REMOVE = defineMetaOperator({
  name: "remove",
  operate: (
    programPath,
    programState,
    nodePath,
    nodeState,
    context,
  ) =>
  {
    nodePath.remove();
  },
});

export const remove = () => META_OPERATOR_REMOVE;
