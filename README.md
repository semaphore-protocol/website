<p align="center">
    <h1 align="center">
      <img width="40" src="https://github.com/semaphore-protocol/website/blob/main/static/img/semaphore-icon.svg">  
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
        <img alt="GitHub Workflow test" src="https://img.shields.io/github/workflow/status/semaphore-protocol/website/deploy?label=deploy&style=flat-square&logo=github">
    </a>
    <a href="https://prettier.io/" target="_blank">
        <img alt="Code style prettier" src="https://img.shields.io/badge/code%20style-prettier-f8bc45?style=flat-square&logo=prettier">
    </a>
    <img alt="Repository top language" src="https://img.shields.io/github/languages/top/semaphore-protocol/website?style=flat-square">
</p>

<div align="center">
    <h4>
        <a href="https://github.com/semaphore-protocol/semaphore/blob/main/CONTRIBUTING.md">
            👥 Contributing
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://github.com/semaphore-protocol/semaphore/blob/main/CODE_OF_CONDUCT.md">
            🤝 Code of conduct
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://github.com/semaphore-protocol/website/issues/new/choose">
            🔎 Issues
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://t.me/joinchat/B-PQx1U3GtAh--Z4Fwo56A">
            🗣️ Chat &amp; Support
        </a>
    </h4>
</div>

| This repository contains the code for the Semaphore website published at [semaphore.appliedzkp.org](https://semaphore.appliedzkp.org). It uses Markdown syntax and the [Docusaurus](https://docusaurus.io/) site generator. |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## Install and run for development

Install dependencies, build the documentation, and run the site on your local machine.

### Install Node.js and a package manager

If you haven't already, download and install [Node.js](https://nodejs.org/en/).

You can use `npm` (included with Node.js) or `yarn` to install Docusaurus and other Node.js packages.
To install `yarn`, run the following in your terminal:

```sh
$ npm i --global yarn
```

### 🛠 Get the code

Clone the Semaphore repository and then change to the `website` directory:

```sh
$ git clone https://github.com/semaphore-protocol/website.git && cd website
```

### Install dependencies

To install dependencies, run `yarn`:

```sh
$ yarn
```

### Start the site

To generate the HTML and start the site, run `yarn start`:

```sh
$ yarn start
```

Visit the Semaphore docs site in your browser at [http://localhost:3000](http://localhost:3000).

## 📜 Use deployment commands

### Develop

```
$ yarn start
```

Th `start` command starts a local development server (default port is `:3000`) and launches the site in your browser.
As you edit, the server reloads most changes and automatically refreshes the site in your browser.

### Build

```
$ yarn build
```

The `build` command generates static content into the `build` directory that can be served by any static content hosting service.

### Deploy

```
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you use GitHub pages for hosting, this command lets you build the website and push to the `gh-pages` branch.
