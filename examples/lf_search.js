const client = require("../src").client;

const path = require("path");

const proxmarkClientPath = path.resolve(__dirname ,"../../pm-alpha/pm3");

client(proxmarkClientPath).then(client => {
	client.command.lf.search.exec().then(output => {
		console.log(output);

		client.command.lf.search.exec().then(output => {
			console.log(output);
		});
	});
});
