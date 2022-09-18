---
sidebar_position: 6
---

# Subgraph

[The Graph](https://thegraph.com/) is a protocol for indexing networks like Ethereum and IPFS.
Site owners publish _subgraphs_ that expose site data for anyone to query.
Semaphore's subgraph allows you to retrieve data from the [`Semaphore.sol`](https://github.com/semaphore-protocol/semaphore/blob/main/packages/contracts/Semaphore.sol) smart contract.

:::tip
The Graph protocol uses the [GraphQL](https://graphql.org/) query lanaguage. If you don't know GraphQL, you can query Semaphore with the [Graph Explorer Playground](https://thegraph.com/hosted-service/subgraph/semaphore-protocol/goerli?selected=playground).
For examples, see the [GraphQL API documentation](https://thegraph.com/docs/developer/graphql-api).
:::

## Endpoints

### Goerli

-   **Queries** (HTTP): https://api.thegraph.com/subgraphs/name/semaphore-protocol/goerli
-   **Subscriptions** (WS): wss://api.thegraph.com/subgraphs/name/semaphore-protocol/goerli

### Arbitrum One

-   **Queries** (HTTP): https://api.thegraph.com/subgraphs/name/semaphore-protocol/arbitrum
-   **Subscriptions** (WS): wss://api.thegraph.com/subgraphs/name/semaphore-protocol/arbitrum

## Schema

### Group

-   `id`: unique identifier among all group entities,
-   `depth`: Merkle tree depth,
-   `zeroValue`: Merkle tree zero value,
-   `root`: Merkle tree root,
-   `size`: number of active members (or non-zero tree leaves),
-   `numberOfLeaves`: total number of tree leaves,
-   `admin`: admin of the group,
-   `members`: list of group members.

### Member

-   `id`: unique identifier among all member entities,
-   `identityCommitment`: Semaphore identity commitment,
-   `index`: index of the tree leaf,
-   `group`: link to the Group entity.
