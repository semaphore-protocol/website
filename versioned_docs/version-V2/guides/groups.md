---
sidebar_position: 2
title: Groups
---

# Semaphore groups

<!--Working outline
- What is a group
- What do groups contain
  - Identities
  - Root

- What are they used for
- Create a group
- Use a group
- Add identities
- Remove identities
-->

[Semaphore groups](/docs/glossary/#semaphore-group) contain [identity commitments](/docs/glossary/#identity-commitment) of group members.
Example uses of groups include the following:

-   Poll question that attendees join to rate an event.
-   Ballot that members join to vote on a proposal.
-   Whistleblowers who are verified employees of an organization.

Semaphore groups are actually incremental Merkle trees, and the group members (i.e. identity commitments) are tree leaves. Semaphore implementations of groups thus also need two parameters:

-   **Tree depth**: determines the maximum number of members a group can contain (`max size = 2 ^ tree depth`).
-   **Zero value**: is used to calculate the zeroes nodes of the incremental Merkle tree.

## Create groups

Use the [`@semaphore-protocol/group`](https://github.com/semaphore-protocol/semaphore.js/blob/main/packages/group) library to create off-chain groups, or the [`SemaphoreGroups`](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/base/SemaphoreGroups.sol) contract to create on-chain groups.

-   [**Create off-chain groups**](#create-off-chain-groups)
-   [**Create on-chain groups**](#create-on-chain-groups)

### Create off-chain groups

You can create an instance of the `Group` class without passing any parameters, or you can specify the `treeDepth` and `zeroValue` values.

```ts
import { Group } from "@semaphore-protocol/group"

// Default parameters: treeDepth = 20, zeroValue = BigInt(0).
const group = new Group()
```

Members can be added one at a time or in batches.

```ts
group.addMember(identityCommitment)
// or
group.addMembers(identityCommitments)
```

Members can also be removed from a group. Simply pass the member index:

```ts
group.removeMember(0)
```

:::caution
When a member is removed actually its value is updated to be equal to `zeroValue`. The length of the `group.members` array will then be the same.
:::

### Create on-chain groups

The [`SemaphoreGroups`](https://github.com/semaphore-protocol/semaphore/tree/main/contracts/base/SemaphoreGroups.sol) contract uses a the [`IncrementalBinaryTree`](https://github.com/privacy-scaling-explorations/zk-kit/blob/main/packages/incremental-merkle-tree.sol/contracts/IncrementalBinaryTree.sol) library and provides methods to create groups and add/remove members.

To use on-chain groups, import [`SemaphoreGroups`](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/base/SemaphoreGroups.sol) and call its internal methods. The following code sample shows how the [`Semaphore`](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/Semaphore.sol) contract uses `SemaphoreGroups`:

```sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./interfaces/ISemaphore.sol";
import "./base/SemaphoreCore.sol";
import "./base/SemaphoreGroups.sol";

/// @title Semaphore
contract Semaphore is ISemaphore, SemaphoreCore, SemaphoreGroups {

    ...

    function createGroup(
        uint256 groupId,
        uint8 depth,
        uint256 zeroValue,
        address admin
    ) external override onlySupportedDepth(depth) {
        _createGroup(groupId, depth, zeroValue);

        groupAdmins[groupId] = admin;

        emit GroupAdminUpdated(groupId, address(0), admin);
    }

    function addMember(uint256 groupId, uint256 identityCommitment) external override onlyGroupAdmin(groupId) {
        _addMember(groupId, identityCommitment);
    }

    function removeMember(
        uint256 groupId,
        uint256 identityCommitment,
        uint256[] calldata proofSiblings,
        uint8[] calldata proofPathIndices
    ) external override onlyGroupAdmin(groupId) {
        _removeMember(groupId, identityCommitment, proofSiblings, proofPathIndices);
    }

    ...
}
```
