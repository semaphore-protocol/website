import React from "react"
import OriginalNavBarItem from "@theme-original/NavbarItem"
import { useLocation } from "@docusaurus/router"

export default function NavbarItem(props) {
    const { pathname } = useLocation()
    const [, docs, version] = pathname.split("/")

    let className = props.className

    if (version === "V1") {
        className += " V1"
    } else {
        className += " V2"
    }

    if (docs === "docs") {
        className += " docs"
    }

    return (
        <>
            <OriginalNavBarItem {...props} className={className} />
        </>
    )
}
