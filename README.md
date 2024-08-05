# End-to-end tests for trustify-ui

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
npm run test
```
