---
sidebar_position: 2
---

## Private voting overview

The private voting use case describes how Semaphore interacts with your users and Ethereum to allow users to cast private votes in your application.
Learn how Semaphore enables applications to do the following:

- Register members as voters.
- Allow members to vote anonymously.
- Prove voter membership.
- Record and prove votes.
- Prevent double-voting.

## Steps

Learn how your users and your application interact with Semaphore and Ethereum, in the following steps:

### Prerequisites

For this use case, assume you have deployed the following:

- **NFT**: Proof of Attendance (POAP), NFT, or social token that your users can mint or acquire to receive membership in your community.
- **DApp**: Your decentralized application that provides a user-friendly interface to Ethereum and the Semaphore contract.
- **Contract**: Smart contract based on Semaphore and deployed on Ethereum.

### Introduction

Consider a scenario where your community issues an **NFT** that users can mint to join the community.
Anyone who holds the NFT in an Ethereum wallet may vote on community proposals and surveys.
The DApp must provide the following:
- a [secret ballot](https://en.wikipedia.org/wiki/Secret_ballot)
that preserves voter anonymity and privacy.
- proof that only members cast votes.
- a way to prevent double-voting.

:::info
Learn how to use [Ethers.js]() to [check Ethereum wallets]().
:::

Your **DApp** provides the UI that manages the interactions between users, wallets, and voting polls.
The voting scenario has the following steps:

1. [Create a poll](#create-a-poll): Coordinator creates a poll, or _group_, in which members can vote on a proposal.
2. [Register topics](#register-topics): Member submits a proposal, or _topic_, to a poll.
3. [Register voters](#register-voters): Members join the poll to vote.
4. [Record votes](#record-votes): Once the poll opens, members may cast one vote, or _signal_, on the topic.

### Create a poll

In this scenario, a poll is an on-chain Semaphore **group** that stores the following:
- A topic.
- The public ID of the poll creator.
- Semaphore IDs of members who joined the poll.

A community coordinator or DApp administrator creates polls and invites members to submit topics to polls.

### Register topics

Before a user can register a topic, your DApp needs to verify membership by checking the user's wallet for the NFT.
To grant access to the wallet, the user clicks a `Connect wallet` button in the Dapp.
Once verified, the member may add a topic to a poll.
To add a topic, a member clicks a `Submit topic` button in the DApp that then calls a contract function--for example:

```ts
SemaphoreVoting.createPoll
```

The member enters a topic and signs the transaction to save the poll on Ethereum.
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
