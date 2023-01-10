// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")

/** @type {import('@docusaurus/types').Config} */
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

    i18n: {
        defaultLocale: "en",
        locales: ["en", "es"]
    },

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: "docs/",
                    sidebarPath: require.resolve("./sidebars.js"),
                    editUrl: "https://github.com/semaphore-protocol/website/edit/main/",
                    includeCurrentVersion: false
                },
                theme: {
                    customCss: [require.resolve("./src/css/custom.scss")]
                }
            })
        ]
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            announcementBar: {
                id: "semaphore-v3",
                content:
                    '<b>We are pleased to announce the release of <a target="_blank" rel="noopener noreferrer" href="https://github.com/semaphore-protocol/semaphore/releases/tag/v3.0.0">Semaphore V3</a> 🎉</b>',
                backgroundColor: "#DAE0FF",
                textColor: "#000000"
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
                    },
                    {
                        type: "localeDropdown",
                        position: "right",
                        className: "persistent"
                    }
                ]
            },
            colorMode: {
                defaultMode: "dark",
                // Should we use the prefers-color-scheme media-query,
                // using user system preferences, instead of the hardcoded defaultMode
                respectPrefersColorScheme: true
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ["solidity"]
            }
        })
}
