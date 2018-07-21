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

	it("should register", async () => {
		let sci = await Science.deployed();
		
		await sci.register(publisherOrcid, {from: publisher});
		let orcid = await sci.getMyOrcid({from: publisher});

		assert.equal(orcid, publisherOrcid);

		let orcid2 = await sci.addressToOrcid(publisher);
		
		assert.equal(orcid2, publisherOrcid);
	});

	it("should publish research", async () => {
		let sci = await Science.deployed();
		await sci.publishResearch(paperUrl, title, {from: publisher, value: publishFee})
		console.log("ok...");
		let researches = await sci.getResearchKeys();
		assert.equal(researches.length, 1);
		console.log("Res len is 1", researches);
		let research = await sci.researches("123");


		//assert.equals(research[0])
	});
});
