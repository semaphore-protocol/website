---
sidebar_position: 1
---

# Groups

- What is a group
- What do groups contain
  - Identities
  - Root

- What are they used for
- Create a group
- Use a group
- Add identities
- Remove identities


Semaphore **groups** contain [identity commitments]() of group members.
Groups are [Merkle trees]() and identity commitments are tree leaves.

Groups can be on-chain or off-chain.

- Create an on-chain group
- Create an off-chain group

## Create an on-chain group

To create an on-chain group, use the SemaphoreGroups contract.

## Create an off-chain group

## Private voting example

Consider a decentralized application (DApp) where community members rate an event they attend.
- Organizers create events (groups).
- Attendees join events and then provide an anonymous rating (signal).

The organizer has deployed a smart contract for the event to Ethereum.
An organizer then passes an event ID to a contract function to create the group.
The contract and its Ethereum address act as _group admin_. <!-- Need explanation -->

To join the group and rate the event anonymously, an attendee uses the DApp to create a secret identity and then add the identity commitment to the group.

```ts
/** Example contract **/
```

## Private whistleblowing example