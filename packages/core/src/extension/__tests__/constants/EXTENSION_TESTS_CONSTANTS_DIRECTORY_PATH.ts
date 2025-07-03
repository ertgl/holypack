import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export const EXTENSION_TESTS_CONSTANTS_DIRECTORY_PATH = __dirname;
