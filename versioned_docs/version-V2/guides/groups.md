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

Use Semaphore in your application or smart contract to create off-chain and on-chain groups.

A [Semaphore group](/docs/glossary/#semaphore-group) contains [identity commitments](/docs/glossary/#identity-commitment) of group members.
Example uses of groups include the following:

-   Poll question that attendees join to rate an event.
-   Ballot that members join to vote on a proposal.
-   Whistleblowers who are verified employees of an organization.

A Semaphore group is an [incremental Merkle tree](/docs/glossary/#incremental-merkle-tree), and group members (i.e., [identity commitments](/docs/glossary/#identity-commitments)) are tree leaves.
Semaphore groups set the following tree parameters:

-   **Tree depth**: the maximum number of members a group can contain (`max size = 2 ^ tree depth`).
-   **Zero value**: the value used to calculate the zero nodes of the incremental Merkle tree.

Learn how to work with groups.

-   [Off-chain groups](#off-chain-groups)
-   [On-chain groups](#on-chain-groups)

## Off-chain groups

-   [Create an off-chain group](#create-an-off-chain-group)
-   [Add members to an off-chain group](#add-members-to-an-off-chain-group)
-   [Remove members from an off-chain group](#remove-members-from-an-off-chain-group)

### Create an off-chain group

Use the [`@semaphore-protocol/group`](https://github.com/semaphore-protocol/semaphore/blob/main/packages/group) library `Group` class to create an off-chain group.

#### Options

-   **Tree depth**: (_default `20`_) the maximum number of members a group can contain (`max size = 2 ^ tree depth`).
-   **Zero value**: (_default `BigInt(0)`_) the value for a tree node that doesn't have a member assigned.

To create a group with default _`treeDepth`_ and _`zeroValue`_, call the `Group` constructor without parameters--for example:

```ts
import { Group } from "@semaphore-protocol/group"

// Default parameters: treeDepth = 20, zeroValue = BigInt(0).
const group = new Group()
```

The following example code passes _`treeDepth`_ to create a group for `2 ^ 30 = 1073741824` members:

```ts
import { Group } from "@semaphore-protocol/group"

const group = new Group(30)
```

The following example code creates a group with a _`zeroValue`_ of `BigInt(1)`:

```ts
import { Group } from "@semaphore-protocol/group"

const group = new Group(20, BigInt(1))
```

## Add members to an off-chain group

Use the `Group addMember` function to add a member (identity commitment) to a group--for example:

```ts
group.addMember(identityCommitment)
```

To add a batch of members to a group, pass an array to the `Group addMembers` function--for example:

```ts
group.addMembers([identityCommitment1, identityCommitment2])
```

## Remove members from an off-chain group

To remove members from a group, pass the member index to the `Group removeMember` function--for example:

```ts
group.removeMember(0)
```

:::caution
Removing a member from a group sets the node value to `zeroValue`.
Given that the node isn't removed, the length of the `group.members` array doesn't change.
:::

### On-chain groups

The [`SemaphoreGroups`](https://github.com/semaphore-protocol/semaphore/tree/main/packages/contracts/base/SemaphoreGroups.sol) contract uses a the [`IncrementalBinaryTree`](https://github.com/privacy-scaling-explorations/zk-kit/blob/main/packages/incremental-merkle-tree.sol/contracts/IncrementalBinaryTree.sol) library and provides methods to create groups and add/remove members.

To use on-chain groups, import [`SemaphoreGroups`](https://github.com/semaphore-protocol/semaphore/blob/main/packages/contracts/base/SemaphoreGroups.sol) and call its internal methods.
The following code sample shows how the [`Semaphore`](https://github.com/semaphore-protocol/semaphore/blob/main/packages/contracts/Semaphore.sol) contract uses `SemaphoreGroups`:

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
