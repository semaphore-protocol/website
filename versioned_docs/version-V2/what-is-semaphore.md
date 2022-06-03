---
id: introduction
title: What Is Semaphore?
sidebar_position: 1
---

:::caution
Semaphore's V2 documentation is under development.
:::

## Overview

[Semaphore](https://github.com/semaphore-protocol/semaphore) is a zero-knowledge **protocol**
which allows users to prove their membership of a group which they had
previously joined without revealing their original identity. At the same time,
it allows users to signal their endorsement of an arbitrary string. It is
designed to be a simple and generic **privacy layer** for Ethereum dApps. Use cases
include private voting, whistleblowing, anonymous DAOs and mixers.
Finally, it provides a simple built-in mechanism to prevent double-signalling
or double-spending.

Semaphore comprises of smart contracts and
[zero-knowledge](https://z.cash/technology/zksnarks/) components which work in
tandem. The Semaphore smart contracts handles identity groups and proof
verification on-chain. The zero-knowledge components work off-chain to allow
users to generate identities and proofs, which allow the smart contract to update its state
if these proofs are valid.

Semaphore is designed to allow building dApps in a **modular** fashion. Developers can decide what to use and which parts to customize according to their needs.

## Basic features

Semaphore provides the ability to:

1. generate off-chain identities and add them to a Merkle tree (off-chain or on-chain);
2. anonymously broadcast a signal on-chain, if and only if the identity of the owner belongs to a
   valid Merkle tree and if the nullifier has not already been used.

## About the code

The core of the protocol is in the [circuit logic](https://github.com/semaphore-protocol/semaphore/tree/main/circuits/scheme.png). In addition to circuits,
Semaphore also provides [Solidity contracts](https://github.com/semaphore-protocol/semaphore/tree/main/contracts)
and [JavaScript libraries](https://github.com/appliedzkp/zk-kit) (i.e. `@zk-kit/identity` and `@zk-kit/protocols`) to allow developers to generate zero-knowledge proofs and verify them with minimal effort.

The Semaphore V2 code base was audited with a focus on the smart contracts and the Circom circuits. The summary of the audit results can be found [here](https://semaphore.appliedzkp.org/audit-v2.pdf).
