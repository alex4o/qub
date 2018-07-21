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
	let reproduceUrl = "feisbuk";

	let publishFee = web3.toWei(1, "ether");
	let reproduceFee = web3.toWei(1, "ether");
	let stake = web3.toWei(50, "ether");

	let id;

	it("should register", async () => {
		let sci = await Science.deployed();
		
		let people = [publisher, institution, reproducer];
		let orcids = [publisherOrcid, institutionOrcid, reproducerOrcid];
	
		for(let i=0; i<people.length; i++) {
			let user = people[i];

			await sci.register(orcids[i], {from: user});
			let orcid = await sci.getMyOrcid({from: user});

			assert.equal(orcid, orcids[i]);

			let orcid2 = await sci.addressToOrcid(user);
			
			assert.equal(orcid2, orcids[i]);
		}
	});

	it("should publish research", async () => {
		let sci = await Science.deployed();
		await sci.publishResearch(paperUrl, title, {from: publisher, value: publishFee})
		let researches = await sci.getResearchKeys();
		assert.equal(researches.length, 1);
		id = researches[0];

		let research = await sci.researches(id);
	
		assert.equal(research[2], title);

	});

	it("should stake on research", async () => {
		let sci = await Science.deployed();
		await sci.stakeResearch(id, {from: institution, value: stake})
		
		let research = await sci.researches(id);
	
		assert.equal(research[4], stake);

		let stakers = await sci.getResearchStakers(id);
		assert.equal(stakers[0], institution);
	});

	it("should start research reproduction", async () => {
		let sci = await Science.deployed();

		await sci.startReproduce(id, {from: reproducer, value: reproduceFee});

		let research = await sci.researches(id);

		assert.equal(research[7], reproducer);
	});

	it("should submit reproduction", async () => {
		let sci = await Science.deployed();

		await sci.submitReproduction(id, reproduceUrl, {from: reproducer});

		let research = await sci.researches(id);

		assert.equal(research[8], reproduceUrl);
	});

	it("should vote against and end that vote", async () => {
		let sci = await Science.deployed();

		await sci.vote(id, false, {from: institution});
		//we've got only one voter so voting will end it

		let vote = await sci.getVote(id, 0, institution); //voteIdx = 0
		assert.equal(vote.toFixed(), 2); //VOTED_AGAINST

		let research = await sci.researches(id);

		console.log(research)
		assert.equal(research[9].toFixed(), 0); //state = "PUBLISHED" (it was "PENDING" before)
		assert.equal(research[6], false); //isLocked = false
		assert.equal(research[5].toFixed(), 1); //votesLength = 1

		let voteObj = await sci.votes(id, 0); //voteIdx = 0
		console.log(voteObj);

		assert.equal(voteObj[3], false); //result
		assert.equal(voteObj[4], true); //completed
		assert.equal(voteObj[0].toFixed(), 0); //votedFor
		assert.equal(voteObj[1].toFixed(), 1); //votedAgainst
	});
});
