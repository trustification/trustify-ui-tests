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

## Environment Variables

| Variable               | Default Value         | Description                              |
| ---------------------- | --------------------- | ---------------------------------------- |
| TRUSTIFY_URL           | http://localhost:8080 | The UI URL                               |
| TRUSTIFY_AUTH_ENABLED  | false                 | Whether or not auth is enabled in the UI |
| TRUSTIFY_AUTH_USER     | admin                 | User name to be used when authenticating |
| TRUSTIFY_AUTH_PASSWORD | admin                 | Password to be used when authenticating  |

## Available commands

There are come preconfigured commands you can use:

| Variable           | Description                                       |
| ------------------ | ------------------------------------------------- |
| npm run test       | Execute tests                                     |
| npm run test:trace | Execute tests and take screenshots                |
| npm run test:host  | Opens the Playwright UI in the browser of your OS |

You can also execute any playwright or [playwright-bdd](https://vitalets.github.io/playwright-bdd) command directly in your terminal.
