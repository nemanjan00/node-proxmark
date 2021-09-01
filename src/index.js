const daemon = require("./daemon");

daemon.createDaemon().then(client => {
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

	prox.command.lf.search.exec().then(output => {
		console.log(output);
	});
});
