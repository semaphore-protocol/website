---
id: use-cases
title: What can i do with Semaphore?
sidebar_position: 1
---

## Zero knowledge primitives

Set membership is the problem of a prover P proving to a verifier V (or a set of verifiers)
that an element x is in a (usually public) set S. The prover computes a proof π and sends it to the verifier,
who should be able to efficiently check its validity (https://eprint.iacr.org/2022/155.pdf, p.7).


(from the Semaphore Overview)

- allows Ethereum users to prove their membership of a set which they had previously joined without revealing their original identity. 
- allows users to signal their endorsement of an arbitrary string.


## Onchain privacy use cases

- private voting
- whistleblowing
- mixers
- anonymous authentication

## Safety, security features

- prevents double-signalling
- prevents double-spending


## Semaphore features

Semaphore provides the following features:

1. Generate offchain identities and add them to a Merkle tree (offchain or onchain).
2. Anonymously broadcast a signal onchain, if and only if the identity of the owner belongs to a
   valid Merkle tree and if the nullifier has not already been used.

### Generate offchain identities



### Broadcast an onchain signal

## Use cases



### Use Semaphore for private voting
Walk me through https://raw.githubusercontent.com/appliedzkp/semaphore/main/circuits/scheme.png:

Private voting use case:
  - Goal is to clearly describe roles and responsibilities in each step.
  - Comment on draft review https://github.com/semaphore-protocol/docs/pull/2/files#diff-ed5798bfec02cfeada5a9c8b8afd91462ad8b4a544793e16616342a79d51066e
 
Identities:
  - Is an identity commitment (Semaphore ID) created prior to voting or at the time of vote? In this scenario, is each vote a new commitment?
Groups:
  - Arbitrary array of Semaphore IDs?
  - Membership in a group?
  - Who defines?
  - When are they created?
  - How are they created?

Verifier:
  - What is this doing? Gets all "verifiers" from the network?
      `const VerifierContract = await ethers.getContractFactory("Verifier")`

1. Generate identity
  - Random identity - have to save your identity
  - Ethereum identity
  - Interep
    - identity commitment for everytime they join a group, so
    - one trxn for creating identity and joining group
    - one trxn for generating vote proof
    

### Use Semaphore for private whistleblowing
