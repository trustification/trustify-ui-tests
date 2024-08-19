# Developing trustify-ui-tests
This document describes how to setup your environment to run the trustify-ui-tests on your local environment

## System Requirements
Playwright is officially [supported](https://playwright.dev/docs/intro#system-requirements) to,
- Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
- macOS 13 Ventura, or macOS 14 Sonoma.
- Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04, Ubuntu 24.04, on x86-64 and arm64 architecture.

To run Playwright on [unsupported Linux distributions](https://github.com/microsoft/playwright/issues/26482) like Fedora, The playwright can be configured on docker and the tests can be executed from the client (local machine).

Create compose.yaml file with the below content and make sure to update the Playwright [version](https://hub.docker.com/r/microsoft/playwright)
```
services:
  playwright:
    image: mcr.microsoft.com/playwright:<version>-jammy
    restart: always
    container_name: "playwright"
    init: true
    ipc: host
    ports:
      - '5000:5000'
    command:
      [
        "/bin/sh",
        -c,
        "cd /home/pwuser && npx -y playwright@<version> run-server --port 5000"
      ]
    network_mode: host
```
Example compose.yaml using playwright version 1.46.0 and port 5000

```
services:
  playwright:
    image: mcr.microsoft.com/playwright:v1.46.0-jammy
    restart: always
    container_name: "playwright"
    init: true
    ipc: host
    ports:
      - '5000:5000'
    command:
      [
        "/bin/sh",
        -c,
        "cd /home/pwuser && npx -y playwright@1.46.0 run-server --port 5000"
      ]
    network_mode: host
```
Run the compose.yaml file using podman-compose command
``` 
podman-compose -f compose.yaml up
```
The output for the above command following the container in Ready state would be,
```
Listening on ws://127.0.0.1:5000/
```

Now the user can execute the Playwright tests using the below command
```
TRUSTIFY_URL=http://localhost:8080 PW_TEST_CONNECT_WS_ENDPOINT=ws://localhost:5000/ npx playwright test
```