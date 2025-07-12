const { defineMetaOperator } = require("babel-plugin-comment-attributes");

const META_OPERATOR_SKIP = defineMetaOperator({
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

module.exports.skip = () => META_OPERATOR_SKIP;
