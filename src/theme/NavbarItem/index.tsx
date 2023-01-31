import React from "react"
import OriginalNavBarItem from "@theme-original/NavbarItem"
import { useLocation } from "@docusaurus/router"

export default function NavbarItem(props) {
    const { pathname } = useLocation()
    const [, docs, version] = pathname.split("/")

    let className = props.className

    if (version === "V1") {
        className += " V1_active"
    } else if (version === "V2") {
        className += " V2_active"
    } else {
        className += " V3_active"
    }

    if (docs === "docs") {
        className += " docs_active"
    } else {
        className += " homepage_active"
    }

    return (
        <>
            <OriginalNavBarItem {...props} className={className} />
        </>
    )
}
