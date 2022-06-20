import Link from "@docusaurus/Link"
import styled from "@emotion/styled"
import React from "react"
import IconArrowRight from "../icons/IconArrowRight"

export type LinkButtonProps = {
    href: string
    children: string
}

const Button = styled.div`
    display: flex;

    div.button-text {
        padding-right: 10px;
    }

    div.button-icon {
        padding-top: 1px;
    }
`

export default function LinkButton({ href, children }: LinkButtonProps): JSX.Element {
    return (
        <Link href={href} target="_blank">
            <Button>
                <div className="button-text">{children}</div>
                <div className="button-icon">
                    <IconArrowRight />
                </div>
            </Button>
        </Link>
    )
}
