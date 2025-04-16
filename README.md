<div align="center">
  <h1 align="center">
    holypack
  </h1>
  <picture>
    <img
      alt="holycat - Image generated by stabledifffusion.com"
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
> The content in this README file outlines the intended project scope. Since it
> currently serves planning purposes, it may not reflect the final product.
>
> Development will continue daily under normal conditions until a stable
> version is reached.

## Table of Contents

- [Overview](#overview)
  - [Project Scope](#project-scope)
  - [Principles](#principles)
  - [Features](#features)
- [Integrations](#integrations)
  - [Linters](#linters)
  - [Frameworks and Libraries](#frameworks-and-libraries)
  - [Build Tools and Helpers](#build-tools-and-helpers)
  - [Polyfills](#polyfills)
  - [Testing](#testing)
  - [Release Tools](#release-tools)
- [Core Packages](#core-packages)
- [Installation](#installation)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Configuration exploration](#configuration-exploration)
  - [Low-level API](#low-level-api)
- [Name](#name)
- [License](#license)

## Overview

Holypack is a build system that provides a general-purpose foundation for the
front-end layers of web projects.

### Project Scope

The main focus of holypack is building and bundling code and assets for secure
and efficient distribution: Making the code and assets production-ready from
the start, while also providing a modern development environment in order to
achieve high-quality outcomes.

**TODO:** Project scope will be clarified at a later stage.

### Principles

As a baseline, the following principles are taken into consideration:

  - **Production-ready from the start**: Minimal configuration by default
    (if not zero), highly configurable when needed.
  - **Defaults that provide freedom**: A balanced approach between
    `convention over configuration` and `configuration over convention`.
  - **Modern development environment**: Integrations with faster tools designed
    to enhance the developer experience.
  - **Proven technologies in production**: Combined with the best practices to
    ensure sustainable efficiency.
  - **Opinionated about not being opinionated**: Holypack is not a framework,
    but rather a set of tools that can be used in any project. It is designed
    to work with any framework or library, and it does not impose any
    restrictions on how to use them. However, it does provide a set of
    directives that can be used to enforce some best practices and ensure that
    the code is maintainable and scalable, and the product is accessible,
    secure, and performant.

### Features

Holypack is designed specifically with the following project types and features
in mind.

- Modular, extensible plugin system
- CSS modules and manifest file for monolithic backends
- Subresource integrity and manifest file for monolithic backends
- Content security policy setup
- Trusted-types setup
- Progressive enhancement
- Progressive web applications
- Service workers
- Navigation preload
- Modern and legacy browsers support (dual build)
- Graceful degradation
- CLI applications with Node.js (including SSR)
- Server-side libraries/tools with Node.js (Monolithic-like architecture,
  server for frontend)
- Asset optimization
- Asset bundling
- Code obfuscation
- Single-file executables
- Assets-only/SPA/PWA/SSR project starters

> [!WARNING]
> Code obfuscation should not be considered as a security measure, but
> rather a deterrent layer of protection. Nothing stops your code to be reverse
> engineered once it is in the client-side. But the aim is to make it not worth
> the effort, or at least not to present the code like a gift. This might be
> beneficial for closed-source projects, especially where providing a
> self-hosted solution is mandatory.

### Integrations

#### Linters

| Name | Package | Status |
| ---- | ------- | ------ |
| [ESLint](https://eslint.org/) | [@holypack/integration-eslint](integrations/eslint) | Work in progress |
| [axe-core](https://github.com/dequelabs/axe-core) | | Planned |
| [Stylelint](https://stylelint.io/) | | Planned |
| [commitlint](https://commitlint.js.org/) | | Planned |
| [Husky](https://typicode.github.io/husky/) | | Planned |

#### Frameworks and Libraries

| Name | Package | Status |
| ---- | ------- | ------ |
| [Express](https://expressjs.com/) | | Planned |
| [React](https://react.dev/) | | Planned |

#### Build Tools and Helpers

| Name | Package | Status |
| ---- | ------- | ------ |
| [Babel](https://babeljs.io/) | [@holypack/integration-babel](integrations/babel) | Work in progress |
| [TypeScript](https://www.typescriptlang.org/) | [@holypack/integration-typescript](integrations/typescript) | Work in progress |
| [SWC](https://swc.rs/) | | Planned |
| [JavaScript Obfuscator](https://obfuscator.io/) | | Planned |
| [PostCSS](https://postcss.org/) | | Planned |
| [Lightning CSS](https://lightningcss.dev/) | | Planned |
| [Sass](https://sass-lang.com/) | | Planned |
| [SCSS](https://sass-lang.com/documentation/syntax/#scss) | | Planned |
| [Browserslist](https://browsersl.ist/) | | Planned |
| [webpack](https://webpack.js.org/) | | Planned |

#### Polyfills

| Name | Package | Status |
| ---- | ------- | ------ |
| [core-js](https://github.com/zloirock/core-js) | | Planned |
| [trusted-types](https://github.com/w3c/trusted-types) | | Planned |

#### Testing

| Name | Package | Status |
| ---- | ------- | ------ |
| [Jest](https://jestjs.io/) | | Planned |

#### Release Tools

| Name | Package | Status |
| ---- | ------- | ------ |
| [changesets](https://github.com/changesets/changesets) | | Planned |

## Core Packages

| Package | Status |
| ------- | ------ |
| [@holypack/cli](packages/cli) | Planned |
| [@holypack/core](packages/core) | Work in progress |
| [holypack](packages/prelude) | Work in progress |

## Installation

Once the initial implementation phase is complete, the packages will be ready
for installation.

## Usage

The final view of the usage of the packages will be provided at a later stage.

### Configuration

Multiple file formats are supported for configuration, including JSON, YAML,
JavaScript and TypeScript.

Example of configuration in `holypack.config.mjs`:

```js
import { defineConfig } from "holypack";

import example from "#example-integration";

const HOLYPACK_CONFIG = defineConfig({
  integrations: [
    example,
  ],
});

export default HOLYPACK_CONFIG;
```

#### Configuration exploration

The following file formats are supported for configuration, and the
exploration order is as follows:

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

The following code snippets are examples of how to use the core packages.

#### Context resolution

Example:

```ts
import { resolveContext } from "@holypack/core";

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
