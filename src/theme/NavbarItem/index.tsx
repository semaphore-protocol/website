import { useLocation } from "@docusaurus/router"
import OriginalNavBarItem from "@theme-original/NavbarItem"
import React from "react"

export default function NavbarItem(props) {
    const { pathname } = useLocation()
    const [, docs, version] = pathname.split("/")

    let { className = "" } = props

    return (
        (!className ||
            !(
                (className.includes("V1") && version !== "V1") ||
                (className.includes("V2") && version !== "V2") ||
                (className.includes("V3") && version !== "V3") ||
                (className.includes("homepage") && docs === "docs")
            )) && <OriginalNavBarItem {...props} />
    )
}
