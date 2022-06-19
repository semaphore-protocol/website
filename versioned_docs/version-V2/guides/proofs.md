---
sidebar_position: 3
title: Proofs
---

# Semaphore proofs

Learn how to use Semaphore to generate and verify zero-knowledge proofs.

## Broadcast anonymous signals

Once a user joins their [Semaphore identity](/docs/glossary#semaphore-identity) to a [Semaphore group](/docs/glossary#semaphore-group), the user can signal anonymously with a zero-knowledge proof that proves the following:

-   The user is a member of the group.
-   The same user created the signal and the proof.

Developers can use Semaphore for the following:

- [Generate a proof off-chain](#generate-a-proof)
- [Verify a proof off-chain](#verify-a-proof-off-chain)
- [Verify a proof on-chain](#verify-a-proof-on-chain)

:::info
To generate or verify valid zero-knowledge proofs, your application must include Semaphore _trusted-setup_ files.
For a complete list of ready-to-use files, see <http://www.trusted-setup-pse.org/>.
To learn more, see the [trusted-setup ceremony](https://storage.googleapis.com/trustedsetup-a86f4.appspot.com/semaphore/semaphore_top_index.html). 
:::

## Generate a proof off-chain

Use the [`@semaphore-protocol/proof`](https://github.com/semaphore-protocol/semaphore.js/tree/main/packages/proof) library to generate an off-chain proof.
To generate a proof, pass the following properties to the `generateProof` function:

-   `identity`: The Semaphore identity of the user broadcasting the signal and generating the proof.
-   `group`: The group to which the user belongs.
-   `externalNullifier`: The value that prevents double-signaling.
-   `signal`: The signal the user wants to send anonymously.
-   `snarkArtifacts`: The `zkey` and `wasm` trusted-setup files.

In the voting system use case, once all the voters have joined their [identities](/docs/guides/identities#create-an-identity) to the ballot [group](/docs/guides/groups),
a voter can generate a proof to vote for a proposal.
In the call to `generateProof`, the voting system passes the unique ballot ID (the [Merkle tree](/docs/glossary/#merkle-tree/) root of the group) as the 
`externalNullifier` to prevent the voter signaling more than once for the ballot.
The following example shows how to use `generateProof` to generate the voting proof:

```ts
import { generateProof } from "@semaphore-protocol/proof"

const externalNullifier = group.root
const signal = "proposal_1"

const fullProof = await generateProof(identity, group, externalNullifier, signal, {
    zkeyFilePath: "./semaphore.zkey",
    wasmFilePath: "./semaphore.wasm"
})
```

## Verify a proof off-chain

Contracts can be imported from the [`@semaphore-protocol/contracts`](https://github.com/semaphore-protocol/semaphore/tree/main/contracts) NPM module.

Verifying a proof off-chain requires only the Semaphore proof and the verification key:

```ts
import { verifyProof } from "@semaphore-protocol/proof"

const verificationKey = JSON.parse(fs.readFileSync("./semaphore.json", "utf-8"))

await verifyProof(verificationKey, fullProof) // true or false.
```

### Verify a proof on-chain

The [`SemaphoreCore`](https://github.com/semaphore-protocol/semaphore/tree/main/contracts/base/SemaphoreCore.sol) contract uses a previously deployed verifier and provides methods to verify a proof and save the `nullifierHash` to avoid double-signaling.

To verify Semaphore proofs in your contract, import [`SemaphoreCore`](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/base/SemaphoreCore.sol) and call its internal methods. The following code sample shows how the [`Semaphore`](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/Semaphore.sol) contract uses `SemaphoreCore`:

```sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./interfaces/ISemaphore.sol";
import "./base/SemaphoreCore.sol";
import "./base/SemaphoreGroups.sol";

/// @title Semaphore
contract Semaphore is ISemaphore, SemaphoreCore, SemaphoreGroups {

    ...

    function verifyProof(
        uint256 groupId,
        bytes32 signal,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof
    ) external override {
        uint256 root = getRoot(groupId);
        uint8 depth = getDepth(groupId);

        require(depth != 0, "Semaphore: group does not exist");

        IVerifier verifier = verifiers[depth];

        _verifyProof(signal, root, nullifierHash, externalNullifier, proof, verifier);

        _saveNullifierHash(nullifierHash);

        emit ProofVerified(groupId, signal);
    }

    ...
}
```

To get a proof compatible with Solidity contracts you can use the `packToSolidityProof` utility function:

```ts
import { packToSolidityProof } from "@semaphore-protocol/proof"

const solidityProof = packToSolidityProof(fullProof.proof)
```

The nullifier hash can be retrieved in the public signals of the Semaphore proof:

```ts
const { nullifierHash } = fullProof.publicSignals
```
