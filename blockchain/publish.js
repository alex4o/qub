var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var acc = web3.eth.accounts[0]; //get the first account

//Code:
/*
contract Ownable {
    address public owner;
    
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    
    function Ownable() public {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}
*/

//Store this contract's compiled bytecode and ABI
var abi = [{"constant":true,"inputs":[{"name":"eventID","type":"uint256"},{"name":"idx","type":"uint256"}],"name":"getEventPlacedBetByIndex","outputs":[{"name":"id","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"betType","type":"uint256"},{"name":"values","type":"uint256[2]"},{"name":"odd","type":"uint256"},{"name":"user","type":"address"},{"name":"number","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"eventID","type":"uint256"}],"name":"getEventByID","outputs":[{"name":"id","type":"uint256"},{"name":"ts","type":"uint256"},{"name":"home","type":"string"},{"name":"away","type":"string"},{"name":"sport","type":"string"},{"name":"betTypes","type":"uint256[]"},{"name":"closedBetTypes","type":"uint256[]"},{"name":"active","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getEventIDs","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"eventID","type":"uint256"},{"name":"betType","type":"uint256"}],"name":"closeBetType","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"eventID","type":"uint256"},{"name":"betID","type":"uint256"}],"name":"placeBet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"eventID","type":"uint256"}],"name":"getEventPlacedBetsAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"eventID","type":"uint256"},{"name":"betType","type":"uint256"},{"name":"values","type":"uint256[2]"}],"name":"announceResult","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"eventID","type":"uint256"},{"name":"betID","type":"uint256"}],"name":"getEventBetByID","outputs":[{"name":"id","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"betType","type":"uint256"},{"name":"values","type":"uint256[2]"},{"name":"odd","type":"uint256"},{"name":"user","type":"address"},{"name":"number","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"eventID","type":"uint256"},{"name":"betType","type":"uint256"},{"name":"betID","type":"uint256"},{"name":"values","type":"uint256[2]"},{"name":"odd","type":"uint256"},{"name":"number","type":"uint256"}],"name":"updateBet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"ts","type":"uint256"},{"name":"home","type":"string"},{"name":"away","type":"string"},{"name":"sport","type":"string"},{"name":"betTypes","type":"uint256[]"}],"name":"createEvent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"eventID","type":"uint256"}],"name":"getEventAvailableBets","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isCallerAdmin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"eventID","type":"uint256"},{"indexed":false,"name":"betIndex","type":"uint256"},{"indexed":false,"name":"winnings","type":"uint256"}],"name":"BetWon","type":"event"}];
var bytecode = "608060405234801561001057600080fd5b5033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611e39806100616000396000f3006080604052600436106100c5576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630a23f5fb146100ca5780632d47e66b146101935780632e1a7d4d146103ba5780633cbb95f6146103e75780633f6f64be146104535780634afe62b51461048a578063627d04a6146104b45780636710aec2146104f55780636f5f75451461055b578063ad65b12b14610624578063b2112ae4146106a8578063ebf30b84146107f4578063fd31a7d014610876575b600080fd5b3480156100d657600080fd5b506100ff60048036038101908080359060200190929190803590602001909291905050506108a5565b6040518088815260200187815260200186815260200185600260200280838360005b8381101561013c578082015181840152602081019050610121565b505050509050018481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200197505050505050505060405180910390f35b34801561019f57600080fd5b506101be60048036038101908080359060200190929190505050610a46565b6040518089815260200188815260200180602001806020018060200180602001806020018715151515815260200186810386528c818151815260200191508051906020019080838360005b83811015610224578082015181840152602081019050610209565b50505050905090810190601f1680156102515780820380516001836020036101000a031916815260200191505b5086810385528b818151815260200191508051906020019080838360005b8381101561028a57808201518184015260208101905061026f565b50505050905090810190601f1680156102b75780820380516001836020036101000a031916815260200191505b5086810384528a818151815260200191508051906020019080838360005b838110156102f05780820151818401526020810190506102d5565b50505050905090810190601f16801561031d5780820380516001836020036101000a031916815260200191505b50868103835289818151815260200191508051906020019060200280838360005b8381101561035957808201518184015260208101905061033e565b50505050905001868103825288818151815260200191508051906020019060200280838360005b8381101561039b578082015181840152602081019050610380565b505050509050019d505050505050505050505050505060405180910390f35b3480156103c657600080fd5b506103e560048036038101908080359060200190929190505050610d1c565b005b3480156103f357600080fd5b506103fc610e01565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561043f578082015181840152602081019050610424565b505050509050019250505060405180910390f35b34801561045f57600080fd5b506104886004803603810190808035906020019092919080359060200190929190505050610e59565b005b6104b26004803603810190808035906020019092919080359060200190929190505050610f7c565b005b3480156104c057600080fd5b506104df600480360381019080803590602001909291905050506110aa565b6040518082815260200191505060405180910390f35b34801561050157600080fd5b50610559600480360381019080803590602001909291908035906020019092919080604001906002806020026040519081016040528092919082600260200280828437820191505050505091929192905050506110cf565b005b34801561056757600080fd5b506105906004803603810190808035906020019092919080359060200190929190505050611308565b6040518088815260200187815260200186815260200185600260200280838360005b838110156105cd5780820151818401526020810190506105b2565b505050509050018481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200197505050505050505060405180910390f35b34801561063057600080fd5b506106a6600480360381019080803590602001909291908035906020019092919080359060200190929190806040019060028060200260405190810160405280929190826002602002808284378201915050505050919291929080359060200190929190803590602001909291905050506114d3565b005b3480156106b457600080fd5b506107f26004803603810190808035906020019092919080359060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919291929080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509192919290505050611688565b005b34801561080057600080fd5b5061081f600480360381019080803590602001909291905050506117c3565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b83811015610862578082015181840152602081019050610847565b505050509050019250505060405180910390f35b34801561088257600080fd5b5061088b611833565b604051808215151515815260200191505060405180910390f35b60008060006108b2611b2f565b60008060008060008a8a6000600160008481526020019081526020016000209050600081600b01838154811015156108e657fe5b90600052602060002090600902016006015411151561090457600080fd5b600160008f8152602001908152602001600020945084600b018d81548110151561092a57fe5b90600052602060002090600902019350610a2784610100604051908101604052908160008201548152602001600182015481526020016002820154815260200160038201548152602001600482016002806020026040519081016040528092919082600280156109af576020028201915b81548152602001906001019080831161099b575b50505050508152602001600682015481526020016007820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160088201548152505061188b565b9b509b509b509b509b509b509b50505050505092959891949750929550565b600080606080606080606060008088600160008c815260200190815260200160002091508a995081600101549850816002018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b0c5780601f10610ae157610100808354040283529160200191610b0c565b820191906000526020600020905b815481529060010190602001808311610aef57829003601f168201915b50505050509750816003018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bab5780601f10610b8057610100808354040283529160200191610bab565b820191906000526020600020905b815481529060010190602001808311610b8e57829003601f168201915b50505050509650816004018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610c4a5780601f10610c1f57610100808354040283529160200191610c4a565b820191906000526020600020905b815481529060010190602001808311610c2d57829003601f168201915b5050505050955081600501805480602002602001604051908101604052809291908181526020018280548015610c9f57602002820191906000526020600020905b815481526020019060010190808311610c8b575b5050505050945081600c0160009054906101000a900460ff16925081600601805480602002602001604051908101604052809291908181526020018280548015610d0857602002820191906000526020600020905b815481526020019060010190808311610cf4575b505050505093505050919395975091939597565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548111151515610d6a57600080fd5b80600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610dfd573d6000803e3d6000fd5b5050565b60606000805480602002602001604051908101604052809291908181526020018280548015610e4f57602002820191906000526020600020905b815481526020019060010190808311610e3b575b5050505050905090565b600080833373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610eb957600080fd5b60016000868152602001908152602001600020925082600701600085815260200190815260200160002060009054906101000a900460ff161515610f5457600183600701600086815260200190815260200160002060006101000a81548160ff021916908315150217905550826006018490806001815401808255809150509060018203906000526020600020016000909192909190915055505b600091505b8260050180549050821015610f75578180600101925050610f59565b5050505050565b81426001600083815260200190815260200160002060010154111515610fa157600080fd5b8282600060016000848152602001908152602001600020905060008160090182600801600085815260200190815260200160002054815481101515610fe257fe5b90600052602060002090600902016006015411151561100057600080fd5b8585600080600160008581526020019081526020016000209150816009018260080160008581526020019081526020016000205481548110151561104057fe5b906000526020600020906009020190508160070160008260030154815260200190815260200160002060009054906101000a900460ff1615151561108357600080fd5b60003411151561109257600080fd5b61109e33348c8c6118d9565b50505050505050505050565b60008160016000848152602001908152602001600020600b0180549050915050919050565b6000806000803373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561113157600080fd5b600160008881526020019081526020016000209350600092505b83600b01805490508310156112ff5783600b018381548110151561116b57fe5b906000526020600020906009020191508582600301541480156111b3575084600060028110151561119857fe5b60200201518260040160006002811015156111af57fe5b0154145b80156111e457508460016002811015156111c957fe5b60200201518260040160016002811015156111e057fe5b0154145b156112f2578160060154826000015402905060648181151561120257fe5b04905080600260008460070160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550868260070160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f1ce690bab3f0797851d1673f462be38a6378af9c81188730b523525747eba55d8584604051808381526020018281526020019250505060405180910390a35b828060010193505061114b565b50505050505050565b6000806000611315611b2f565b60008060008060008a8a60006001600084815260200190815260200160002090506000816009018260080160008581526020019081526020016000205481548110151561135e57fe5b90600052602060002090600902016006015411151561137c57600080fd5b600160008f81526020019081526020016000209450846009018560080160008f8152602001908152602001600020548154811015156113b757fe5b906000526020600020906009020193506114b4846101006040519081016040529081600082015481526020016001820154815260200160028201548152602001600382015481526020016004820160028060200260405190810160405280929190826002801561143c576020028201915b815481526020019060010190808311611428575b50505050508152602001600682015481526020016007820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160088201548152505061188b565b9b509b509b509b509b509b509b50505050505092959891949750929550565b6000806000884260016000838152602001908152602001600020600101541115156114fd57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561155957600080fd5b600160008b815260200190815260200160002093506000925060008460080160008a8152602001908152602001600020541415611601578360090180548091906001016115a69190611b51565b506001846009018054905003925083600a01889080600181540180825580915050906001820390600052602060002001600090919290919091505550828460080160008a81526020019081526020016000208190555061161a565b8360080160008981526020019081526020016000205492505b836009018381548110151561162b57fe5b906000526020600020906009020191508982600101819055508782600201819055508882600301819055508682600401906002611669929190611b83565b5085826006018190555084826008018190555050505050505050505050565b60003373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156116e657600080fd5b60016000888152602001908152602001600020905086816000018190555085816001018190555083816003019080519060200190611725929190611bc3565b508481600201908051906020019061173e929190611bc3565b5082816004019080519060200190611757929190611bc3565b5081816005019080519060200190611770929190611c43565b50600181600c0160006101000a81548160ff021916908315150217905550600087908060018154018082558091505090600182039060005260206000200160009091929091909150555050505050505050565b60608160016000848152602001908152602001600020600a0180548060200260200160405190810160405280929190818152602001828054801561182657602002820191906000526020600020905b815481526020019060010190808311611812575b5050505050915050919050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614905090565b6000806000611898611b2f565b6000806000876040015196508760000151955087606001519450876080015193508760a0015192508760c0015191508760e001519050919395979092949650565b6000806118e4611c90565b600160008681526020019081526020016000209250826009018360080160008681526020019081526020016000205481548110151561191f57fe5b9060005260206000209060090201915081610100604051908101604052908160008201548152602001600182015481526020016002820154815260200160038201548152602001600482016002806020026040519081016040528092919082600280156119a1576020028201915b81548152602001906001019080831161198d575b50505050508152602001600682015481526020016007820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600882015481525050905085816000018181525050868160c0019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505082600b01819080600181540180825580915050906001820390600052602060002090600902016000909192909190915060008201518160000155602082015181600101556040820151816002015560608201518160030155608082015181600401906002611ac7929190611cf2565b5060a0820151816006015560c08201518160070160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060e0820151816008015550505050505050505050565b6040805190810160405280600290602082028038833980820191505090505090565b815481835581811115611b7e57600902816009028360005260206000209182019101611b7d9190611d32565b5b505050565b8260028101928215611bb2579160200282015b82811115611bb1578251825591602001919060010190611b96565b5b509050611bbf9190611db8565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611c0457805160ff1916838001178555611c32565b82800160010185558215611c32579182015b82811115611c31578251825591602001919060010190611c16565b5b509050611c3f9190611db8565b5090565b828054828255906000526020600020908101928215611c7f579160200282015b82811115611c7e578251825591602001919060010190611c63565b5b509050611c8c9190611db8565b5090565b6101206040519081016040528060008152602001600081526020016000815260200160008152602001611cc1611ddd565b815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b8260028101928215611d21579160200282015b82811115611d20578251825591602001919060010190611d05565b5b509050611d2e9190611db8565b5090565b611db591905b80821115611db157600080820160009055600182016000905560028201600090556003820160009055600482016000611d719190611dff565b60068201600090556007820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600882016000905550600901611d38565b5090565b90565b611dda91905b80821115611dd6576000816000905550600101611dbe565b5090565b90565b6040805190810160405280600290602082028038833980820191505090505090565b5060008155600101600090555600a165627a7a72305820ffd52ffbd0359799c7098bf5dec156a2529cc01dde053139b13abd6bc213a4460029"

//create the contract instance. We can use this instance to publish or connect to a published contract
var Contract = web3.eth.contract(abi);

//create a JS Object (key-value pairs), holding the data we need to publish our contract
var publishData = {
	"from": acc, //the account from which it will be published
	"data": bytecode,
	"gas": 4000000 //gas limit. This should be the same or lower than Ethereum's gas limit
}

//publish the contract, passing a callback that will be called twice. Once when the transaction is sent, and once when it is mined
//the first argument is the constructor argument
Contract.new(publishData, function(err, contractInstance) {
	if(!err) {
		if(contractInstance.address) { //if the contract has an address aka if the transaction is mined
            console.log("New contract address is :", contractInstance.address);
            console.log("Owner is :", acc)
		}
	} else {
		console.error(err); //something went wrong
	}
});