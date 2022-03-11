# PWA Toolkit

A toolkit for building offline enabled progressive web apps.

## Packages

- [core](packages/core/README.md) - A collection of service worker functions to aid in the caching of remote resources and replaying failed network requests.
- [vite-config](packages/vite-config/README.md) - A default configuration for [vite-plugin-pwa](https://www.npmjs.com/package/vite-plugin-pwa)

## local Development

### Requirements

1. [Node 16.x](https://nodejs.org/en/)
2. [Yarn](https://yarnpkg.com/)

To install Yarn run

```bash
$ npm install yarn -g
```

Version `1.x` should be installed globally

```bash
$ npm ls -g --depth 0
```

### Environment variables

Set the following environment variables before running any node scripts.

**examples/api/.env**

```
PORT=3001
APP_NAME=PWA-Toolkit
```

**examples/client/.env**

```
VITE_REST_API=http://localhost:3001/api
VITE_GRAPHQL_API=http://localhost:3001/api/graphql
```

### Install and Build

```bash
$ yarn install
$ yarn build
```

### Seed Database

1. `$ yarn db:push`
2. `$ yarn db:seed`
3. To confirm and view the database run `$ yarn db:studio`

### Scripts

1. `$ yarn clean` to delete build artifacts
2. `$ yarn build` builds all projects and examples.
3. `$ yarn start` starting building all projects and examples in watch mode. Starts webapp at `http://localhost:3000`
4. `$ yarn start:prod` start examples in production mode. Enables PWA features, caching and offline mode.
   Launches app at `http://localhost:4173`. Be sure to clear browser cache when first accessing the app.

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
