module.exports = client => {
	const em410x = {
		parse: (output, card) => {
			const id = output.split("EM 410x ID ")[1].split("\n")[0];

			card.id = id;
		},

		write: (card, sourceCard) => {
			return new Promise((resolve, reject) => {
				const args = ["--id", sourceCard.id];

				client.command.lf.em["410x"].clone.exec(args).then(output => {
					if(output.indexOf("written") !== -1) {
						return resolve();
					}

					reject(output);
				});
			});
		}
	};

	return em410x;
};
