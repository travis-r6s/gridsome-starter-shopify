# Shopify starter for Gridsome

This is a boilerplate starter, aiming to showcase how Gridsome and Shopify can work together, to create an amazingly fast shopping experience for consumers. [View Demo](https://gridsome-starter-shopify.vercel.app)

This starter uses a source plugin ([`gridsome-source-shopify`](https://gridsome.org/plugins/gridsome-source-shopify)) to pull data from Shopify's Storefront API, and load it into Gridsome's data store - which you can then use to create pages (note that this only runs at build time).
It also uses the [Vue Apollo](https://apollo.vuejs.org) plugin client-side, to send queries/mutations (i.e. `createCheckout`) to the [Storefront API](https://help.shopify.com/en/api/storefront-api) when running in the browser.

## Shopify Setup

You will need to create a private app in Shopify, and give it access to the Storefront API - the default permissions should be fine for this starter.
Make sure to note the Storefront API key, and your store name.

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
# Note env's are prefixed with GRIDSOME_ to make them available to apollo client side
GRIDSOME_SHOPIFY_STOREFRONT=<shop name>
GRIDSOME_SHOPIFY_STOREFRONT_TOKEN=<storefront token>
```

Or you can manually edit the [Shopify Source Plugin's](https://gridsome.org/plugins/gridsome-source-shopify) configurations in `gridsome.config.js`.

Enter the site folder, and run `gridsome develop` to start a local development server.

Happy coding!
