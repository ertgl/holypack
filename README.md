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
> Features and APIs may change.
>
> This document currently outlines the roadmap, not the finalized product.

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

Holypack is a production-focused build system for scalable, accessible web
applications. It begins with minimal setup, builds on strong defaults, and
incorporates best practices like linting, testing, and security to support
modern, backend-agnostic workflows.

### Scope

Most build tools are either tightly coupled to a specific backend (often
JavaScript or TypeScript) or overlook progressive enhancement, which is
essential for **accessibility** and **long-term resilience**.

Holypack addresses both. It supports **backend independence** and
**fast delivery** without compromising quality. Its scope is defined by the
intersection of these priorities. No rigid architectures, no loss of
flexibility.

### Principles

While developer experience matters, holypack is ultimately optimized for
production: What reaches the user is the true measure of quality.

- **Production-ready**: Reliable output with minimal setup
- **Guided flexibility**: Balances "**convention**" and "**configuration**"
- **Workflow-aware**: Compatible with modern developer tooling
- **Proven foundations**: Built on stable, trusted technologies
- **Unopinionated**: Fits diverse project structures without constraints

### Features

Holypack combines battle-tested tools and proven technologies to achieve
high-quality outcomes in modern web development.

#### Project Templates

- Assets-only
  (For
  [monolithic](https://en.wikipedia.org/wiki/Monolithic_application)
  backends)
- Single Page Applications
  ([SPA](https://en.wikipedia.org/wiki/Single-page_application))
- Progressive Web Applications
  ([PWA](https://en.wikipedia.org/wiki/Progressive_web_app))
  with
  [service workers](https://en.wikipedia.org/wiki/Progressive_web_app#Service_workers)
  and
  [navigation preloading](https://web.dev/blog/navigation-preload)
- Server-Side Rendering
  ([SSR](https://en.wikipedia.org/wiki/Server-side_scripting#Server-side_rendering))
  with
  [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement)

#### Build & Transform

- Code and asset bundling via [webpack](https://webpack.js.org/)
- JavaScript/TypeScript transpilation with [Babel](https://babeljs.io/) and
  [SWC](https://swc.rs/)
- CSS processing with [PostCSS](https://postcss.org/) and
  [Lightning CSS](https://lightningcss.dev/)
- Superpowered CSS, with [Sass](https://sass-lang.com/) and
  [SCSS](https://sass-lang.com/documentation/syntax/#scss)
- First-class [CSS modules](https://github.com/css-modules/css-modules) support

#### Lint & Test

- Code style standardization with
  [ESLint](https://eslint.org/),
  [axe-core](https://github.com/dequelabs/axe-core)
  and [Stylelint](https://stylelint.io/)
- Unit testing with [Jest](https://jestjs.io/) and coverage by
[Istanbul](https://istanbul.js.org/)

#### Security & Integrity

- [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)
- [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- [Trusted Types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API)
- Dual builds for **modern** and **legacy** environments
- Built-in support for **graceful degradation**

#### CLI & Distribution

- Build CLI applications targeting [Node.js](https://nodejs.org/)
  (including SSR use cases)
- Optional
  [JavaScript obfuscation](https://github.com/ertgl/obfuscator-webpack-plugin)
  for closed-source projects
- Support for generating
  [single-file executables](https://nodejs.org/api/single-executable-applications.html)

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
    <td align="center">Completed</td>
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
    <td align="center">Completed</td>
  </tr>
  <tr>
    <td><a href="https://babeljs.io/">Babel</a></td>
    <td><a href="integrations/babel">@holypack/integration-babel</a></td>
    <td align="center">Completed</td>
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
    <td><a href="integrations/webpack">@holypack/integration-webpack</a></td>
    <td align="center">
      Work in progress
    </td>
  </tr>
  <tr>
    <td colspan="3">&#8203;</td>
  </tr>
  <tr>
    <th align="left" colspan="3">Testing Tools</th>
  </tr>
  <tr>
    <td><a href="https://jestjs.io/">Jest</a></td>
    <td><a href="integrations/jest">@holypack/integration-jest</a></td>
    <td align="center">Completed</td>
  </tr>
  <tr>
    <td colspan="3">&#8203;</td>
  </tr>
  <tr>
    <th align="left" colspan="3">Distribution & Release Tools</th>
  </tr>
  <tr>
    <td><a href="https://github.com/changesets/changesets">changesets</a></td>
    <td></td>
    <td align="center">Planned</td>
  </tr>
  <tr>
    <td><a href="https://github.com/ertgl/export-map-generator">export-map-generator</a></td>
    <td></td>
    <td align="center">Completed</td>
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
    <td align="center">Completed</td>
  </tr>
  <tr>
    <td>cli</td>
    <td><a href="packages/cli">@holypack/cli</a></td>
    <td align="center">
      Work in progress
    </td>
  </tr>
  <tr>
    <td>prelude</td>
    <td><a href="packages/prelude">holypack</a></td>
    <td align="center">Completed</td>
  </tr>
</table>

## Installation

The packages will be available once the initial implementation is complete.

## Usage

The final view of the usage will be provided at a later stage.

## Name

The name began as a reaction to how crowded the npm registry felt. Over time,
it became a reflection of the technologies and principles behind the project.
Also, cats are very surprising.

Like webpack, holypack is not capitalized mid-sentence.

## License

This project is licensed under the
[MIT License](https://opensource.org/license/mit).
See the [LICENSE](LICENSE) file for more information.
