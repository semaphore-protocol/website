---
sidebar_position: 3
---

# Contracts

Semaphore includes two types of contracts:

-   [**Base contracts**](https://github.com/semaphore-protocol/semaphore/tree/main/contracts/base): they allow you to use the main protocol features (i.e. verify a proof or manage Merkle trees/groups).
-   [**Extension contracts**](https://github.com/semaphore-protocol/semaphore/tree/main/contracts/extensions): they contain application logic for specific use-cases (e.g. anonymous voting).

Contracts can be used with the `@semaphore-protocol/contracts` NPM package. Semaphore also provides a pre-deployed contract that extends the base contracts and can be used with the appropriate interface. Their addresses can be found in the [README](https://github.com/semaphore-protocol/semaphore#deployed-contracts) file.

## Base contracts

There are currently two base contracts:

-   [**SemaphoreCore.sol**](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/base/SemaphoreCore.sol): it contains the functions to verify Semaphore proofs and to save the nullifier hash in order to avoid double signaling;
-   [**SemaphoreGroups.sol**](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/base/SemaphoreGroups.sol): it contains the functions to create groups, add or remove members.

These contracts are closely related to the protocol. `SemaphoreGroups` is an abstract contract and its functions can be overridden, whereas `SemaphoreCore` must always be imported in order to verify proofs. While some dApps may use on-chain groups, others may prefer to use off-chain groups, saving only their tree roots in the contract.

## Extension contracts

-   [**SemaphoreVoting.sol**](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/extensions/SemaphoreVoting.sol): it contains the essential functions to create polls, add voters and cast votes anonymously;
-   [**SemaphoreWhistleblowing.sol**](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/extensions/SemaphoreWhistleblowing.sol): it contains the essential functions to create entities (e.g. non-profit organizations), add whistleblowers and publish leaks anonymously.

These contracts are just extensions of the protocol. More extensions will be added in the future.
