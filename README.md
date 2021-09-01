# node-proxmark3

Node.js library for proxmark3.

## Table of contents

<!-- vim-markdown-toc GFM -->

* [Example](#example)

<!-- vim-markdown-toc -->

## Example

```
const client = require("node-proxmark3").client;

client("path_to_client_executable").then(client => {
	client.command.lf.search.exec().then(output => {
		console.log(output);
	});
});
```

