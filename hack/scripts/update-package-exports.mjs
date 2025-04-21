import {
  copyFile,
  readdir,
  rm as removeFile,
  writeFile,
} from "node:fs/promises";
import { createRequire } from "node:module";
import {
  dirname,
  sep as pathSeparator,
  relative,
} from "node:path";
import { fileURLToPath } from "node:url";

/**
 * @import { type Dirent } from "node:fs";
 */

const __filename = fileURLToPath(import.meta.url);

const require = createRequire(__filename);

/**
 * @param {string} packageRootPath
 * @returns {Promise<Record<string, unknown>>}
 */
async function generatePackageExports(
  packageRootPath,
)
{
  const srcDirPath = `${packageRootPath}/src`;

  /**
   * @type {Record<string, unknown>}
   */
  const packageExports = {
    /* eslint-disable perfectionist/sort-objects */
    "./package.json": "./package.json",
    ".": {
      types: "./dist/types/index.d.ts",
      import: "./dist/esm/index.mjs",
      require: "./dist/cjs/index.cjs",
      default: "./src/index.ts",
    },
    /* eslint-enable perfectionist/sort-objects */
  };

  const direntIterator = iterateDirentsRecursively(srcDirPath);

  for await (const dirent of direntIterator)
  {
    if (!dirent.isDirectory())
    {
      continue;
    }

    const direntPath = `${dirent.parentPath}${pathSeparator}${dirent.name}`;
    const direntSrcRelativePath = relative(
      srcDirPath,
      direntPath,
    );

    const importPathPrefix = `./${direntSrcRelativePath}`;

    packageExports[importPathPrefix] = {
      /* eslint-disable perfectionist/sort-objects */
      types: `./dist/types/${direntSrcRelativePath}/index.d.ts`,
      import: `./dist/esm/${direntSrcRelativePath}/index.mjs`,
      require: `./dist/cjs/${direntSrcRelativePath}/index.cjs`,
      default: `./src/${direntSrcRelativePath}/index.ts`,
      /* eslint-enable perfectionist/sort-objects */
    };

    packageExports[`${importPathPrefix}/`] = {
      /* eslint-disable perfectionist/sort-objects */
      types: `./dist/types/${direntSrcRelativePath}/index.d.ts`,
      import: `./dist/esm/${direntSrcRelativePath}/index.mjs`,
      require: `./dist/cjs/${direntSrcRelativePath}/index.cjs`,
      default: `./src/${direntSrcRelativePath}/index.ts`,
      /* eslint-enable perfectionist/sort-objects */
    };

    packageExports[`${importPathPrefix}/*.d.ts`] = {
      /* eslint-disable perfectionist/sort-objects */
      types: `./dist/types/${direntSrcRelativePath}/*.d.ts`,
      default: `./src/${direntSrcRelativePath}/*.ts`,
      /* eslint-enable perfectionist/sort-objects */
    };

    packageExports[`${importPathPrefix}/*.cjs`] = {
      /* eslint-disable perfectionist/sort-objects */
      types: `./dist/types/${direntSrcRelativePath}/*.d.ts`,
      import: `./dist/esm/${direntSrcRelativePath}/*.mjs`,
      require: `./dist/cjs/${direntSrcRelativePath}/*.cjs`,
      default: `./src/${direntSrcRelativePath}/*.ts`,
      /* eslint-enable perfectionist/sort-objects */
    };

    packageExports[`${importPathPrefix}/*.js`] = {
      /* eslint-disable perfectionist/sort-objects */
      types: `./dist/types/${direntSrcRelativePath}/*.d.ts`,
      import: `./dist/esm/${direntSrcRelativePath}/*.mjs`,
      require: `./dist/cjs/${direntSrcRelativePath}/*.cjs`,
      default: `./src/${direntSrcRelativePath}/*.ts`,
      /* eslint-enable perfectionist/sort-objects */
    };

    packageExports[`${importPathPrefix}/*.mjs`] = {
      /* eslint-disable perfectionist/sort-objects */
      types: `./dist/types/${direntSrcRelativePath}/*.d.ts`,
      import: `./dist/esm/${direntSrcRelativePath}/*.mjs`,
      require: `./dist/cjs/${direntSrcRelativePath}/*.cjs`,
      default: `./src/${direntSrcRelativePath}/*.ts`,
      /* eslint-enable perfectionist/sort-objects */
    };

    packageExports[`${importPathPrefix}/*.ts`] = {
      /* eslint-disable perfectionist/sort-objects */
      types: `./dist/types/${direntSrcRelativePath}/*.d.ts`,
      import: `./dist/esm/${direntSrcRelativePath}/*.mjs`,
      require: `./dist/cjs/${direntSrcRelativePath}/*.cjs`,
      default: `./src/${direntSrcRelativePath}/*.ts`,
      /* eslint-enable perfectionist/sort-objects */
    };

    packageExports[`${importPathPrefix}/*/`] = {
      /* eslint-disable perfectionist/sort-objects */
      types: `./dist/types/${direntSrcRelativePath}/*/index.d.ts`,
      import: `./dist/esm/*/${direntSrcRelativePath}/index.mjs`,
      require: `./dist/cjs/${direntSrcRelativePath}/*/index.cjs`,
      default: `./src/*/${direntSrcRelativePath}/index.ts`,
      /* eslint-enable perfectionist/sort-objects */
    };

    packageExports[`${importPathPrefix}/*`] = {
      /* eslint-disable perfectionist/sort-objects */
      types: `./dist/types/${direntSrcRelativePath}/*`,
      import: `./dist/esm/${direntSrcRelativePath}/*`,
      require: `./dist/cjs/${direntSrcRelativePath}/*`,
      default: `./src/${direntSrcRelativePath}/*`,
      /* eslint-enable perfectionist/sort-objects */
    };
  }

  packageExports["./*.d.ts"] = {
    /* eslint-disable perfectionist/sort-objects */
    types: "./dist/types/*.d.ts",
    default: "./src/*.ts",
    /* eslint-enable perfectionist/sort-objects */
  };

  packageExports["./*.cjs"] = {
    /* eslint-disable perfectionist/sort-objects */
    types: "./dist/types/*.d.ts",
    import: "./dist/esm/*.mjs",
    require: "./dist/cjs/*.cjs",
    default: "./src/*.ts",
    /* eslint-enable perfectionist/sort-objects */
  };

  packageExports["./*.js"] = {
    /* eslint-disable perfectionist/sort-objects */
    types: "./dist/types/*.d.ts",
    import: "./dist/esm/*.mjs",
    require: "./dist/cjs/*.cjs",
    default: "./src/*.ts",
    /* eslint-enable perfectionist/sort-objects */
  };
  packageExports["./*.mjs"] = {
    /* eslint-disable perfectionist/sort-objects */
    types: "./dist/types/*.d.ts",
    import: "./dist/esm/*.mjs",
    require: "./dist/cjs/*.cjs",
    default: "./src/*.ts",
    /* eslint-enable perfectionist/sort-objects */
  };

  packageExports["./*.ts"] = {
    /* eslint-disable perfectionist/sort-objects */
    types: "./dist/types/*.d.ts",
    import: "./dist/esm/*.mjs",
    require: "./dist/cjs/*.cjs",
    default: "./src/*.ts",
    /* eslint-enable perfectionist/sort-objects */
  };

  packageExports["./*/"] = {
    /* eslint-disable perfectionist/sort-objects */
    types: "./dist/types/*/index.d.ts",
    import: "./dist/esm/*/index.mjs",
    require: "./dist/cjs/*/index.cjs",
    default: "./src/*/index.ts",
    /* eslint-enable perfectionist/sort-objects */
  };

  packageExports["./*"] = {
    /* eslint-disable perfectionist/sort-objects */
    types: "./dist/types/*",
    import: "./dist/esm/*",
    require: "./dist/cjs/*",
    default: "./src/*",
    /* eslint-enable perfectionist/sort-objects */
  };

  return packageExports;
}

