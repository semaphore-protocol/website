---
sidebar_position: 3
---

# Contracts

Semaphore includes three types of contracts:

-   [**Base contracts**](/docs/technical-reference/contracts#base-contracts)
-   [**Extension contracts**](/docs/technical-reference/contracts#extension-contracts)
-   [**Verifiers**](/docs/technical-reference/contracts#verifiers)

:::info
Semaphore contracts and interfaces can be used with the [`@semaphore-protocol/contracts`](https://github.com/semaphore-protocol/semaphore/tree/main/contracts) NPM package.
:::

## Base contracts

There are currently two base contracts:

-   [`SemaphoreCore.sol`](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/base/SemaphoreCore.sol): contains the functions to verify Semaphore proofs and to save the nullifier hash in order to avoid double signaling;
-   [`SemaphoreGroups.sol`](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/base/SemaphoreGroups.sol): contains the functions to create groups and add/remove members.

These contracts are closely related to the protocol. You can inherit them in your contract or you can decide to use [`Semaphore.sol`](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/Semaphore.sol), which inherit them for you. See our [deployed contracts](/docs/deployed-contracts#semaphoresol) to find the addresses for your network.

:::info
While some dApps may use on-chain groups, others may prefer to use off-chain groups, saving only their tree roots in the contract.
:::

## Extension contracts

-   [`SemaphoreVoting.sol`](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/extensions/SemaphoreVoting.sol): contains the essential functions to create polls, add voters and cast votes anonymously;
-   [`SemaphoreWhistleblowing.sol`](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/extensions/SemaphoreWhistleblowing.sol): contains the essential functions to create entities (e.g. non-profit organizations), add whistleblowers and publish leaks anonymously.

These contracts contain application logic for specific use-cases and are basically extensions of the protocol. More extensions will be added in the future.

## Verifiers

When using [`SemaphoreCore.sol`](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/base/SemaphoreCore.sol) to verify Semaphore proofs you must also pass the address of a previously deployed verifier contract. You can choose to manually deploy the [verifier](https://github.com/semaphore-protocol/semaphore/tree/main/contracts/verifiers) you prefer or you can use one of our [deployed verifiers](/docs/deployed-contracts#verifiers).

Each verifier can verify Semaphore proofs generated with a specific tree depth. For example, the `Verifier20.sol` contract can be used to verify proofs where the depth of the tree is 20, which means that the group used for those proofs can have a maximum of 2^20=1048576 members.
