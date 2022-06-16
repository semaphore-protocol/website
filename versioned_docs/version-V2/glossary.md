---
sidebar_position: 7
---

# Glossary

## Identity commitment

The public [Semaphore identity](#semaphore-identity) value used in [Semaphore groups](#semaphore-group).

Semaphore uses the **Poseidon** hash function to create the identity commitment from the Semaphore identity secret values.
For more information, see the [Poseidon website](https://www.poseidon-hash.info/).

## Semaphore identity

The identity of a user in the Semaphore protocol.
An identity contains the following three values:

-   [Identity commitment](#identity-commitment): the public value.
-   Identity trapdoor and identity nullifier: secret values known only by the user.

## Semaphore group

A group is a binary incremental [Merkle tree](#merkle-tree) in which each leaf contains an [identity commitment](#identity-commitment) for a user.
The identity commitment proves that the user is a group member without revealing the Semaphore identity of the user.

Semaphore uses the **Poseidon** hash function to create Merkle trees.
For more information, see the [Poseidon website](https://www.poseidon-hash.info/).

## Merkle tree

A tree in which every leaf (i.e., a node that doesn't have children) is labelled with the cryptographic hash of a data block,
and every node that isn't a leaf is labelled with the cryptographic hash of its child node labels.
In zero-knowledge protocols, Merkle trees can be used to efficiently summarize and validate large data sets.
To validate that a tree contains a specific leaf, a verifier only needs a portion of the complete data structure.

For more information, see [Merkle tree in Wikipedia](https://en.wikipedia.org/wiki/Merkle_tree).
