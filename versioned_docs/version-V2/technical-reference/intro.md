---
sidebar_position: 1
---

# Introduction

In order for users to use Semaphore, they must generate an **identity** consisting of two secret values: **identity trapdoor** and **identity nullifier**. The hash of these values is the **identity secret**, while the hash of the identity secret is the **identity commitment**, which is instead known to the public. The identity commitment can be considered as an Ethereum address.

Semaphore allows users to join public groups represented by a data structure in which membership can be efficiently demonstrated, **Merkle trees**. When a new member joins a group, a new leaf is created in the tree with the user's identity commitment as its value.

User identity and proof of membership are used to create valid **zero-knowledge proofs** and to allow users to **signal** anonymously, but without a mechanism to prevent these proofs from being reused they would be unusable in most cases. This is why an **external nullifier** is combined with the identity nullifier to form an opaque nonce value, which uniquely identifies a signal from an identity to a specific external nullifier.

In the case of a dApp to allow users to vote anonymously, a poll would be considered a group (or a Merkle tree), identity commitments would represent the voters, signals would be the votes, and the poll id would be the external nullifier. Each voter could then vote only once, since in the zero-knowledge proof generated for voting, the value poll id (external nullifier) associated with the user's identity (identity nullifier) saved the first time would prevent further votes.
