const client = require("../src").client;
const lf = require("../src/lf");

const sourceCard = {
	type: 'EM410x',
	chipset: 'T55xx',
	id: '0F0368568B'
};

const clientPromise = client(process.env.PM3);

const lfClient = lf(clientPromise);

lfClient.search().then(card => {
	console.log(card);

	lfClient.write(card, sourceCard).then(() => {
		console.log("Written card ID");

		lfClient.search().then(card => {
			console.log(card);
		});
	});
})
