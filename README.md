# Apptiva Webpage

This repo contains the website of [Apptiva AG](https://apptiva.ch/)

## Prerequisites

* Node (I recommend using v8.2.0 or higher)
* [Gatsby CLI](https://www.gatsbyjs.org/docs/)

## Getting Started (Recommended)

### Access Locally

```
$ git clone https://github.com/[GITHUB_USERNAME]/[REPO_NAME].git
$ cd [REPO_NAME]
$ npm i
$ npm start
```

To test the CMS locally, you'll need run a production build of the site:

```
$ npm run build
$ npm run serve
```

### Push update

Just make your changes locally, test and git commit/push. A new version will be built automatically.

## Debugging

Windows users might encounter `node-gyp` errors when trying to npm install.
To resolve, make sure that you have both Python 2.7 and the Visual C++ build environment installed.

```
npm config set python python2.7
npm install --global --production windows-build-tools
```

[Full details here](https://www.npmjs.com/package/node-gyp 'NPM node-gyp page')
