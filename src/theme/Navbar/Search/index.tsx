import { useLocation } from "@docusaurus/router"
import SearchOriginal from "@theme-original/Navbar/Search"
import React from "react"

export default function Search(props) {
    const { pathname } = useLocation()
    const [, docs] = pathname.split("/")

    return docs === "docs" && <SearchOriginal {...props} />
}
