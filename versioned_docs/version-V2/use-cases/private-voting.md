---
sidebar_position: 2
---

# Private voting use case

The private voting use case describes how Semaphore interacts with your users and Ethereum to allow users to cast private votes in your application.
Learn how Semaphore enables applications to do the following:

- Register members as voters.
- Allow members to vote anonymously.
- Prove voter membership.
- Record and prove votes.
- Prevent double-voting.

## Roles

- **[Developer or community admin](#developer-or-community-admin)**
- **[Community member (dApp user)](#community-member)**
- **[Relay](#relay)**

### Developer or community admin

As a developer or community admin, you deploy the following:

- **Smart contract on Ethereum**: implements the Semaphore **base contract** to post transactions and verify proofs on Ethereum.
- **Poll**: Semaphore _group_ that members join to vote on proposals.
- **Decentralized application (dApp)**: user-friendly interface for members to join a poll and vote on a proposal.

### Community member

Community members connect their wallets to your dApp.
Your dApp provides a UI that enables the following user interactions:

1. Verify ownership of the community token.
2. Generate an anonymous ID.
3. Cast a vote.

:::info
Learn how to get started with Ethers.js and [connect to Ethereum wallets](https://docs.ethers.io/v5/getting-started).
:::

### Relay

To preserve anonymity and avoid disclosing the member's wallet address, the dApp may use a [relay](/docs/glossary/#relay) to broadcast the vote.
The relay calls the **contract** function that then posts the member's vote transaction to Ethereum.

## Private voting

Consider a scenario where your community issues a token that users can mint.
The token might be a Proof of Attendance (POAP), NFT, or social token that your users can mint to receive membership and vote in your community.

The voting scenario has the following steps:

1. [Create a poll](#create-a-poll): Coordinator creates a poll, or _group_, in which members can vote on a proposal.
2. [Register voters](#register-voters): Members join the poll to vote.
3. [Record votes](#record-votes): Once the poll opens, members may cast one vote, or _signal_, on the topic.

### Create a poll

A community coordinator ordApp administrator uses the deployed smart contract to create an on-chain (Ethereum) poll that members can join and vote on.

In the following sample code, the voting contract declares a `createPoll` function that uses the Semaphore base `_createGroup` function:

```ts title="https://github.com/semaphore-protocol/semaphore/contracts/extensions/SemaphoreVoting.sol"

function createPoll(
    uint256 pollId,
    address coordinator,
    uint8 depth
) public override {
    require(address(verifiers[depth]) != address(0), "SemaphoreVoting: depth value is not supported");

    // highlight-next-line
    _createGroup(pollId, depth, 0);

    Poll memory poll;

    poll.coordinator = coordinator;

    polls[pollId] = poll;

    emit PollCreated(pollId, coordinator);
}
```

A poll is a Semaphore [group](/docs/guides/groups/) that stores the following:

- A topic to vote on.
- The public ID of the poll creator.
- [Semaphore IDs](/docs/guides/identities/) of members who joined the poll.

To create the poll, the administrator calls the smart contract function--for example:

```ts
SemaphoreVoting.createPoll(pollId, coordinator, depth)
```

Next, learn how to [register voters](#register-voters) for the poll.

### Register voters

Before a user can register to vote, yourdApp needs to verify membership by checking the user's wallet for the NFT.
To grant access to the wallet, the user clicks a `Connect wallet` button in thedApp and allows thedApp to check for the NFT.
Once a member is verified, thedApp provides the following member interactions:

1. [Generate a private identity](#generate-a-private-identity).
2. [Join a poll](#join-a-poll).

#### Generate a private identity

To generate a private identity, the member completes a form in thedApp UI.
With the form values and the `@zk-kit/identity` library, thedApp prompts the member to sign a wallet message and then generates the signed private identity.
The private identity is known only to the member and can be used in future interactions with thedApp.

Next, learn how members [join a poll](#join-a-poll). 

#### Join a poll

Once the member has a private identity for thedApp, the member may select a poll to vote in.
When the member selects a poll, thedApp does the following:

1. Uses the `zk-kit` library to generate an anonymous Semaphore ID, or _identity commitment_, from the private identity.
2. Calls a contract function that adds the new Semaphore ID to the on-chain poll.

With a member registered for a poll, learn how thedApp [records votes](#record-votes).

### Record votes

Once members have joined a poll, the coordinator starts the poll to allow voting.
When a member submits a vote in the UI--for example, selects a radio button--then thedApp does the following:

1. Uses the `semaphore-protocol` library to verify that the voter registered a Semaphore ID to the poll.
2. Uses the `semaphore-protocol` library to create a proof of the vote, the poll identifier, the Semaphore ID, and a [nullifier](/docs/glossary/#nullifier) that prevents double-voting.
3. Sends the vote proof to the [relay](#relay).
