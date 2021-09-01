const client = require("../src").client;

client().then(client => {
	client.command.lf.search.exec().then(output => {
		console.log(output);
	});
});
