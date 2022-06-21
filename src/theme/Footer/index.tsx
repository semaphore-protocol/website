import Link from "@docusaurus/Link"
import IconGithub from "@site/src/components/icons/IconGithub"
import IconTelegram from "@site/src/components/icons/IconTelegram"
import Logo from "@theme/Logo"
import clsx from "clsx"
import React from "react"

import styles from "./styles.module.scss"

function Footer() {
    return (
        <footer className={clsx("footer")}>
            <div className={styles.container}>
                <div>
                    <div>
                        <Logo
                            className="navbar__brand"
                            imageClassName="navbar__logo"
                            titleClassName="navbar__title text--truncate"
                        />
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
                        <p>Projects using Semaphore</p>
                        <Link href="https://github.com/Unirep/Unirep-Social" target="_blank">
                            UniRep Social
                        </Link>
                        <Link href="https://interep.link/" target="_blank">
                            Interep
                        </Link>
                    </div>
                </div>

                <hr />

                <div>
                    <p>Copyright © 2022 Ethereum Foundation</p>
                    <div>
                        <Link href="https://github.com/semaphore-protocol" target="_blank">
                            <IconGithub />
                        </Link>
                        <Link href="https://t.me/joinchat/B-PQx1U3GtAh--Z4Fwo56A" target="_blank">
                            <IconTelegram />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default React.memo(Footer)
