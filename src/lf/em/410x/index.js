module.exports = client => {
	const em410x = {
		parse: (output, card) => {
			const id = output.split("EM 410x ID ")[1].split("\n")[0];

			card.id = id;
		}
	};

	return em410x;
};
