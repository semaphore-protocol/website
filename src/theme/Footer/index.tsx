import Link from "@docusaurus/Link"
import Logo from "@theme/Logo"
import clsx from "clsx"
import React from "react"
import styles from "./styles.module.scss"

function Footer() {
    return (
        <footer className={clsx("footer")}>
            <div className={clsx("container container-fluid", styles.container)}>
                <div>
                    <div>
                        <h3>About</h3>
                        <p>
                            Semaphore is part of Privacy & Scaling Explorations (PSE), a multidisciplinary team
                            supported by the Ethereum Foundation. PSE explores new use cases for zero knowledge proofs
                            and other cryptographic primitives.
                        </p>
                        <Link href="https://appliedzkp.org" target="_blank">
                            appliedzkp.org
                        </Link>
                    </div>
                    <div>
                        <div>
                            <h3>Used by</h3>
                            <Link href="https://github.com/Unirep" target="_blank">
                                Unirep
                            </Link>
                            <Link href="https://interep.link/" target="_blank">
                                Interep
                            </Link>
                        </div>
                        <div>
                            <h3>Learn</h3>
                            <Link href="https://github.com/semaphore-protocol" target="_blank">
                                Github
                            </Link>
                            <Link href="/docs/introduction" target="_blank">
                                Docs
                            </Link>
                        </div>
                        <div>
                            <h3>Connect</h3>
                            <Link href="https://t.me/joinchat/B-PQx1U3GtAh--Z4Fwo56A" target="_blank">
                                Telegram
                            </Link>
                        </div>
                    </div>
                </div>

                <hr />

                <div>
                    <p>Copyright © 2022 Ethereum Foundation</p>

                    <Logo
                        style={{ marginRight: -8 }}
                        className="navbar__brand"
                        imageClassName="navbar__logo"
                        titleClassName="navbar__title text--truncate"
                    />
                </div>
            </div>
        </footer>
    )
}

export default React.memo(Footer)
