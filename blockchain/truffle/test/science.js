var Science = artifacts.require("Science");

contract('Science', function(accounts) {
	let publisher = accounts[3];
	let publisherOrcid = "ayy";
	let institution = accounts[1];
	let institutionOrcid = "lmao";
	let reproducer = accounts[2];
	let reproducerOrcid = "top";

	let title = "Amazing research";
	let paperUrl = "gugul";

	let publishFee = web3.toWei(10, "ether");

	it("should publish research", async () => {
		let sci = await Science.deployed();
		console.log("test...", publishFee, publisherOrcid, paperUrl, title, publisher);
		await sci.publishResearch(publisherOrcid, paperUrl, title, {from: publisher, value: publishFee})
		console.log("ok...");
		let researches = await sci.getResearchKeys();
		assert.equal(researches.length, 1);
		let research = await sci.researches(researches[0]);


		//assert.equals(research[0])
	});
});
