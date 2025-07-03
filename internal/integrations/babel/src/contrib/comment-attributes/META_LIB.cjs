const { cjs } = require("./meta-operators/cjs.cjs");
const { esm } = require("./meta-operators/esm.cjs");
const { remove } = require("./meta-operators/remove.cjs");
const { skip } = require("./meta-operators/skip.cjs");
const { voidify } = require("./meta-operators/voidify.cjs");

module.exports.META_LIB = {
  cjs,
  esm,
  remove,
  skip,
  voidify,
};
