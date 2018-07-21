var Science = artifacts.require("Science");

contract('Science', function(accounts) {
	it("should do something", async () => {
		let sci = await Science.deployed();
		let researches = await sci.getResearchKeys();
		assert.equal(researches.length, 0, "no");
	});
});
