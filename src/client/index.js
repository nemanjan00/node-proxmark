const daemon = require("../daemon");

module.exports = (...args) => {
	return new Promise((resolve, reject) => {
		daemon.createDaemon(...args).then(client => {
			const getCommandProxy = (args) => {
				return new Proxy({}, {
					get: (that, prop) => {

						if(prop == "exec") {
							return (...params) => {
								return new Promise((resolve) => {
									const command = args.concat(params).join(" ");

									const output = [];

									const listener = (data) => {
										output.push(data.line);
									};

									const endListener = () => {
										client.removeEventListener("line", listener);
										client.removeEventListener("command_end", endListener);

										resolve(output.join("\n"));
									};

									client.on("line", listener);

									client.on("command_end", endListener);

									client.emit("command", {
										command
									});
								});
							};
						}

						const newArgs = args || [];

						newArgs.push(prop);

						return getCommandProxy(newArgs);
					}
				})
			};

			const prox = {
				command: getCommandProxy(),
			};

			resolve(prox);
		}).catch(reject);
	});
};
