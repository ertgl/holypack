<div align="center">
  <h1 align="center">
    holypack
  </h1>
  <picture>
    <img
      alt="holycat - Image was generated using stabledifffusion.com"
      src="assets/holycat.png"
      width="375px"
      height="375px"
    />
  </picture>
  <p align="center">
    <small>
      A holycat, has some business with your boxes.
    </small>
  </p>
</div>

> [!CAUTION]
> **This project is in early development.**
> The content in this README is more of a plan and might not reflect the final
> product.
>
> Development is ongoing very actively.

## Table of Contents

- [Overview](#overview)
  - [Scope](#scope)
  - [Principles](#principles)
  - [Features](#features)
- [Integrations](#integrations)
- [Packages](#packages)
- [Installation](#installation)
- [Usage](#usage)
- [Name](#name)
- [License](#license)

## Overview

Holypack is a build system for modern web projects, designed to efficiently
bundle, optimize, and prepare code and frontend assets for transfer in a
backend-agnostic way, while ensuring a good developer experience.

### Scope

Modern web development tools often aim to enhance developer experience for
increased productivity. However, many either assume the backend is written in
JavaScript/TypeScript or fail to provide a solid default setup for projects
embracing the progressive enhancement approach, which is mostly needed for
accessibility of the product and/or scalability of the project.

To operate beyond the assumptions of either side, holypack is designed to be a
build system for modern web projects, without being opinionated about the
backend technology.

The scope also extends to building CLI tools and libraries in JavaScript or
TypeScript, intended for server-like environments.

The goal is to provide a baseline that is production-ready from the start, and
flexible enough to adapt to different needs. Reliability will be ensured by the
built-in integrations for linting and testing processes.

### Principles

The following principles are fundamentally taken into consideration:

  - **Ready for production**: Minimal setup by default, with options to
    customize.
  - **Balanced defaults**: A mix of "convention over configuration" and
    "configuration over convention."
  - **Modern tools**: Integrates with faster tools designed to enhance the
    developer experience.
  - **Proven tech**: Combined with the best practices to ensure sustainable
    efficiency.
  - **Flexibility**: Works with any project, offering guidance without being
    restrictive.

### Features

- Modular and extensible plugin system, uses
  [tapable](https://github.com/webpack/tapable)
- Code/asset bundling with [webpack](https://webpack.js.org/), the bundler
- [Babel](https://babeljs.io/) and [SWC](https://swc.rs/) for
  JavaScript/TypeScript
- [PostCSS](https://postcss.org/) and
  [Lightning CSS](https://lightningcss.dev/) for CSS
- [Sass](https://sass-lang.com/) and
  [SCSS](https://sass-lang.com/documentation/syntax/#scss)
- [CSS modules](https://github.com/css-modules/css-modules) (Backend-agnostic
  way)
- [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)
- [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- [Trusted Types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/trusted-types)
- Dual builds for modern and legacy
- Graceful degradation
- CLI applications with Node.js (including SSR)
- Code obfuscation (beneficial for closed-source projects)
- Single-file executables
- Project starter templates for:
  - Assets-only (frontend-only)
  - Single Page Applications (SPA)
  - Progressive Web Applications (PWA)
  - Server-Side Rendering (SSR, progressive enhancement)

> [!WARNING]
> Code obfuscation should not be considered as a security layer for protection
> of an intellectual property. It can only be used as a deterrent.
>
> Once the code is in the client-side, it can be reverse engineered. One aim is
> to make it not worth the effort. And the most importantly, it might be also
> used to prove that legal violations were based on conscious behavior instead
> of innocent mistakes.

## Integrations

<table>
  <tr>
    <th>Name</th>
    <th>Package</th>
    <th>Status</th>
  </tr>
  <tr>
    <td colspan="3">&nbsp</td>
  </tr>
  <tr>
    <th colspan="3">Linters</th>
  </tr>
  <tr>
    <td><a href="https://eslint.org/">ESLint</a></td>
    <td><a href="integrations/eslint">@holypack/integration-eslint</a></td>
    <td align="center">Work in progress</td>
  </tr>
  <tr>
    <td><a href="https://github.com/dequelabs/axe-core">axe-core</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td><a href="https://stylelint.io/">Stylelint</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td><a href="https://commitlint.js.org/">commitlint</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td><a href="https://typicode.github.io/husky/">Husky</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td colspan="3">&nbsp</td>
  </tr>
  <tr>
    <th colspan="3">Build Tools</th>
  </tr>
  <tr>
    <td><a href="https://www.typescriptlang.org/">TypeScript</a></td>
    <td><a href="integrations/typescript">@holypack/integration-typescript</a></td>
    <td align="center">Work in progress</td>
  </tr>
  <tr>
    <td><a href="https://babeljs.io/">Babel</a></td>
    <td><a href="integrations/babel">@holypack/integration-babel</a></td>
    <td align="center">Work in progress</td>
  </tr>
  <tr>
    <td><a href="https://swc.rs/">SWC</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td><a href="https://obfuscator.io/">JavaScript Obfuscator</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td><a href="https://postcss.org/">PostCSS</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td><a href="https://lightningcss.dev/">Lightning CSS</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td><a href="https://sass-lang.com/">Sass</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td><a href="https://sass-lang.com/documentation/syntax/#scss">SCSS</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td><a href="https://browsersl.ist/">Browserslist</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td><a href="https://webpack.js.org/">webpack</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td colspan="3">&nbsp</td>
  </tr>
  <tr>
    <th colspan="3">Testing Tools</th>
  </tr>
  <tr>
    <td><a href="https://jestjs.io/">Jest</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td colspan="3">&nbsp</td>
  </tr>
  <tr>
    <th colspan="3">Release Tools</th>
  </tr>
  <tr>
    <td><a href="https://github.com/changesets/changesets">changesets</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td colspan="3">&nbsp</td>
  </tr>
  <tr>
    <th colspan="3">Libraries & Frameworks</th>
  </tr>
  <tr>
    <td><a href="https://expressjs.com/">Express</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td><a href="https://react.dev/">React</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td colspan="3">&nbsp</td>
  </tr>
  <tr>
    <th colspan="3">Polyfills</th>
  </tr>
  <tr>
    <td><a href="https://github.com/zloirock/core-js">core-js</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td><a href="https://github.com/w3c/trusted-types">trusted-types</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
</table>

## Packages

<table>
  <tr>
    <th>Name</th>
    <th>Package</th>
    <th>Status</th>
  </tr>
  <tr>
    <td>core</td>
    <td><a href="packages/core">@holypack/core</a></td>
    <td align="center">Work in progress</td>
  </tr>
  <tr>
    <td>cli</td>
    <td><a href="packages/cli">@holypack/cli</a></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td>prelude</td>
    <td><a href="packages/prelude">holypack</a></td>
    <td align="center">Work in progress</td>
  </tr>
</table>

## Installation

The packages will be available once the initial implementation is complete.

## Usage

The final view of the usage will be provided at a later stage.

### Configuration

Multiple file formats are supported for configuration, including JSON, YAML,
JavaScript and TypeScript.

Example of configuration in `holypack.config.mjs`:

```js
import eslint from "@holypack/integration-eslint";
import { defineConfig } from "holypack";

const HOLYPACK_CONFIG = defineConfig({
  integrations: [
    eslint(),
  ],
});

export default HOLYPACK_CONFIG;
```

#### Configuration Exploration

When a configuration file is provided, the system will use it as the main
configuration file. Otherwise, it will look for a configuration file in the
current working directory with the following priority:

- `package.json` (`holypack.config` property)
- `holypack.config.ts`
- `holypack.config.js`
- `holypack.config.mts`
- `holypack.config.mjs`
- `holypack.config.cts`
- `holypack.config.cjs`
- `.holypackrc.ts`
- `.holypackrc.js`
- `.holypackrc.mts`
- `.holypackrc.mjs`
- `.holypackrc.cts`
- `.holypackrc.cjs`
- `.holypackrc.json`
- `.holypackrc.yml`
- `.holypackrc.yaml`
- `.holypackrc`
- `.config/holypackrc.ts`
- `.config/holypackrc.js`
- `.config/holypackrc.mts`
- `.config/holypackrc.mjs`
- `.config/holypackrc.cts`
- `.config/holypackrc.cjs`
- `.config/holypackrc.json`
- `.config/holypackrc.yml`
- `.config/holypackrc.yaml`
- `.config/holypackrc`

### Low-level API

The final view of the API will be provided at a later stage.

#### Context Resolution

Example:

```ts
import { resolveContext } from "holypack";

const context = await resolveContext();
```

## Name

The name first came from my reaction to how crowded the npm registry felt. But
it now reflects my respect for the stack of technologies that I have used to
build this project. Cats are also very surprising.

Just same as webpack, I prefer not to capitalize it in the middle of a
sentence.

## License

This project is licensed under the
[MIT License](https://opensource.org/license/mit).
See the [LICENSE](LICENSE) file for more information.
