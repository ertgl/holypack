const register = require("@babel/register");

register({
  configFile: "./babel.config.node.cjs",
  extensions: [
    ".cjs",
    ".cjsx",
    ".cts",
    ".ctsx",
    ".js",
    ".jsx",
    ".mjs",
    ".mjsx",
    ".mts",
    ".mtsx",
    ".ts",
    ".tsx",
  ],
  rootMode: "upward-optional",
});
