const daemon = require("../daemon");

module.exports = (...args) => {
	return new Promise((resolve, reject) => {
		daemon.createDaemon(...args).then(client => {
			const getCommandProxy = (args) => {
				return new Proxy({}, {
					get: (that, prop) => {
						if(prop == "exec") {
							return () => {
								return new Promise((resolve) => {
									const command = args.join(" ");

									const output = [];

									const listener = (data) => {
										output.push(data.line);
									};

									const endListener = () => {
										resolve(output.join("\n"));

										client.removeEventListener("line", listener);
										client.removeEventListener("command_end", endListener);
									};

									client.on("line", listener);

									client.on("command_end", endListener);

									client.emit("command", {
										command
									});
								});
							};
						}

						args.push(prop);

						return getCommandProxy(args);
					}
				})
			};

			const prox = {
				command: getCommandProxy([]),
			};

			resolve(prox);
		}).catch(reject);
	});
};
