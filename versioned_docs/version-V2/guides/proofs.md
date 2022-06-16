---
sidebar_position: 3
title: Proofs
---

# Semaphore proofs

Once a [Semaphore group](/docs/glossary#semaphore-group) was created and users have joined with their [Semaphore identities](/docs/glossary#semaphore-identity), each of them can signal anonymously by generating a zero-knowledge proof to prove that:

-   they are part of that group,
-   the signal was created by the user who generated the proof.

The [`@semaphore-protocol/proof`](https://github.com/semaphore-protocol/semaphore.js/tree/main/packages/proof) library can be used to generate and verify proofs off-chain. The [`SemaphoreCore`](https://github.com/semaphore-protocol/semaphore/tree/main/contracts/base/SemaphoreCore.sol) contract can instead be used to verify proofs on-chain. Contracts can be imported from the [`@semaphore-protocol/contracts`](https://github.com/semaphore-protocol/semaphore/tree/main/contracts) NPM module.

:::info
Generating or verifying valid zero-knowledge proofs requires files that can only be obtained in an attested [trusted-setup ceremony](https://storage.googleapis.com/trustedsetup-a86f4.appspot.com/semaphore/semaphore_top_index.html). For a complete list of ready-to-use files visit [trusted-setup-pse.org](http://www.trusted-setup-pse.org/).
:::

## Generate a proof

Generating a valid Semaphore proof requires 5 properties:

-   `identity`: the Semaphore identity of the user who wants to generate the proof,
-   `group`: the group to which the user belongs,
-   `externalNullifier`: the value to be used to avoid double-signaling,
-   `signal`: the signal the user wants to send anonymously,
-   `snarkArtifacts`: the `zkey` and `wasm` files.

In the case of a voting system, once the voters' [identities](/docs/guides/identities#create-an-identity) and the ballot-related [group](/docs/guides/groups) have been created, and once the group contains all the users enabled to vote, the voter can vote by choosing one proposal and using a unique ballot id (e.g. the Merkle tree root of the group), so that only one vote per ballot can be cast.

```ts
import { generateProof } from "@semaphore-protocol/proof"

const externalNullifier = group.root
const signal = "proposal"

const fullProof = await generateProof(identity, group, externalNullifier, signal, {
    zkeyFilePath: "./semaphore.zkey",
    wasmFilePath: "./semaphore.wasm"
})
```

## Verify a proof

### Off-chain verification

Verifying a proof off-chain requires only the Semaphore proof and the verification key:

```ts
import { verifyProof } from "@semaphore-protocol/proof"

const verificationKey = JSON.parse(fs.readFileSync("./semaphore.json", "utf-8"))

await verifyProof(verificationKey, fullProof) // true or false.
```

### On-chain verification

The [`SemaphoreCore`](https://github.com/semaphore-protocol/semaphore/tree/main/contracts/base/SemaphoreCore.sol) contract uses a previously deployed verifier and provides methods to verify a proof and save the `nullifierHash` to avoid double-signaling.

```sol
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@semaphore-protocol/contracts/interfaces/IVerifier.sol";
import "@semaphore-protocol/contracts/base/SemaphoreCore.sol";

/// @title Private voting.
contract Ballot is SemaphoreCore {
    event Vote(bytes32 proposal);

    // Semaphore verifier that must be previously deployed.
    IVerifier public verifier;
    // It can be the Merkle tree root of the group used for this ballot.
    uint256 public ballotId;
    // List of ballot proposals.
    bytes32[] public proposals;

    constructor(address _verifier, uint256 _ballotId, bytes32[] memory _proposals) {
        verifier = IVerifier(_verifier);
        ballotId = _ballotId;
        proposals = _proposals;
    }

    function vote(
        bytes32 _proposal,
        uint256 _nullifierHash,
        uint256[8] calldata _proof
    ) external {
        _verifyProof(_proposal, ballotId, _nullifierHash, ballotId, _proof, verifier);

        // Prevent double-voting.
        _saveNullifierHash(_nullifierHash);

        emit Vote(_proposal);
    }
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
