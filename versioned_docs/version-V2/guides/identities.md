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

In your code, use the [`@semaphore-protocol/identity`](https://github.com/semaphore-protocol/semaphore.js/tree/main/packages/identity) library to create a Semaphore identity _deterministically_ (from the hash of a message) or _randomly_.

-   [**Create random identities**](#create-random-identities)
-   [**Create deterministic identities**](#create-deterministic-identities)

### Create random identities

To create a random identity, instantiate `Identity` without any parameters--for example:

```ts
import { Identity } from "@semaphore-protocol/identity"

const identity = new Identity()
```

The new identity contains random `trapdoor` and `nullifier` secret values.
The following example shows how to use the `.getTrapdoor` and `.getNullifier`
accessor methods to retrieve the values:

```ts
// Random secret values.
const trapdoor = identity.getTrapdoor()
const nullifier = identity.getNullifier()
```

### Create deterministic identities

If you pass a message as a parameter, Semaphore generates `trapdoor` and `nullifier`
from the _SHA256_ hash of the message.
The message might be a password or a message that the user cryptographically signs with a private key.

When using deterministic identities, you should always keep the message secret. 
Given that the hash is deterministic, anyone with the same message can recreate the same identity.

```ts
const identity = new Identity("secret-message")
```

:::tip
Building a system to save or recover secret values of Semaphore identities is nontrivial.
You may choose to delegate such functionality to existing wallets such as Metamask--for example:

1. In Metamask, a user signs a message with the private key of their Ethereum account.
2. In your application, the user creates a deterministic identity with the signed message.
3. The user can now recreate their Semaphore identity whenever they want by signing
   the same message with their Ethereum account in Metamask.
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
