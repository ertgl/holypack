<div align="center">
  <h1 align="center">
    holypack
  </h1>
  <picture>
    <img
      alt="holycat, the mascot of holypack"
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
>
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

Holypack is a backend-agnostic build system designed for scalable and
accessible web projects. It focuses on bundling, transforming, and optimizing
frontend assets with minimal setup and maximum flexibility. Built with modern
tooling and enterprise-readiness in mind, it supports a wide range of project
types (from progressive-enhancement-first architectures to single-page
applications) without enforcing backend constraints. Holypack offers a modular
plugin system, reliable defaults, and thoughtful integrations for linting,
testing, and security.

### Scope

Many modern tools either make strong assumptions about the backend environment
(typically JavaScript or TypeScript) or overlook the needs of progressive
enhancement, which is vital for accessibility and long-term scalability.
Holypack is designed to fill this gap by offering a backend-agnostic approach
that prioritizes portability, flexibility, and production-readiness from the
start. It supports diverse project types, including SPAs, PWAs, SSR setups, and
command-line tools without dictating architectural choices.

### Principles

Holypack is designed to provide long-term maintainability, modern developer
workflows, and a clear separation of concerns in mind. It uses proven
technologies to keep things simple but flexible enough to handle different use
cases. The configuration approach strikes a balance, avoiding unnecessary
complexity while still allowing customization when needed. Plus, the modular
architecture makes it easy to extend as the project grows.

The core principles behind holypack include:

  - **Production-ready**: A straightforward setup by default, with flexibility
    for customization when needed.
  - **Guided flexibility**: A mix of "**convention over configuration**" and
    "**configuration over convention**."
  - **Optimized for modern workflows**: Integrates with fast,
    developer-friendly tools that improve efficiency.
  - **Built on proven technologies**: Combined with the best practices to
    ensure sustainable efficiency.
  - **Adaptable and non-restrictive**: Works with any project structure,
    without being restrictive.

### Features

Holypack offers a set of enterprise-friendly features that balance performance,
security, and developer experience. All designed to adapt to projects of any
scale.

#### Foundation

- **Modular plugin system**, uses [tapable](https://github.com/webpack/tapable)
- **Backend-agnostic architecture**, supports any backend in any language
- **Project templates** for:
  - Frontend-only (assets)
  - Single Page Applications (SPA)
  - Progressive Web Applications (PWA, service workers, navigation preloading)
  - Server-Side Rendering (SSR) with progressive enhancement

#### Build & Transform

- Code and asset bundling via [webpack](https://webpack.js.org/)
- JavaScript/TypeScript transpilation with [Babel](https://babeljs.io/) and
  [SWC](https://swc.rs/)
- CSS processing with [PostCSS](https://postcss.org/) and
  [Lightning CSS](https://lightningcss.dev/)
- Support for [Sass](https://sass-lang.com/) and
  [SCSS](https://sass-lang.com/documentation/syntax/#scss)
- First-class [CSS modules](https://github.com/css-modules/css-modules) support

#### Security & Integrity

- [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)
- [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- [Trusted Types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API)
- Dual builds for **modern** and **legacy** environments
- Built-in support for **graceful degradation**

#### CLI & Distribution

- Build CLI applications targeting Node.js (including SSR use cases)
- Optional JavaScript **obfuscation** for closed-source environments
- Support for bundling into **single-file** executables

> [!WARNING]
> Code obfuscation is **not a security mechanism** for intellectual properties.
> It serves as a deterrent and may support legal standing by demonstrating that
> violations were deliberate rather than accidental.

## Integrations

<table>
  <tr>
    <th>Name</th>
    <th>Package</th>
    <th>Status</th>
  </tr>
  <tr>
    <td colspan="3" aria-hidden="true">&#8203;</td>
  </tr>
  <tr>
    <th align="left" colspan="3">Linters</th>
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
    <td colspan="3">&#8203;</td>
  </tr>
  <tr>
    <th align="left" colspan="3">Build Tools</th>
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
    <td colspan="3">&#8203;</td>
  </tr>
  <tr>
    <th align="left" colspan="3">Testing Tools</th>
  </tr>
  <tr>
    <td><a href="https://jestjs.io/">Jest</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td colspan="3">&#8203;</td>
  </tr>
  <tr>
    <th align="left" colspan="3">Release Tools</th>
  </tr>
  <tr>
    <td><a href="https://github.com/changesets/changesets">changesets</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td colspan="3">&#8203;</td>
  </tr>
  <tr>
    <th align="left" colspan="3">Libraries & Frameworks</th>
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
    <td colspan="3">&#8203;</td>
  </tr>
  <tr>
    <th align="left" colspan="3">Polyfills</th>
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

export default defineConfig({
  integrations: [
    eslint(),
  ],
});
```

<details>
  <summary>
    <b>
      Toggle the <code>eslint.config.mjs</code> view for the above example
    </b>
  </summary>

  ```js
  import createHolypackPlugin from "@holypack/eslint-plugin";

  const holypack = await createHolypackPlugin();

  export default [
    ...holypack.configs.recommended,
  ];
  ```
</details>

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
