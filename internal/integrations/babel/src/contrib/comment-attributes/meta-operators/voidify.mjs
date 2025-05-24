import { types as t } from "@babel/core";
import { defineMetaOperator } from "babel-plugin-comment-attributes";

const META_OPERATOR_VOIDIFY = defineMetaOperator({
  name: "voidify",
  operate: (
    programPath,
    programState,
    nodePath,
    nodeState,
    context,
  ) =>
  {
    nodePath.traverse({
      AwaitExpression: (
        awaitNodePath,
      ) =>
      {
        awaitNodePath.replaceWith(
          t.unaryExpression(
            "void",
            awaitNodePath.node.argument,
            true,
          ),
        );
      },
    });
  },
});

export const voidify = () => META_OPERATOR_VOIDIFY;
