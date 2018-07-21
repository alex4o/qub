var abi = [{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"name":"votes","outputs":[{"name":"votedFor","type":"uint256"},{"name":"votedAgainst","type":"uint256"},{"name":"target","type":"uint256"},{"name":"result","type":"bool"},{"name":"completed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"orcidStr","type":"string"},{"name":"id","type":"bytes32"}],"name":"startReproduce","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"bytes32"},{"name":"adr","type":"address"}],"name":"getStake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"researches","outputs":[{"name":"researcher","type":"address"},{"name":"paperURL","type":"string"},{"name":"title","type":"string"},{"name":"id","type":"bytes32"},{"name":"stakedAmount","type":"uint256"},{"name":"votesLength","type":"uint256"},{"name":"isLocked","type":"bool"},{"name":"reproducer","type":"address"},{"name":"reproducedURL","type":"string"},{"name":"state","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getResearchKeys","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"orcidStr","type":"string"},{"name":"id","type":"bytes32"}],"name":"stakeResearch","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"bytes32"}],"name":"submitReproduction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"researchKeys","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"bytes32"},{"name":"voteFor","type":"bool"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"addressToOrcid","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"bytes32"}],"name":"getResearchStakers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"orcidStr","type":"string"},{"name":"paperURL","type":"string"},{"name":"title","type":"string"}],"name":"publishResearch","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"bytes32"},{"name":"voteIdx","type":"uint256"},{"name":"adr","type":"address"}],"name":"getVote","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"}];

let puts = console.log

function init(){
	console.log("success")
	if (typeof web3 === 'undefined') {
		//if there is no web3 variable
		puts("Error! Are you sure that you are using metamask?");
	} else {
		puts("Welcome to our DAPP!");
		connectContract();
	}
}

var inst;

var address = "0xe78a0f7e598cc8b0bb87894b0f60dd2a88d6a8ab";
var acc;

//temp fix:
//var Web3 = require("web3");
//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

init()

function connectContract(){
	var Contract = web3.eth.contract(abi);
	inst = Contract.at(address);
	updateAccount();
}

function updateAccount(){
	//in metamask, the accounts array is of size 1 and only contains the currently selected account. The user can select a different account and so we need to update our account variable
	acc = web3.eth.accounts[0];
}

// ALL METHODS

function getSolidityCall(funName, args) {
	return function(){
		let ar = arguments;

		return new Promise((accept, reject) => {
			inst[funName](...ar, {"from": acc}, function(err, res){
				if(!err) {
					accept(res);
				} else {
					reject(err);
				}
			});
		});
	}
}
