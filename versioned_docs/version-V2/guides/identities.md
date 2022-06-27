---
sidebar_position: 1
title: Identities
---

# Semaphore identities

In order to join a [Semaphore group](/docs/glossary#semaphore-group), a user must first create a [Semaphore identity](/docs/glossary#semaphore-identity).
A Semaphore identity contains two values generated with the identity:

-   Identity trapdoor
-   identity nullifier

To use and verify the identity, the identity owner (user) must know the trapdoor and nullifier values.
To prevent fraud, the owner should keep both values secret.

## Create identities

Use the [`@semaphore-protocol/identity`](https://github.com/semaphore-protocol/semaphore.js/tree/main/packages/identity) library to create a Semaphore identity _deterministically_ (from the hash of a message) or _randomly_.

-   [**Create random identities**](#create-random-identities)
-   [**Create deterministic identities**](#create-deterministic-identities)

### Create random identities

To create a random identity, instantiate `Identity` without any parameters. For example:

```ts
import { Identity } from "@semaphore-protocol/identity"

const identity = new Identity()
```

The new identity contains random `trapdoor` and `nullifier` secret values.
The following example shows how to use the `.getTrapdoor` and `.getNullifier` accessor methods to retrieve the values:

```ts
// Random secret values.
const trapdoor = identity.getTrapdoor()
const nullifier = identity.getNullifier()
```

### Create deterministic identities

If you pass a message as a parameter, trapdoor and nullifier will be generated from the SHA256 hash of the message. The message must clearly be kept secret in turn, since anyone who owns the message can recreate the same identity. The message can be a password or a message signed with a private key.

```ts
const identity = new Identity("secret-message")
```

:::tip
Since building a system to save or recover the secret values of Semaphore identities is nontrivial, a message signed with the private key of the users' Ethereum account allows these functionalities to be delegated to an existing wallet (e.g., Metamask). Users can recreate their Semaphore identity whenever they want using their Ethereum account by signing the same message.
:::

## Saving your identities

You can also export and save the identities.

```ts
const identityBackup = identity.toString()

// It contains trapdoor and nullifier as a JSON array.
console.log(identityBackup) // '["8255d...", "62c41..."]'
```

And reuse the same identity later.

```ts
const identity = new Identity(identityBackup)
```

## Identity commitments

The Poseidon hash of the identity nullifier and trapdoor is called the identity secret, and its hash is the identity commitment. The latter, similarly to Ethereum addresses, is a public value and is used in Semaphore groups to represent the identity of members.

```ts
const identityCommitment = identity.generateCommitment()
```
