## Wrangler CLI setup

To install wrangler, ensure you have npm installed, then run:

```
npm install -g @cloudflare/wrangler
```
```
wrangler --version
```

## Router

[`index.js`](https://github.com/ganeshparsads/cloudflare-workers/blob/master/index.js) is the content of the Workers script.


## Debugging

```
wrangler preview --watch
```

This command will build your project, upload it to a unique URL, and open a tab in your browser to view it. This allows you to quickly test your project running on the actual Workers runtime, and optionally, even share it with others too.

## Publishing changes

We need to edit `wrangler.toml` file and add our Cloudflare `account_id` - more information about publishing your code can be found [in the documentation](https://workers.cloudflare.com/docs/quickstart/configuring-and-publishing/).

Once you are ready, you can publish your code by running the following command:

```
wrangler publish
```