/**
 * @param {string} path
 * @returns {AsyncGenerator<Dirent>}
 */
async function* iterateDirentsRecursively(
  path,
)
{
  const dirents = await readdir(
    path,
    {
      withFileTypes: true,
    },
  );

  /**
   * @type {Dirent[]}
   */
  const deferredDirents = [];

  for (const dirent of dirents)
  {
    if (dirent.isDirectory())
    {
      yield* iterateDirentsRecursively(`${path}${pathSeparator}${dirent.name}`);
      deferredDirents.push(dirent);
    }
    else if (dirent.isFile())
    {
      deferredDirents.push(dirent);
    }
  }

  for (const dirent of deferredDirents)
  {
    yield dirent;
  }
}

/**
 * @param {null | string[]} [args]
 * @returns {Promise<void>}
 */
async function main(
  args,
)
{
  args ??= process.argv.slice(2);

  const packageJSONFilePath = args[0] ?? "";

  if (!packageJSONFilePath)
  {
    console.error("Please provide a path to package.json");
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
  }

  const shouldWriteToConsole = args.includes("--console");

  /**
   * @type {Record<string, unknown>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const originalPackageJSON = require(packageJSONFilePath);

  /**
   * @type {Record<string, unknown>}
   */
  const newPackageJSON = {};

  const packageRootPath = dirname(packageJSONFilePath);
  const packageExports = await generatePackageExports(packageRootPath);

  for (const [key, value] of Object.entries(originalPackageJSON))
  {
    if (key === "exports")
    {
      newPackageJSON[key] = packageExports;
      continue;
    }

    newPackageJSON[key] = value;
  }

  const newPackageJSONFileContent = JSON.stringify(
    newPackageJSON,
    null,
    2,
  ) + "\n";

  if (shouldWriteToConsole)
  {
    console.log(newPackageJSONFileContent);
  }
  else
  {
    await copyFile(
      packageJSONFilePath,
      `${packageJSONFilePath}.bak`,
    );

    await writeFile(
      packageJSONFilePath,
      newPackageJSONFileContent,
      {
        flush: true,
      },
    );

    await removeFile(`${packageJSONFilePath}.bak`);
  }
}

if (process.argv[1] === __filename)
{
  await main();
}
