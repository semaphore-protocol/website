import Link from "@docusaurus/Link"
import styled from "@emotion/styled"
import React from "react"
import IconArrowTopRight from "../icons/IconArrowTopRight"

export type OutlineLinkButtonProps = {
    href: string
    children: string
}

const Button = styled.div`
    display: flex;
    justify-content: space-between;

    border: 2px solid #758bff;
    padding: 4px 12px;
    border-radius: 4px;

    div.button-icon {
        padding-right: 8px;
    }
`

export default function OutlineLinkButton({ href, children }: OutlineLinkButtonProps): JSX.Element {
    return (
        <Link href={href} target="_blank">
            <Button>
                <div className="button-text">{children}</div>
                <div className="button-icon">
                    <IconArrowTopRight />
                </div>
            </Button>
        </Link>
    )
}
