# node-proxmark3

Node.js library for proxmark3.

## Table of contents

<!-- vim-markdown-toc GFM -->

* [Install](#install)
* [Example](#example)

<!-- vim-markdown-toc -->

## Install

```bash
yarn add node-proxmark3
```

## Example

```javascript
const client = require("node-proxmark3").client;

client("path_to_client_executable").then(client => {
	client.command.lf.search.exec().then(output => {
		console.log(output);
	});
});
```

