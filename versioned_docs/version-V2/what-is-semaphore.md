---
id: introduction
title: What Is Semaphore?
sidebar_position: 1
---

## Overview

[Semaphore](https://github.com/semaphore-protocol/semaphore) is a [zero-knowledge](https://z.cash/technology/zksnarks) protocol that allows users to prove their membership in a group and send signals such as votes or endorsements without revealing their identity. Additionally, it provides a simple mechanism to prevent double-signaling. Use cases include private voting, whistleblowing, anonymous DAOs and mixers.

## Features

With Semaphore, you can allow your users to do the following:

1. [Create a private identity and get a provable anonymous public identity](/docs/guides/identities/).
2. [Add an anonymous public identity to a group](/docs/guides/groups/) (i.e. _Merkle tree_).
3. [Anonymously broadcast a signal](/docs/guides/proofs/) if the user joined the group and hasn't yet used the nullifer.

Semaphore uses on-chain smart contracts and off-chain zero-knowledge components that work in tandem.

-   Off chain, zero-knowledge components allow users to generate identities and proofs.
-   On chain, smart contracts manage groups and verify proofs that, if valid, allow the smart contract to update its state.

## Developer benefits

Semaphore is designed to be a simple and generic _privacy layer_ for decentralized applications (dApps) on Ethereum. It encourages modular application design, allowing dApp developers to choose and customize the on-chain and off-chain components they need.

## About the code

The core of the protocol is in the [circuit logic](https://github.com/semaphore-protocol/semaphore/tree/main/circuits/scheme.png).
In addition to circuits,
Semaphore provides [Solidity contracts](https://github.com/semaphore-protocol/semaphore/tree/main/contracts)
and [JavaScript libraries](https://github.com/semaphore-protocol/semaphore.js) that allow developers to generate zero-knowledge proofs and verify them with minimal effort.

The Semaphore V2 codebase was audited with a focus on the smart contracts and the Circom circuits.
See the [audit summary](https://semaphore.appliedzkp.org/audit-v2.pdf).

:::info
If you are using the previous version of Semaphore, see the [Semaphore V1 documentation](/docs/V1/introduction) ([code](https://github.com/semaphore-protocol/semaphore/tree/version/1.0.0)).
:::
