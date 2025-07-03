const { types: t } = require("@babel/core");
const { defineMetaOperator } = require("babel-plugin-comment-attributes");

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

module.exports.voidify = () => META_OPERATOR_VOIDIFY;
