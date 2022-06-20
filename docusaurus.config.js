module.exports = {
    title: "Semaphore",
    tagline: "Documentation and Guides",
    url: "https://semaphore.appliedzkp.org/",
    baseUrl: "/",
    favicon: "/img/favicon.ico",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    organizationName: "semaphore-protocol",
    projectName: "semaphore",
    trailingSlash: false,

    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
                    path: "docs",
                    routeBasePath: "docs/",
                    sidebarPath: require.resolve("./sidebars.js"),
                    editUrl: "https://github.com/semaphore-protocol/website/edit/main/",
                    includeCurrentVersion: false
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                    customCss2: require.resolve("./src/css/colors.css")
                }
            }
        ]
    ],

    themeConfig: {
        announcementBar: {
            id: "trusted-setup",
            content:
                '<b>The Semaphore V2 <a target="_blank" rel="noopener noreferrer" href="https://storage.googleapis.com/trustedsetup-a86f4.appspot.com/semaphore/semaphore_top_index.html">trusted-setup ceremony</a> ended successfully with more than 300 contributors! 🎉</b>',
            backgroundColor: "#DAE0FF",
            textColor: "#000000"
        },
        prism: {
            additionalLanguages: ["solidity"]
        },
        navbar: {
            logo: {
                alt: "Semaphore Logo",
                src: "img/semaphore-logo.svg"
            },
            items: [
                {
                    type: "docsVersionDropdown",
                    position: "left",
                    dropdownActiveClassDisabled: true,
                    docsPluginId: "default",
                    className: "docs_active"
                },
                {
                    label: "Whitepaper",
                    to: "https://semaphore.appliedzkp.org/whitepaper-v1.pdf",
                    position: "right",
                    className: "V1_active"
                },
                {
                    label: "Documentation",
                    href: "/docs/introduction",
                    position: "right",
                    className: "persistent"
                },
                {
                    label: "GitHub",
                    href: "https://github.com/semaphore-protocol",
                    position: "right",
                    className: "persistent"
                }
            ]
        },
        footer: {
            links: [
                {
                    title: "PSE Team",
                    items: [
                        {
                            label: "Github",
                            href: "https://github.com/appliedzkp"
                        },
                        {
                            label: "Medium",
                            href: "https://medium.com/privacy-scaling-explorations"
                        },
                        {
                            label: "Twitter",
                            href: "https://twitter.com/PrivacyScaling"
                        }
                    ]
                },
                {
                    title: "Community",
                    items: [
                        {
                            label: "Github",
                            href: "https://github.com/semaphore-protocol"
                        },
                        {
                            label: "Telegram",
                            href: "https://t.me/joinchat/B-PQx1U3GtAh--Z4Fwo56A"
                        }
                    ]
                },
                {
                    title: "More",
                    items: [
                        {
                            label: "Unirep",
                            href: "https://github.com/Unirep"
                        },
                        {
                            label: "Interep",
                            href: "https://github.com/interep-project"
                        },
                        {
                            label: "ZK-kit",
                            href: "https://github.com/privacy-scaling-explorations/zk-kit"
                        }
                    ]
                }
            ]
        },
        colorMode: {
            defaultMode: "dark",
            // Should we use the prefers-color-scheme media-query,
            // using user system preferences, instead of the hardcoded defaultMode
            respectPrefersColorScheme: true,
            // Dark/light switch icon options
            switchConfig: {
                // Icon for the switch while in dark mode
                darkIcon: "\u{263D}",
                // Unicode icons such as '\u2600' will work
                // Unicode with 5 chars require brackets: '\u{1F602}'
                lightIcon: "\u{263C}"
            }
        }
    }
}
