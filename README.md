[![Netlify Status](https://api.netlify.com/api/v1/badges/f49331f9-7aa8-41d9-8e57-913af6b1638c/deploy-status)](https://app.netlify.com/sites/gridsome-shopify-starter/deploys)

# Shopify starter for Gridsome

This is a boilerplate starter, aiming to showcase how Gridsome and Shopify can work together, to create an amazingly fast shopping experience for consumers. [View Demo](https://gridsome-shopify-starter.netlify.com)

## Installation

Install the Gridsome CLI.

```bash
npm install -g @gridsome/cli # or
yarn global add @gridsome/cli
```

## Create Project

You can either directly download this repository, or use Gridsome's CLI to download and install dependencies for you.

```bash
# Clone repository
git clone https://github.com/thetre97/gridsome-starter-shopify.git
npm install # or
yarn install

# Download with CLI
gridsome create my-gridsome-site thetre97/gridsome-starter-shopify
```

## Developing

You will need to add your Storefront API shop name (https://\<shop-name\>.myshopify.com) & token to an env file before running this starter.
I also recommend you add some collections in Shopify to best show off this starter.

```
GRIDSOME_SHOPIFY_STOREFRONT=<shop name>
GRIDSOME_SHOPIFY_STOREFRONT_TOKEN=<storefront token>
```

Or you can manually edit the [Shopify Source Plugin's](https://gridsome.org/plugins/gridsome-source-shopify) configurations in `gridsome.config.js`.

Enter the site folder, and run `gridsome develop` to start a local development server.

Happy coding!
