---
sidebar_position: 2
---

# Quick setup

Semaphore provides an official CLI to set up your project with Hardhat. If your NPM version is 5.2 or higher you can use NPX:

```bash
npx @semaphore-protocol/cli@latest init my-app
```

Otherwise, install `@semaphore-protocol/cli` globally and run the `init` command:

```bash
npm i -g @semaphore-protocol/cli@latest
semaphore init my-app
```

:::info
The [`semaphore`](https://github.com/semaphore-protocol/semaphore/tree/main/packages/cli) CLI can also be used to get group data from a supported network (e.g `semaphore get-groups --network goerli`).
:::

To start working on your project, install the dependencies:

```bash
cd my-app
npm i
```

## Output

The `init` command will create a directory called my-app (or whatever name you choose) inside the current folder. That directory will contain the initial project structure, which includes a simple contract, a task to deploy that contract and some tests.

```
my-app
├── contracts
│   └── Greeter.sol
├── .env.example
├── .gitignore
├── hardhat.config.ts
├── package.json
├── README.md
├── tasks
│   └── deploy.ts
├── test
│   └── Greeter.ts
└── tsconfig.json
```

The `Greeter.sol` contract creates a Semaphore group, allows users to join that group with their Semaphore identity, and finally allows group members to send an anonymous greeting.

## Usage

### Compile

Compile your contracts by running:

```bash
npm run compile
```

### Test

Test your contracts by running:

```bash
npm test
```

You can also generate a test coverage report:

```bash
npm run test:coverage
```

Or a test gas report:

```bash
npm run test:report-gas
```

### Deploy

Follow the instructions below to deploy your contracts:

1. Copy the `.env.example` file as `.env`.

    ```bash
    cp .env.example .env
    ```

2. Add your environment variables.

    :::note
    You should at least set a valid Ethereum URL (e.g. Infura) and a private key with some ethers.
    :::

3. And deploy your contract.

    ```bash
    npm run deploy --semaphore <semaphore-address> --group <group-id> --network goerli
    ```

    :::note
    Check the Semaphore contract addresses [here](/docs/deployed-contracts#semaphore).
    :::

    :::caution
    The group id is a number.
    :::
