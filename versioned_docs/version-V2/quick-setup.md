---
sidebar_position: 2
---

# Quick setup

Set up a new Hardhat project with Semaphore.
Learn how to create and test an Ethereum smart contract that uses zero-knowledge
proofs to verify membership.

To check out the code used in this guide, visit the
[quick-setup](https://github.com/semaphore-protocol/quick-setup) repository.

1. [**Create a Node.js project**](#create-a-nodejs-project)
2. [**Install Hardhat**](#install-hardhat)
3. [**Install Semaphore contracts and JS libraries**](#install-semaphore-contracts-and-js-libraries)
4. [**Create the Semaphore contract**](#create-the-semaphore-contract)
5. [**Create Semaphore IDs**](#create-semaphore-ids)
6. [**Create a Hardhat task that deploys your contract**](#create-a-hardhat-task-that-deploys-your-contract)
7. [**Deploy your contract to a local network**](#deploy-your-contract-to-a-local-network)

## Create a Node.js project

1. Follow the [Node.js _LTS version_](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
   instructions to install `node` (Hardhat may not work with Node.js _Current_).

2. Follow the [Yarn](https://yarnpkg.com/getting-started/install) instructions
   to download and install the `yarn` package manager.

3. Create a directory for the project and change to the new directory.

    ```bash
    mkdir semaphore-example
    cd semaphore-example
    ```

4. In your terminal, run `yarn init` to initialize the Node.js project.

## Install Hardhat

[Hardhat](https://hardhat.org/) is a development environment you can use to
compile, deploy, test, and debug Ethereum software.
Hardhat includes the Hardhat Network, a local Ethereum network for development.

1. Use `yarn` to install [Hardhat](https://hardhat.org/getting-started/):

    ```bash
    yarn add hardhat --dev
    ```

2. Use `yarn` to run `hardhat` and create a _basic sample project_:

    ```bash
    yarn hardhat
    # At the prompt, select "Create a basic sample project"
    # and then enter through the prompts.
    ```

## Install Semaphore contracts and JS libraries

Semaphore provides contracts and JavaScript libraries for developers building zero-knowledge applications.

- `@semaphore-protocol/contracts` provides a _base contract_ that verifies Semaphore proofs on-chain.
- JavaScript libraries help developers build zero-knowledge applications.

To install these dependencies for your project, do the following:

1. Use `yarn` to install `@semaphore-protocol/contracts`:

    ```bash
    yarn add @semaphore-protocol/contracts
    ```

    For more detail about _Semaphore base contracts_, see [Contracts](https://semaphore.appliedzkp.org/docs/technical-reference/contracts).
    To view the source, see [Contracts in the Semaphore repository](https://github.com/semaphore-protocol/semaphore/tree/main/contracts).

2. Use `yarn` to install the Semaphore JavaScript libraries:

    ```bash
    yarn add @semaphore-protocol/identity @semaphore-protocol/group @semaphore-protocol/proof --dev
    ```

    For more information about the JS libraries, see the [semaphore.js](https://github.com/semaphore-protocol/semaphore.js) repository.

## Create the Semaphore contract

Create a `Greeters` contract that imports and extends the Semaphore base contract:

1. In `./contracts`, rename `Greeter.sol` to `Greeters.sol`.
2. Replace the contents of `Greeters.sol` with the following:

    ```solidity title="./semaphore-example/contracts/Greeters.sol"
    //SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    import "@semaphore-protocol/contracts/interfaces/IVerifier.sol";
    import "@semaphore-protocol/contracts/base/SemaphoreCore.sol";

    /// @title Greeters contract.
    /// @dev The following code is just a example to show how Semaphore con be used.
    contract Greeters is SemaphoreCore {
        // A new greeting is published every time a user's proof is validated.
        event NewGreeting(bytes32 greeting);

        // Greeters are identified by a Merkle root.
        // The off-chain Merkle tree contains the greeters' identity commitments.
        uint256 public greeters;

        // The external verifier used to verify Semaphore proofs.
        IVerifier public verifier;

        constructor(uint256 _greeters, address _verifier) {
            greeters = _greeters;
            verifier = IVerifier(_verifier);
        }

        // Only users who create valid proofs can greet.
        // The external nullifier is in this example the root of the Merkle tree.
        function greet(
            bytes32 _greeting,
            uint256 _nullifierHash,
            uint256[8] calldata _proof
        ) external {
            _verifyProof(_greeting, greeters, _nullifierHash, greeters, _proof, verifier);

            // Prevent double-greeting (nullifierHash = hash(root + identityNullifier)).
            // Every user can greet once.
            _saveNullifierHash(_nullifierHash);

            emit NewGreeting(_greeting);
        }
    }

    ```

## Create Semaphore IDs

Semaphore IDs - also known as _identity commitments_ - represent user identities.

Create a `./static` folder and add a `./static/identityCommitments.json` file that
contains the following array of IDs:

```json title="./static/identityCommitments.json"
[
    "9426253249246138013650573474062059446203468399013007463704855436559640562175",
    "6200634377081441056179822649025268043304989981899916286941956069781421654881",
    "19706772421195815860043593475869058320994241404138740034486179990871964981523"
]
```

:::info
To generate the IDs for this example, we used `@semaphore-protocol/identity`.
We used Metamask to sign messages with the first 3 Ethereum accounts
of the [Hardhat dev wallet](https://hardhat.org/hardhat-network/reference/#accounts), and then we used those messages to generate Semaphore [deterministic identities](/docs/guides/identities#generating-deterministic-identities).

In the Semaphore protocol, a [group](/docs/guides/groups/) is an [incremental Merkle tree](/docs/glossary/#incremental-merkle-tree).
Semaphore IDs are tree leaves.
:::

## Create a Hardhat task that deploys your contract

Hardhat lets you write [tasks](https://hardhat.org/guides/create-task.html#creating-a-task)
that automate building and deploying smart contracts and dApps.
To create a task that deploys the `Greeters` contract, do the following:

1. Use `yarn` to install `hardhat-dependency-compiler`:

    ```bash
    yarn add hardhat-dependency-compiler --dev
    ```

    [`hardhat-dependency-compiler`](https://github.com/ItsNickBarry/hardhat-dependency-compiler)
    compiles Solidity contracts and dependencies.

2. Create a `tasks` folder and add a `./tasks/deploy.js` file that contains the following:

    ```javascript title="./tasks/deploy.js"
    const { Group } = require("@semaphore-protocol/group")
    const identityCommitments = require("../static/identityCommitments.json")
    const { task, types } = require("hardhat/config")

   /**
    *  The `task.setAction` function exposes the `ethers` Javascript library for interacting with Ethereum.
    */
    task("deploy", "Deploy a Greeters contract")
        .addOptionalParam("logs", "Print the logs", true, types.boolean)
        .setAction(async ({ logs }, { ethers }) => {
            const VerifierContract = await ethers.getContractFactory("Verifier20")
            const verifier = await VerifierContract.deploy()

            await verifier.deployed()

            logs && console.log(`Verifier contract has been deployed to: ${verifier.address}`)

            const GreetersContract = await ethers.getContractFactory("Greeters")

            const group = new Group()

            group.addMembers(identityCommitments)

            const greeters = await GreetersContract.deploy(group.root, verifier.address)

            await greeters.deployed()

            logs && console.log(`Greeters contract has been deployed to: ${greeters.address}`)

            return greeters
        })
    ```

3. In your `hardhat.config.js` file, add the following:

    ```javascript title="./hardhat.config.js"
    require("@nomiclabs/hardhat-waffle")
    require("hardhat-dependency-compiler")

    /** Import your deploy task */
    require("./tasks/deploy")

    module.exports = {
        solidity: "0.8.4",
        dependencyCompiler: {
            /** Allows Hardhat to compile the external Verifier.sol contract. */
            paths: ["@semaphore-protocol/contracts/verifiers/Verifier20.sol"]
        }
    }
    ```

## Test your smart contract

[`hardhat-waffle`](https://hardhat.org/plugins/nomiclabs-hardhat-waffle.html)
lets you write tests with the [Waffle](https://getwaffle.io/) test framework
and [Chai assertions](https://www.chaijs.com/).

1. Use `yarn` to install the `hardhat-waffle` plugin and dependencies for smart
   contract tests:

    ```bash
    yarn add -D @nomiclabs/hardhat-waffle 'ethereum-waffle@^3.0.0' \
       @nomiclabs/hardhat-ethers 'ethers@^5.0.0' chai
    ```

1. Download the Semaphore [zk trusted setup files](http://www.trusted-setup-pse.org/)
   and copy them to the `./static` folder.

    ```bash
    cd static
    wget http://www.trusted-setup-pse.org/semaphore/20/semaphore.zkey
    wget http://www.trusted-setup-pse.org/semaphore/20/semaphore.wasm
    ```

   Learn more about [trusted setup files](/docs/glossary/#trusted-setup-files).

1. Replace the contents of `./test/sample-test.js` with the following test:

    ```javascript title="./test/sample-test.js"
    const { Identity } = require("@semaphore-protocol/identity")
    const { Group } = require("@semaphore-protocol/group")
    const { generateProof, packToSolidityProof } = require("@semaphore-protocol/proof")
    const identityCommitments = require("../static/identityCommitments.json")
    const { expect } = require("chai")

    /* Import  the Ethers.js JavaScript library for interacting with Ethereum. */
    const { run, ethers } = require("hardhat")

    describe("Greeters", function () {
        let contract
        let signers

        before(async () => {
            contract = await run("deploy", { logs: false })

          /** 
           * In Ethers.js, a Signer object represents an Ethereum Account
           * that you can use to sign messages and transactions, and then send 
           * signed transactions to the Ethereum Network to execute 
           * state-changing operations.
           */
            signers = await ethers.getSigners()
        })

        describe("# greet", () => {
            /** Use the trusted setup files. **/
            const wasmFilePath = "./static/semaphore.wasm"
            const zkeyFilePath = "./static/semaphore.zkey"

            it("Should greet", async () => {
                const greeting = "Hello world"
                const bytes32Greeting = ethers.utils.formatBytes32String(greeting)

                /**
                 * In Ethers.js, Signer.signMessage returns a Promise which resolves to the Raw Signature of a message.
                 * The following code gets the first (Signer) account and assigns the signature Promise to the message variable.
                 */
                const message = await signers[0].signMessage("Sign this message to create your identity!")
                const identity = new Identity(message)

                const group = new Group()

                group.addMembers(identityCommitments)

                const fullProof = await generateProof(identity, group, group.root, greeting, {
                    wasmFilePath,
                    zkeyFilePath
                })
                const solidityProof = packToSolidityProof(fullProof.proof)

                const transaction = contract.greet(
                    bytes32Greeting,
                    fullProof.publicSignals.nullifierHash,
                    solidityProof
                )

                await expect(transaction).to.emit(contract, "NewGreeting").withArgs(bytes32Greeting)
            })
        })
    })
    ```

1. Run the following `yarn` commands to compile and test your contract:

    ```bash
    yarn hardhat compile
    yarn hardhat test
    ```

## Deploy your contract to a local network

To deploy your contract in a local Hardhat network (and use it in your dApp), run the following `yarn` commands:

```bash
yarn hardhat node
yarn hardhat deploy --network localhost # In another tab.
```

For a more complete demo that provides a starting point for your dApp,
see [semaphore-boilerplate](https://github.com/semaphore-protocol/boilerplate/).
