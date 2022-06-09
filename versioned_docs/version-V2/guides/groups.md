---
sidebar_position: 2
---

# Groups

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

Semaphore [groups](/docs/glossary/#semaphore-group) contain [identity commitments](/docs/glossary/#identity-commitment) of group members.
Example uses of groups include the following:

-   Poll question that attendees join to rate an event.
-   Ballot that members join to vote on a proposal.
-   Whistleblowers who are verified employees of an organization.

A group can be on-chain or off-chain.

-   [Create an on-chain group](#create-an-on-chain-group)

## Create an on-chain group

The `SemaphoreGroups` contract provides the following `_createGroup` function:

```ts
    /// @dev Creates a new group by initializing the associated tree.
    /// @param groupId: Id of the group.
    /// @param depth: Depth of the tree.
    /// @param zeroValue: Zero value of the tree.
    function _createGroup(
        uint256 groupId,
        uint8 depth,
        uint256 zeroValue
    ) internal virtual {
        require(groupId < SNARK_SCALAR_FIELD, "SemaphoreGroups: group id must be < SNARK_SCALAR_FIELD");
        require(getDepth(groupId) == 0, "SemaphoreGroups: group already exists");

        groups[groupId].init(depth, zeroValue);

        emit GroupCreated(groupId, depth, zeroValue);
    }
```

To create an on-chain group, in your contract, import `SemaphoreGroups` and call `_createGroup`.
The following code sample shows how the `Semaphore.sol` contract uses `_createGroup`:

```ts
pragma solidity ^0.8.4;

import "./interfaces/ISemaphore.sol";
import "./base/SemaphoreCore.sol";
import "./base/SemaphoreGroups.sol";

...

/// @title Semaphore
contract Semaphore is ISemaphore, SemaphoreCore, SemaphoreGroups {
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
}

...

```

## Related

To learn more about groups, see the [`SemaphoreGroups` contract](https://github.com/semaphore-protocol/semaphore/blob/main/contracts/base/SemaphoreGroups.sol).
