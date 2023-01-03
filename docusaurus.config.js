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

    plugins: ["docusaurus-plugin-sass"],

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
                    customCss: require.resolve("./src/css/custom.scss"),
                    customCss2: require.resolve("./src/css/colors.scss")
                }
            }
        ]
    ],

    themeConfig: {
        announcementBar: {
            id: "semaphore-v3",
            content:
                '<b>We are pleased to announce the release of <a target="_blank" rel="noopener noreferrer" href="https://github.com/semaphore-protocol/semaphore/releases/tag/v3.0.0">Semaphore V3</a> 🎉</b>',
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
                    label: "Github",
                    href: "https://github.com/semaphore-protocol",
                    position: "right",
                    className: "persistent"
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
