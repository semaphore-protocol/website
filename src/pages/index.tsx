import Link from "@docusaurus/Link"
import CodeBlock from "@theme/CodeBlock"
import styled from "@emotion/styled"
import Layout from "@theme/Layout"
import React from "react"

export const semaphoreComponents = [
    {
        title: "semaphore-circuits",
        href: "https://github.com/semaphore-protocol/semaphore/tree/main/circuits"
    },
    {
        title: "semaphore-contracts",
        href: "https://github.com/semaphore-protocol/semaphore/tree/main/contracts"
    },
    {
        title: "semaphore.js",
        href: "https://github.com/semaphore-protocol/semaphore.js"
    }
]

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1280px;
    margin: 0 auto;
    margin-bottom: 4rem;
`

const Section = styled.div`
    display: flex;
    flex-direction: column;
    margin: 100px 0;
    h1,
    h2,
    h3 {
        font-weight: bold;
    }
    h1 {
        font-size: 42px;
    }
    h2 {
        font-size: 36px;
    }
    p {
        font-size: 18px;
    }
    a {
        color: #4865ff;
        font-weight: bold;
    }
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
    position: relative;
    background-color: #dae0ff;
    :after,
    :before {
        content: "";
        position: absolute;
        top: -8px;
        width: 18px;
        height: 18px;
        background-color: #dae0ff;
        border-radius: 50%;
    }
    :after {
        right: 0;
    }
    :before {
        left: 0;
    }
`

export default function Home() {
    return (
        <Layout title={`Semaphore Docs`} description="Technical Documentation For The Semaphore Protocol.">
            <Container>
                <Section>
                    <div>
                        <div>
                            <h1>Signal anonymously</h1>

                            <p>
                                Semaphore was designed to be a simple privacy layer for Ethereum DApps. Using zero
                                knowledge, Ethereum users can prove their membership of a group and send signals such as
                                votes or endorsements without revealing their original identity.
                            </p>

                            <Link style={{ textDecoration: "none" }} href="/docs/introduction" target="_blank">
                                Explore documentation &gt;
                            </Link>
                        </div>
                        <div
                            style={{
                                borderRadius: "4px",
                                backgroundColor: "#DAE0FF",
                                height: "200px"
                            }}
                        ></div>
                    </div>
                </Section>

                <Section>
                    <div>
                        <div>
                            <h2>Semaphore identities</h2>

                            <p>
                                Given to all Semaphore group members, it is comprised of three parts - identity
                                commitment, trapdoor, and nullifier.
                            </p>

                            <Link style={{ textDecoration: "none" }} href="/docs/guides/identities" target="_blank">
                                Create Semaphore identities &gt;
                            </Link>
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
                            <h3>Private values</h3>
                            <p>
                                Trapdoor and nullifier values are the private values of the Semaphore identity. To avoid
                                fraud, the owner must keep both values secret.
                            </p>
                        </div>
                        <div>
                            <h3>Public values</h3>
                            <p>
                                Semaphore uses the Poseidon hash function to create the identity commitment from the
                                identity private values. Identity commitments can be made public, similarly to Ethereum
                                addresses.
                            </p>
                        </div>
                        <div>
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

                            <Link style={{ textDecoration: "none" }} href="/docs/guides/groups" target="_blank">
                                Curate Semaphore groups &gt;
                            </Link>
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
                            <h3>Merkle trees</h3>
                            <p>
                                Each leaf contains an identity commitment for a user. The identity commitment proves
                                that the user is a group member without revealing the private identity of the user.
                            </p>
                        </div>
                        <div>
                            <h3>Types of groups</h3>
                            <p>
                                Groups can be created and managed in a decentralized fashion with Semaphore contracts or
                                off-chain with our JavaScript libraries.
                            </p>
                        </div>
                        <div>
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

                            <Link style={{ textDecoration: "none" }} href="/docs/guides/proofs" target="_blank">
                                Generate Semaphore proofs &gt;
                            </Link>
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
                            <h3>Membership</h3>
                            <p>Only users who are part of a group can generate a valid proof for that group.</p>
                        </div>
                        <div>
                            <h3>Signals</h3>
                            <p>
                                Group users can anonymously broadcast signals such as votes or endorsements without
                                revealing their original identity.
                            </p>
                        </div>
                        <div>
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
