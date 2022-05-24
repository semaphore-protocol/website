---
sidebar_position: 5
---

# Subgraph

The Graph is an indexing protocol for querying networks like Ethereum and IPFS. Our subgraph allow you to get data from the [`Semaphore.sol`](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/Semaphore.sol) smart contract.

:::tip
If you don't know GraphQL, you can try running some queries using the Graph Explorer and its [GraphQL playground](https://thegraph.com/hosted-service/subgraph/semaphore-protocol/kovan?selected=playground) (Kovan). You can find some examples [here](https://thegraph.com/docs/developer/graphql-api).
:::

## Endpoints

### Kovan

-   **Queries** (HTTP): https://api.thegraph.com/subgraphs/name/semaphore-protocol/kovan
-   **Subscriptions** (WS): wss://api.thegraph.com/subgraphs/name/semaphore-protocol/kovan

### Goerli

-   **Queries** (HTTP): https://api.thegraph.com/subgraphs/name/semaphore-protocol/goerli
-   **Subscriptions** (WS): wss://api.thegraph.com/subgraphs/name/semaphore-protocol/goerli

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
