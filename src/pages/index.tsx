import CodeBlock from "@theme/CodeBlock"
import Layout from "@theme/Layout"
import React from "react"
import IconAwards from "../components/icons/IconAwards"
import IconCheck from "../components/icons/IconCheck"
import IconConnections from "../components/icons/IconConnections"
import IconEye from "../components/icons/IconEye"
import IconEyeClose from "../components/icons/IconEyeClose"
import IconFlag from "../components/icons/IconFlag"
import IconGroup from "../components/icons/IconGroup"
import IconProfile from "../components/icons/IconProfile"
import IconUnion from "../components/icons/IconUnion"
import IllustrationHero from "../components/IllustrationHero"
import LinkButton from "../components/LinkButton"
import OutlineLinkButton from "../components/OutlineLinkButton"
import styles from "./styles.module.scss"

export default function Home() {
    return (
        <Layout
            title={`Semaphore Protocol`}
            description="A zero-knowledge protocol for anonymous signalling on Ethereum."
        >
            <div className={styles.container}>
                <div className={styles.jumbotron}>
                    <div>
                        <h1>Signal anonymously</h1>

                        <p>
                            Using zero knowledge, Semaphore allows Ethereum users to prove their membership of a group
                            and send signals such as votes or endorsements without revealing their original identity.
                        </p>

                        <div>
                            <LinkButton href="./docs/quick-setup">Quick setup</LinkButton>

                            <LinkButton href="https://github.com/semaphore-protocol/boilerplate">
                                Boilerplate
                            </LinkButton>
                        </div>
                    </div>

                    <IllustrationHero />
                </div>

                <div className={styles.components}>
                    <h3>Building an Ethereum dApp? Semaphore components make it simple to add a privacy layer!</h3>
                    <div>
                        <OutlineLinkButton href="https://github.com/semaphore-protocol/semaphore/tree/main/packages/contracts">
                            Solidity contract
                        </OutlineLinkButton>
                        <OutlineLinkButton href="https://github.com/semaphore-protocol/semaphore/tree/main/packages/circuits">
                            zkSNARK circuits
                        </OutlineLinkButton>
                        <OutlineLinkButton href="https://github.com/semaphore-protocol/semaphore#-packages">
                            JavaScript libraries
                        </OutlineLinkButton>
                    </div>
                </div>

                <div className={styles.section}>
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

const { trapdoor, nullifier, commitment } = new Identity()`}
                            </CodeBlock>
                        </div>
                    </div>
                    <div>
                        <div>
                            <IconEyeClose />
                            <h3>Private values</h3>
                            <p>
                                Trapdoor and nullifier values are the private values of the Semaphore identity. To avoid
                                fraud, the owner must keep both values secret.
                            </p>
                        </div>
                        <div>
                            <IconEye />
                            <h3>Public values</h3>
                            <p>
                                Semaphore uses the Poseidon hash function to create the identity commitment from the
                                identity private values. Identity commitments can be made public, similarly to Ethereum
                                addresses.
                            </p>
                        </div>
                        <div>
                            <IconProfile />
                            <h3>Generate identities</h3>
                            <p>
                                Semaphore identities can be generated deterministically or randomly. Deterministic
                                identities can be generated from the hash of a secret message.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.divider} />

                <div className={styles.section}>
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
                            <IconConnections />
                            <h3>Merkle trees</h3>
                            <p>
                                Each leaf contains an identity commitment for a user. The identity commitment proves
                                that the user is a group member without revealing the private identity of the user.
                            </p>
                        </div>
                        <div>
                            <IconGroup />
                            <h3>Types of groups</h3>
                            <p>
                                Groups can be created and managed in a decentralized fashion with Semaphore contracts or
                                off-chain with our JavaScript libraries.
                            </p>
                        </div>
                        <div>
                            <IconUnion />
                            <h3>Group management</h3>
                            <p>
                                Users can join and leave groups by themselves, or an admin can add and remove them.
                                Admins can be centralized authorities, Ethereum accounts, multi-sig wallets or smart
                                contracts.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.divider} />

                <div className={styles.section}>
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
import { formatBytes32String } from "@ethersproject/strings"

const externalNullifier = 1
const signal = formatBytes32String("Hello world")

const fullProof = await generateProof(identity, group, externalNullifier, signal, {
    zkeyFilePath: "./semaphore.zkey",
    wasmFilePath: "./semaphore.wasm"
})

await verifyProof(fullProof, group.depth)`}
                            </CodeBlock>
                        </div>
                    </div>
                    <div>
                        <div>
                            <IconAwards />
                            <h3>Membership</h3>
                            <p>Only users who are part of a group can generate a valid proof for that group.</p>
                        </div>
                        <div>
                            <IconFlag />
                            <h3>Signals</h3>
                            <p>
                                Group users can anonymously broadcast signals such as votes or endorsements without
                                revealing their original identity.
                            </p>
                        </div>
                        <div>
                            <IconCheck />
                            <h3>Verifiers</h3>
                            <p>
                                Semaphore proofs can be verified with Semaphore contracts on-chain or with our
                                JavaScript libraries off-chain.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
