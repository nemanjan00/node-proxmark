const client = require("../").client;

const em = require("./em");

const typeMap = {
	"EM410x": em["410x"]
};

module.exports = clientPromise => {
	const lf = {
		search: () => {
			return new Promise((resolve, reject) => {
				clientPromise.then(client => {
					client.command.lf.search.exec().then(output => {
						console.log(output);
						const card = lf.parse(output);

						console.log(card);
					});
				});
			});
		},

		parse: (output) => {
			if(output.indexOf("Valid") === -1) {
				return false;
			}

			const type = output.split("[+] Valid ")[1].split(" ID")[0];

			const chipset = output.split("Chipset detection: ")[1].split("\n")[0];

			const card = {
				type,
				chipset
			};

			const typeCard = typeMap[type];

			if(typeCard === undefined) {
				return card;
			}

			const cardType = typeCard();

			cardType.parse(output, card);

			return card;
		}
	};

	return lf;
};
