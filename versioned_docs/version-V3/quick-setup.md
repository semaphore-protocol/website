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

The project contains a simple contract, a task to deploy that contract and some tests. To start using the NPM scripts, install the dependencies first:

```bash
cd my-app
npm i
```

The contract creates a Semaphore group, allows users to join that group with their Semaphore identity, and finally allows group members to send an anonymous greeting.
