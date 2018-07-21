/* eslint-disable */
const abi =[
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "votes",
    "outputs": [
      {
        "name": "votedFor",
        "type": "uint256"
      },
      {
        "name": "votedAgainst",
        "type": "uint256"
      },
      {
        "name": "target",
        "type": "uint256"
      },
      {
        "name": "result",
        "type": "bool"
      },
      {
        "name": "completed",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "researches",
    "outputs": [
      {
        "name": "researcher",
        "type": "address"
      },
      {
        "name": "paperURL",
        "type": "string"
      },
      {
        "name": "title",
        "type": "string"
      },
      {
        "name": "id",
        "type": "bytes32"
      },
      {
        "name": "stakedAmount",
        "type": "uint256"
      },
      {
        "name": "votesLength",
        "type": "uint256"
      },
      {
        "name": "isLocked",
        "type": "bool"
      },
      {
        "name": "reproducer",
        "type": "address"
      },
      {
        "name": "reproducedURL",
        "type": "string"
      },
      {
        "name": "state",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "researchKeys",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "addressToOrcid",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getResearchKeys",
    "outputs": [
      {
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "bytes32"
      }
    ],
    "name": "getResearchStakers",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "bytes32"
      },
      {
        "name": "adr",
        "type": "address"
      }
    ],
    "name": "getStake",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "bytes32"
      },
      {
        "name": "voteIdx",
        "type": "uint256"
      },
      {
        "name": "adr",
        "type": "address"
      }
    ],
    "name": "getVote",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "orcid",
        "type": "string"
      }
    ],
    "name": "register",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "paperURL",
        "type": "string"
      },
      {
        "name": "title",
        "type": "string"
      }
    ],
    "name": "publishResearch",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "bytes32"
      }
    ],
    "name": "stakeResearch",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "bytes32"
      }
    ],
    "name": "startReproduce",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "bytes32"
      }
    ],
    "name": "submitReproduction",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "bytes32"
      },
      {
        "name": "voteFor",
        "type": "bool"
      }
    ],
    "name": "vote",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
  
let puts = console.log



export function init(){
	console.log("success")
	if (typeof web3 === 'undefined') {
		//if there is no web3 variable
		puts("Error! Are you sure that you are using metamask?");
		return null;
	} else {
		puts("Welcome to our DAPP!");
		return connectContract();
	}
}

var inst;

var address = "0xcfeb869f69431e42cdb54a4f4f105c19c080a601";
var acc;

function connectContract(){
	var Contract = web3.eth.contract(abi)
	let contract = Contract.at(address)
	inst = contract
	let account = updateAccount()
	return {contract, account}
}

function updateAccount(){
	//in metamask, the accounts array is of size 1 and only contains the currently selected account. The user can select a different account and so we need to update our account variable
  acc = web3.eth.accounts[0];
  return acc
}

// ALL METHODS

export function getSolidityCall(funName, payable) {
	return function(){
		let ar = arguments;
		let o = {"from": acc,}
		if(payable){
			o["value"] = web3.toWei("1", "ether")
		}

		return new Promise((accept, reject) => {
			inst[funName](...ar, o, function(err, res){
				if(!err) {
					accept(res);
				} else {
					reject(err);
				}
			});
		});
	}
}

