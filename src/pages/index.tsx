import styled from "@emotion/styled"
import CodeBlock from "@theme/CodeBlock"
import Layout from "@theme/Layout"
import React from "react"
import LinkButton from "../components/buttons/LinkButton"
import OutlineLinkButton from "../components/buttons/OutlineLinkButton"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1280px;
    margin: 0 auto;
    margin-bottom: 4rem;
    h1 {
        font-size: 46px;
    }
    h2 {
        font-size: 36px;
    }
    p {
        font-size: 20px;
    }
    a {
        font-size: 20px;
        color: #758bff;
        font-weight: bold;
        text-decoration: none;
    }
`

const Jumbotron = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 100px 0;

    > div,
    img {
        margin: 0 20px;
    }

    > div {
        max-width: 600px;
    }

    img {
        max-width: 500px;
    }

    .links {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        > a {
            font-size: 22px;
            margin-bottom: 10px;
        }
    }
`

const Components = styled.div`
    display: flex;
    flex-direction: column;
    margin: 50px 20px 80px 20px;

    > p {
        text-align: center;
        font-weight: bold;
        margin-bottom: 60px;
    }

    > div {
        display: flex;
        justify-content: space-between;

        > a {
            flex: 1;
            margin: 0 16px;

            :first-child {
                margin-left: 0;
            }

            :last-child {
                margin-right: 0;
            }
        }
    }
`

const Section = styled.div`
    display: flex;
    flex-direction: column;
    margin: 100px 0;

    > div:first-child {
        display: flex;

        > div {
            flex: 1;
            margin: 0 20px;
        }
    }
    > div:nth-child(2) {
        margin-top: 80px;
        display: flex;
        justify-content: space-between;

        > div {
            margin: 0 20px;

            > img {
                margin-bottom: 10px;
            }
        }

        h3 {
            font-weight: bold;
        }

        p {
            font-size: 16px;
        }
    }
`

const Divider = styled.div`
    width: 100%;
    height: 3px;
    margin-top: 60px;
    background-color: #dae0ff;
`

