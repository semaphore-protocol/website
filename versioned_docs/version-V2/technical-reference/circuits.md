---
sidebar_position: 2
---

# Circuits

The [Semaphore circuit](https://github.com/semaphore-protocol/semaphore/tree/main/circuits) is the heart of the protocol and can essentially be divided into three parts:

-   [**Proof of membership**](/docs/technical-reference/circuits#proof-of-membership)
-   [**Nullifier hash**](/docs/technical-reference/circuits#nullifier-hash)
-   [**Signal**](/docs/technical-reference/circuits#signal)

![Semaphore circuit](https://github.com/semaphore-protocol/semaphore/raw/main/circuits/scheme.png)

The diagram above shows how the input signals are used in the Semaphore circuit and how the outputs are calculated.

## Proof of membership

The circuit hashes the hash of the identity nullifier and the identity trapdoor to generate an identity commitment. Then, it verifies the proof of membership against the Merkle root and the identity commitment.

**Private inputs:**

-   `treeSiblings[nLevels]`: the values along the Merkle path to the user's identity commitment,
-   `treePathIndices[nLevels]`: the direction (0/1) per tree level corresponding to the Merkle path to the user's identity commitment,
-   `identityNullifier`: the 32-byte identity secret used as nullifier,
-   `identityTrapdoor`: the 32-byte identity secret used as trapdoor.

**Public outputs:**

-   `root`: The Merkle root of the tree.

## Nullifier hash

The circuit hashes the identity nullifier and the external nullifier. Then, it checks that it matches the given nullifier hash. Nullifier hashes are saved in a Semaphore smart contract, so that the smart contract itself can reject a proof with an already used nullifier hash.

**Private inputs:**

-   `identityNullifier`: the 32-byte identity secret used as nullifier.

**Public inputs:**

-   `externalNullifier`: the 32-byte external nullifier.

**Public outputs:**

-   `nullifierHash`: the hash of the identity nullifier and the external nullifier used to prevent double-signaling.

**Procedure:**

## Signal

The circuit calculates a dummy square of the signal hash to prevent any tampering with the proof.

**Public inputs:**

-   `signalHash`: the hash of the user's signal.
