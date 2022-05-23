---
sidebar_position: 2
---

# Circuits

[Semaphore circuits](https://github.com/semaphore-protocol/semaphore/tree/main/circuits) are the heart of the protocol and essentially allow you to prove that:

1. **Merkle tree**: the identity commitment exists in the Merkle tree,
2. **Nullifiers**: the signal was only broadcasted once,
3. **Signal**: the signal was truly broadcasted by the user who generated the proof.

![Semaphore circuit](https://github.com/semaphore-protocol/semaphore/raw/main/circuits/scheme.png)

The diagram above shows how the input signals are used in the Semaphore circuit and how the outputs are calculated.

## 1. Merkle tree

Users registering to the system possess an identity they must keep secret. A commitment to this structure is known to the public.

**Private inputs:**

-   `treeSiblings[nLevels]`: the values along the Merkle path to the user's identity commitment,
-   `treePathIndices[nLevels]`: the direction (0/1) per tree level corresponding to the Merkle path to the user's identity commitment,
-   `identityNullifier`: the 32-byte identity secret used as nullifier,
-   `identityTrapdoor`: the 32-byte identity secret used as commitment trapdoor.

**Public outputs:**

-   `root`: The Merkle root of the tree.

**Procedure:**

The circuit hashes the hash of the identity nullifier and the identity trapdoor to
generate an identity commitment. Then, it verifies the Merkle proof against
the Merkle root and the identity commitment.

## 2. Nullifiers

**Private inputs:**

-   `identityNullifier`: the 32-byte identity secret used as nullifier.

**Public inputs:**

-   `externalNullifier`: the 32-byte external nullifier.

**Public outputs:**

-   `nullifierHash`: the hash of the identity nullifier and the external nullifier used to prevent double-signaling.

**Procedure:**

The circuit hashes the identity nullifier and the external nullifier. Then, it checks that it matches the given nullifiers hash. Additionally,
the smart contract ensures that it has not previously seen this nullifiers hash. This way, double-signalling is impossible.

## 3. Signal

**Public inputs:**

-   `signalHash`: the hash of the user's signal.

**Procedure:**

The circuit calculates a dummy square of the signal hash to prevent any tampering with the proof.
