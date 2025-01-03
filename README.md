# End-to-end tests for trustify-ui

### Devcontainers

Read our docs for [Devcontainers](./.devcontainer/README.md) if you would like to use it.

### Requirements

- NodeJS 21
- A running instance of Trustify

### Running the tests

- Install dependencies:

```shell
npm ci
```

- Point the tests to a running instance of trustify:

```shell
export TRUSTIFY_URL=http://localhost:8080
```

- Run tests:

```shell
npx playwright test
```

- Or if you prefer to run the tests and see the Playwright UI use:

```shell
npx playwright test --ui
```
