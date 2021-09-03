const client = require("../src").client;

const path = require("path");

const proxmarkClientPath = path.resolve(__dirname ,"../../pm-alpha/pm3");

client(proxmarkClientPath).then(client => {
	client.command.lf.em["4x50"].reader.exec().then(output => {
		console.log(output);
	});
});
