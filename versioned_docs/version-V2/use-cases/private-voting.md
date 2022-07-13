---
sidebar_position: 2
---

# Private voting overview

The private voting use case describes how Semaphore interacts with your users and Ethereum to allow users to cast private votes in your application.
Learn how Semaphore enables applications to do the following:

- Register members as voters.
- Allow members to vote anonymously.
- Prove voter membership.
- Record and prove votes.
- Prevent double-voting.

## Introduction

Consider a scenario where your community issues a token that users can mint.
The token might be a Proof of Attendance (POAP), NFT, or social token that your users can mint to receive membership and vote in your community.

## Roles

### Developer or community admin

As a developer or community admin, you deploy the following:

- **Smart contract on Ethereum**: implements the Semaphore **base contract** to post transactions and verify proofs on Ethereum.
- **Poll**: Semaphore _group_ that members join to vote.
- **Decentralized application (DApp)**: provides a user-friendly interface for members to vote on a proposal.

### Community member

Community members connect their wallets to your DApp to do the following:

1. Verify they own the NFT.
2. Generate an anonymous ID.
3. Cast a vote.

:::info
Learn how to use [Ethers.js]() to [check Ethereum wallets]().
:::

### Relay

To preserve anonymity and avoid disclosing the user's wallet address, the DApp may use a [relay](/docs/glossary/#relay) to broadcast the vote.
The relay calls the **contract** function that then posts the vote transaction to Ethereum.

## Steps for private voting

The voting scenario has the following steps:

1. [Create a poll](#create-a-poll): Coordinator creates a poll, or _group_, in which members can vote on a proposal.
2. [Register voters](#register-voters): Members join the poll to vote.
3. [Record votes](#record-votes): Once the poll opens, members may cast one vote, or _signal_, on the topic.

### Create a poll

A community coordinator or DApp administrator creates a poll that members can join and vote on.
A poll is a Semaphore [group](/docs/guides/groups/) that stores the following:

- A topic to vote on.
- The public ID of the poll creator.
- [Semaphore IDs](/docs/guides/identities/) of members who joined the poll.

To create an on-chain (Ethereum) poll, the administrator calls a function in the deployed smart contract--for example:

```ts
SemaphoreVoting.createPoll
```

Next, learn how to [register voters](#register-voters) for the poll.

### Register voters

Before a user can register to vote, your DApp needs to verify membership by checking the user's wallet for the NFT.
To grant access to the wallet, the user clicks a `Connect wallet` button in the Dapp and allows the DApp to check for the NFT.
For a verified member, the DApp provides the following interactions:

- [Generate a private identity](#generate-a-private-identity).
- [Join a poll](#join-a-poll).

#### Generate a private identity

The DApp displays a form that allows the member to create a private identity.
Once the member completes the form, the DApp uses the form values and the `@zk-kit/identity` library to prompt the member to sign a wallet message and generate the signed private identity.
The private identity is known only to the member and can be used in future interactions with the DApp.
In this scenario, a member with a private identity can [join a poll](). 

#### Join a poll

Once the member has a private identity for the DApp, the member may select a poll to vote in.
When the member selects a poll, the DApp does the following:

1. Uses the `zk-kit` library to generate an anonymous Semaphore ID, or _identity commitment_, from the private identity.
2. Calls a contract function that adds the new Semaphore ID to the on-chain poll.

With a member registered for a poll, learn how the Dapp [records votes](#record-votes).

### Record votes

Once members have joined a poll, the coordinator starts the poll to allow voting.
When a member submits a vote--for example, makes a radio button selection--then the DApp does the following:

1. Use the `semaphore-protocol` library to verify that the voter registered a Semaphore ID to the poll.
2. Use the `semaphore-protocol` library to create a proof of the vote, the poll identifier, the Semaphore ID, and a nullifier that prevents double-voting. To learn more, see [how Semaphore and prevents double-voting]().
3. Send the vote proof to a relayer that calls a **contract** function to cast the vote to Ethereum. To learn more, see [how relayers preserve anonymity]().
