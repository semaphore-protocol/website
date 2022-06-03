---
sidebar_position: 7
---

# Glossary

## Semaphore Identity

Semaphore identities represent the identities of users within the protocol. Each identity consists of two secret values (i.e. identity trapdoor and identity nullifier), which only the user needs to know, and a public value (i.e. identity commitment), which is used in [Semaphore groups](/docs/glossary#semaphore-group). The public value is obtained from the [Poseidon hash](https://www.poseidon-hash.info/) of the secret values.

## Semaphore Group

Semaphore groups are sets of [Semaphore identities](/docs/glossary#semaphore-identity). Each group is a binary incremental [Merkle tree](/docs/glossary#merkle-tree) in which each leaf contains the Semaphore identity commitment. Merkle trees are used by Semaphore to allow members of a group to prove that they are part of that group without revealing their Semaphore identity. Semaphore uses [Poseidon](https://www.poseidon-hash.info/) as a hash function for Merkle trees.

## Merkle tree

A [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) is a tree in which every leaf (i.e. nodes which have no children) is labelled with the cryptographic hash of a data block, and every node that is not a leaf is labelled with the cryptographic hash of the labels of its child nodes. Merkle trees are used to efficiently summarize and validate large data sets. To prove that a leaf is part of the tree, it is not necessary to share the whole data structure but only a portion of it.
