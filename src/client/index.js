const daemon = require("../daemon");
const command = require("../command");

module.exports = (...args) => {
	return new Promise((resolve, reject) => {
		daemon.createDaemon(...args).then(client => {
			const getCommandProxy = (args) => {
				return new Proxy({}, {
					get: (that, prop) => {

						if(prop == "exec") {
							return command(client, args);
						}

						const newArgs = args || [];

						newArgs.push(prop);

						return getCommandProxy(newArgs);
					}
				})
			};

			const prox = {
				command: getCommandProxy(),
				client: client
			};

			resolve(prox);
		}).catch(reject);
	});
};
