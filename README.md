<p align="center">
    <h1 align="center">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://github.com/semaphore-protocol/website/blob/main/static/img/semaphore-icon-dark.svg">
            <source media="(prefers-color-scheme: light)" srcset="https://github.com/semaphore-protocol/website/blob/main/static/img/semaphore-icon.svg">
            <img width="40" alt="Semaphore icon." src="https://github.com/semaphore-protocol/website/blob/main/static/img/semaphore-icon.svg">
        </picture>
        Semaphore website
    </h1>
</p>

<p align="center">
    <a href="https://github.com/semaphore-protocol" target="_blank">
        <img src="https://img.shields.io/badge/project-Semaphore-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/semaphore-protocol/website/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/semaphore-protocol/website.svg?style=flat-square">
    </a>
    <a href="https://github.com/semaphore-protocol/website/actions?query=workflow%3deploy">
        <img alt="GitHub Workflow test" src="https://img.shields.io/github/actions/workflow/status/semaphore-protocol/website/deploy.yml?branch=main&label=deploy&style=flat-square&logo=github">
    </a>
    <a href="https://prettier.io/" target="_blank">
        <img alt="Code style prettier" src="https://img.shields.io/badge/code%20style-prettier-f8bc45?style=flat-square&logo=prettier">
    </a>
    <img alt="Repository top language" src="https://img.shields.io/github/languages/top/semaphore-protocol/website?style=flat-square">
    <a href="https://www.gitpoap.io/gh/semaphore-protocol/website" target="_blank">
        <img src="https://public-api.gitpoap.io/v1/repo/semaphore-protocol/website/badge">
    </a>
</p>

<div align="center">
    <h4>
        <a href="./CONTRIBUTING.md">
            👥 Contributing
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="./CODE_OF_CONDUCT.md">
            🤝 Code of conduct
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://github.com/semaphore-protocol/website/issues/new/choose">
            🔎 Issues
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://semaphore.pse.dev/discord">
            🗣️ Chat &amp; Support
        </a>
    </h4>
</div>

| This repository contains the code for the Semaphore website published at [semaphore.pse.dev](https://semaphore.pse.dev). It uses Markdown syntax and the [Docusaurus](https://docusaurus.io/) site generator. |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## 🛠 Install

Clone this repository:

```bash
git clone https://github.com/semaphore-protocol/website.git
```

And install the dependencies:

```bash
cd website && yarn
```

## 📜 Usage

### Start the website

To generate the HTML and start the site, run:

```sh
yarn start
```

Visit the Semaphore docs site in your browser at [http://localhost:3000](http://localhost:3000).

### Build

```
yarn build
```

The `build` command generates static content into the `build` directory that can be served by any static content hosting service.

### Deploy

```
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you use GitHub pages for hosting, this command lets you build the website and push to the `gh-pages` branch.
