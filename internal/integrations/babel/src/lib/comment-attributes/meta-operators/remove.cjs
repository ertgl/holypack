const { defineMetaOperator } = require("babel-plugin-comment-attributes");

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

module.exports.remove = () => META_OPERATOR_REMOVE;
