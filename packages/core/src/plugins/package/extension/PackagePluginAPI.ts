import { loadPackageJSONByFilePathAsync } from "../utils/package-json-loader/loadPackageJSONByFilePathAsync";
import { loadPackageJSONByFilePathSync } from "../utils/package-json-loader/loadPackageJSONByFilePathSync";

export class PackagePluginAPI
{
  readonly loadPackageJSONByFilePath = loadPackageJSONByFilePathAsync;

  readonly loadPackageJSONByFilePathSync = loadPackageJSONByFilePathSync;
}