export default function Home() {
    return (
        <Layout title={`Semaphore Docs`} description="Technical Documentation For The Semaphore Protocol.">
            <Container>
                <Jumbotron>
                    <div>
                        <h1>Signal anonymously</h1>

                        <p>
                            Using zero knowledge, Semaphore allows Ethereum users to prove their membership of a group
                            and send signals such as votes or endorsements without revealing their original identity.
                        </p>

                        <div className="links">
                            <LinkButton href="https://semaphore.appliedzkp.org/docs/quick-setup">
                                Quick setup
                            </LinkButton>

                            <LinkButton href="https://github.com/semaphore-protocol/boilerplate">
                                Boilerplate
                            </LinkButton>
                        </div>
                    </div>
                    <img src="./img/illustration1.svg" />
                </Jumbotron>

                <Components>
                    <p>Building an Ethereum dApp? Semaphore components make it simple to add a privacy layer!</p>
                    <div>
                        <OutlineLinkButton href="https://github.com/semaphore-protocol/semaphore/tree/main/contracts">
                            Solidity smart contract
                        </OutlineLinkButton>
                        <OutlineLinkButton href="https://github.com/semaphore-protocol/semaphore/tree/main/circuits">
                            zkSNARK circuits
                        </OutlineLinkButton>
                        <OutlineLinkButton href="https://github.com/semaphore-protocol/semaphore.js">
                            JavaScript libraries
                        </OutlineLinkButton>
                    </div>
                </Components>

                <Section>
                    <div>
                        <div>
                            <h2>Semaphore identities</h2>

                            <p>
                                Given to all Semaphore group members, it is comprised of three parts: identity
                                commitment, trapdoor, and nullifier.
                            </p>

                            <LinkButton href="/docs/guides/identities">Create Semaphore identities</LinkButton>
                        </div>
                        <div>
                            <CodeBlock language="ts">
                                {`import { Identity } from "@semaphore-protocol/identity"

const identity = new Identity()

const trapdoor = identity.getTrapdoor()
const nullifier = identity.getNullifier()
const commitment = identity.generateCommitment()`}
                            </CodeBlock>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src="./img/icons/eye-close.svg" />
                            <h3>Private values</h3>
                            <p>
                                Trapdoor and nullifier values are the private values of the Semaphore identity. To avoid
                                fraud, the owner must keep both values secret.
                            </p>
                        </div>
                        <div>
                            <img src="./img/icons/eye.svg" />
                            <h3>Public values</h3>
                            <p>
                                Semaphore uses the Poseidon hash function to create the identity commitment from the
                                identity private values. Identity commitments can be made public, similarly to Ethereum
                                addresses.
                            </p>
                        </div>
                        <div>
                            <img src="./img/icons/profile.svg" />
                            <h3>Generate identities</h3>
                            <p>
                                Semaphore identities can be generated deterministically or randomly. Deterministic
                                identities can be generated from the hash of a secret message.
                            </p>
                        </div>
                    </div>
                </Section>

                <Divider />

                <Section>
                    <div>
                        <div>
                            <h2>Semaphore groups</h2>

                            <p>
                                Semaphore groups are binary incremental Merkle trees that store the public identity
                                commitment of each member.
                            </p>

                            <LinkButton href="/docs/guides/groups">Curate Semaphore groups</LinkButton>
                        </div>
                        <div>
                            <CodeBlock language="ts">
                                {`import { Group } from "@semaphore-protocol/group"

const group = new Group()

group.addMember(commitment)`}
                            </CodeBlock>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src="./img/icons/links.svg" />
                            <h3>Merkle trees</h3>
                            <p>
                                Each leaf contains an identity commitment for a user. The identity commitment proves
                                that the user is a group member without revealing the private identity of the user.
                            </p>
                        </div>
                        <div>
                            <img src="./img/icons/group.svg" />
                            <h3>Types of groups</h3>
                            <p>
                                Groups can be created and managed in a decentralized fashion with Semaphore contracts or
                                off-chain with our JavaScript libraries.
                            </p>
                        </div>
                        <div>
                            <img src="./img/icons/union.svg" />
                            <h3>Group management</h3>
                            <p>
                                Users can join and leave groups by themselves, or an admin can add and remove them.
                                Admins can be centralized authorities, Ethereum accounts, multi-sig wallets or smart
                                contracts.
                            </p>
                        </div>
                    </div>
                </Section>

                <Divider />

                <Section>
                    <div>
                        <div>
                            <h2>Semaphore proofs</h2>

                            <p>
                                Semaphore group members can anonymously prove that they are part of a group and that
                                they are generating their own proofs and signals.
                            </p>

                            <LinkButton href="/docs/guides/proofs">Generate Semaphore proofs</LinkButton>
                        </div>
                        <div>
                            <CodeBlock language="ts">
                                {`import { generateProof, verifyProof } from "@semaphore-protocol/proof"

const externalNullifier = BigInt(1)
const signal = "Hello world"

const fullProof = await generateProof(identity, group, externalNullifier, signal, {
    zkeyFilePath: "./semaphore.zkey",
    wasmFilePath: "./semaphore.wasm"
})

const verificationKey = JSON.parse(fs.readFileSync("./semaphore.json", "utf-8"))

await verifyProof(verificationKey, fullProof)`}
                            </CodeBlock>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src="./img/icons/awards.svg" />
                            <h3>Membership</h3>
                            <p>Only users who are part of a group can generate a valid proof for that group.</p>
                        </div>
                        <div>
                            <img src="./img/icons/flag.svg" />
                            <h3>Signals</h3>
                            <p>
                                Group users can anonymously broadcast signals such as votes or endorsements without
                                revealing their original identity.
                            </p>
                        </div>
                        <div>
                            <img src="./img/icons/check.svg" />
                            <h3>Verifiers</h3>
                            <p>
                                Semaphore proofs can be verified with Semaphore contracts or off-chain with our
                                JavaScript libraries.
                            </p>
                        </div>
                    </div>
                </Section>
            </Container>
        </Layout>
    )
}
