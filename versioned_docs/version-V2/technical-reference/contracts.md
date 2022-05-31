---
sidebar_position: 3
---

# Contracts

Semaphore includes three types of contracts:

-   [**Base contracts**](https://github.com/semaphore-protocol/semaphore/tree/main/contracts/base): they allow you to use the main protocol features.
-   [**Extension contracts**](https://github.com/semaphore-protocol/semaphore/tree/main/contracts/extensions): they contain application logic for specific use-cases (e.g. anonymous voting).
-   [**Verifiers**](https://github.com/semaphore-protocol/semaphore/tree/main/contracts/verifiers): they are used to verify Semaphore proofs.

Semaphore also provides [`Semaphore.sol`](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/Semaphore.sol), that you can use to manage groups and verify zero-knowledge proofs without [inheriting](https://docs.soliditylang.org/en/v0.8.14/contracts.html#inheritance) the [base contracts](/docs/technical-reference/contracts#base-contracts), and thus saving the gas needed to deploy them.

:::info
[`@semaphore-protocol/contracts`](https://www.npmjs.com/package/@semaphore-protocol/contracts) can be used to inherit base or extension contracts, or to use our [deployed contracts](/docs/deployed-contracts) with Solidity [interfaces](https://github.com/semaphore-protocol/semaphore/tree/main/contracts/interfaces).
:::

## Base contracts

There are currently two base contracts:

-   [**SemaphoreCore.sol**](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/base/SemaphoreCore.sol): it contains the functions to verify Semaphore proofs and to save the nullifier hash in order to avoid double signaling;
-   [**SemaphoreGroups.sol**](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/base/SemaphoreGroups.sol): it contains the functions to create groups and add/remove members.

These contracts are closely related to the protocol. While some dApps may use on-chain groups, others may prefer to use off-chain groups, saving only their tree roots in the contract.

## Extension contracts

-   [**SemaphoreVoting.sol**](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/extensions/SemaphoreVoting.sol): it contains the essential functions to create polls, add voters and cast votes anonymously;
-   [**SemaphoreWhistleblowing.sol**](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/extensions/SemaphoreWhistleblowing.sol): it contains the essential functions to create entities (e.g. non-profit organizations), add whistleblowers and publish leaks anonymously.

These contracts are just extensions of the protocol. More extensions will be added in the future.

## Verifiers

When using [`SemaphoreCore.sol`](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/base/SemaphoreCore.sol) to verify Semaphore proofs you must also pass the address of a previously deployed verifier contract. You can choose to manually deploy the verifier you prefer or you can use one of our [deployed verifiers](/docs/deployed-contracts#verifiers).

Each verifier can verify Semaphore proofs generated with a specific tree depth. For example, the `Verifier20.sol` contract can be used to verify proofs where the depth of the tree is 20, which means that the group used for those proofs can have a maximum of 2^20=1048576 members.
