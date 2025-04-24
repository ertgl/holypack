# @holypack/integration-eslint

## Known Issues

- Use of `eslint-plugin-perfectionist` may cause performance issues in large
  projects. It can be disabled by setting `perfectionist: false` in the
  integration options. (For instance, linting holypack with `perfectionist`
  enabled takes ~3 minutes, while it takes ~30 seconds with it disabled.)
