// @babel/preset-typescript does not export type definitions for its options.
// Let's maintain it manually here for now.
// See: https://babeljs.io/docs/babel-plugin-transform-typescript#options
export type BabelPresetTypeScriptOptions = {
  allowDeclareFields: boolean;
  allowNamespaces: boolean;
  disallowAmbiguousJSXLike: boolean;
  dts: boolean;
  isTSX: boolean;
  jsxPragma: string;
  jsxPragmaFrag: string;
  onlyRemoveTypeImports: boolean;
  optimizeConstEnums: boolean;
};
