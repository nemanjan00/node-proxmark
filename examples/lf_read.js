const client = require("../src").client;
const lf = require("../src/lf");

const clientPromise = client(process.env.PM3);

lf(clientPromise).search().then(card => {
	console.log(card);
})
