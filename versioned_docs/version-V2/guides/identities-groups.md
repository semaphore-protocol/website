---
sidebar_position: 1
---

# Identities and groups

## Generating Semaphore identities

In order for users to join [Semaphore groups](/docs/glossary/semaphore-group), they must first generate their [Semaphore identity](/docs/glossary/semaphore-identity). When a new identity is generated, two values are created: the identity trapdoor and the identity nullifier. These values, which only the user must know and should be kept secret, can be generated in two ways: randomly or deterministically (from the hash of a message).

### Random strategy

The default strategy allow you to generate identities with random secret values.

```ts
import { ZkIdentity, Strategy } from "@zk-kit/identity"

const identity = new ZkIdentity()
// Secret values.
const trapdoor = identity.getTrapdoor()
const nullifier = identity.getNullifier()
```

You can also export and save the identity as JSON file.

```ts
// JSON which contains trapdoor and nullifier.
const serializedIdentity = identity.serializeIdentity()
```

And reuse the same identity later with a serialized strategy.

```ts
const identity = new ZkIdentity(Strategy.SERIALIZED, serializedIdentity)
```

### Message strategy

The message strategy generates secret values by computing the hash of a message. The message must clearly be kept secret in turn. It can be a password or a message signed with a private key.

```ts
const identity = new ZkIdentity(Strategy.MESSAGE, "secret-message")
```

:::tip
Since building a system to save or recover the secret values of Semaphore identities is nontrivial, a message signed with the private key of the users' Ethereum account allows these functionalities to be delegated to an existing wallet (e.g., Metamask). Users can regenerate their Semaphore identity whenever they want using their Ethereum account by signing the same message.
:::

### Identity commitments

The Poseidon hash of the identity nullifier and identity trapdoor is called the identity secret, and its hash is the identity commitment. The latter, similarly to Ethereum addresses, is a public value and is used in Semaphore groups to represent the identity of members.

```ts
const identityCommitment = identity.genIdentityCommitment()
```

## Creating groups
