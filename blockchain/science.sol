pragma solidity 0.4.24;

contract Science {
    enum ResearchState {PUBLISHED, PENDING, REPRODUCED}
    enum VotedState {NOT_VOTED, VOTED_FOR, VOTED_AGAINST}
    
    struct Vote {
        uint votedFor;
        uint votedAgainst;
        uint target;
        bool result;
        bool completed;
        
        mapping(address => VotedState) voted;
    }
    
    struct Research {
        address researcher;
        string paperURL;
        string title;
        bytes32 id;
        
        uint stakedAmount;
        mapping(address => uint) staked;
        address[] stakers;
        
        uint votesLength;
        bool isLocked;
        
        address reproducer;
        string reproducedURL;
        
        ResearchState state;
    }
    
    //orcids are hashed because strings and solidity aren't a good combination
    mapping (address => bytes32) public addressToOrcid;
    
    mapping (bytes32 => Research) public researches;
    bytes32[] public researchKeys;
    
    mapping (bytes32 => Vote[]) public votes;
    
    
    uint publishFee = 1 ether;
    uint reproduceFee = 1 ether;
    uint minStake = 1 ether;
    
    modifier paidEnough(uint fee) {
        require(msg.value >= fee);
        _;
    }
    
    modifier researchExists(bytes32 id) {
        require(researches[id].researcher != 0x0);
        _;
    }
    
    modifier researchNotReproducing(bytes32 id) {
        require(researches[id].reproducer == 0x0);
        _;
    }
    
    modifier researchReproducing(bytes32 id) {
        require(researches[id].reproducer != 0x0);
        _;
    }
    
    modifier researchNotLocked(bytes32 id) {
        require(!researches[id].isLocked);
        _;
    }
    
    modifier researchPending(bytes32 id) {
        require(researches[id].state == ResearchState.PENDING);
        _;
    }
    
    modifier orcidTheSame(string orcidStr) {
        bytes32 orcid = keccak256(abi.encodePacked(orcidStr));
        bytes32 currOrcidHash = addressToOrcid[msg.sender];
        require(orcid == 0x0 || currOrcidHash == orcid);
        _;
    }
    
    constructor () public payable {
        //...
        publishResearch("dimitry", "gugul", "resar4");
    }
    
    //read
    function getResearchKeys() public view returns (bytes32[]) {
        return researchKeys;
    }
    
    function getResearchStakers(bytes32 id) public view researchExists(id) returns (address[]) {
        return researches[id].stakers;
    }
    
    function getStake(bytes32 id, address adr) public view researchExists(id) returns (uint) {
        return researches[id].staked[adr];
    }
    
    function getVote(bytes32 id, uint voteIdx, address adr) public view researchExists(id) returns (VotedState) {
        return votes[id][voteIdx].voted[adr];
    }
    
    //write
    function publishResearch(string orcidStr, string paperURL, string title) public payable paidEnough(publishFee) orcidTheSame(orcidStr) {
        bytes32 orcid = keccak256(abi.encodePacked(orcidStr));
        bytes32 id = keccak256(abi.encodePacked(now, orcid, paperURL, blockhash(block.number-1)));
        Research storage res = researches[id];
        
        //somehow it shouldn't overlap
        require(res.researcher == 0x0);
        
        addressToOrcid[msg.sender] = orcid;
        res.researcher = msg.sender;
        res.paperURL = paperURL;
        res.title = title;
        res.id = id;
        res.state = ResearchState.PUBLISHED;
        
        researchKeys.push(id);
    }
    
    function stakeResearch(string orcidStr, bytes32 id) public payable researchExists(id) orcidTheSame(orcidStr) paidEnough(minStake) researchNotLocked(id) {
        bytes32 orcid = keccak256(abi.encodePacked(orcidStr));
        
        Research storage res = researches[id];
        
        addressToOrcid[msg.sender] = orcid;
        
        if(res.staked[msg.sender] == 0) {
            res.stakers.push(msg.sender);
        }
        res.staked[msg.sender] += msg.value;
        res.stakedAmount += msg.value;
    }
    
    //TODO: Withdraw stake
    
    function startReproduce(string orcidStr, bytes32 id) public payable paidEnough(reproduceFee) researchExists(id) researchNotReproducing(id) orcidTheSame(orcidStr) {
        bytes32 orcid = keccak256(abi.encodePacked(orcidStr));
        
        Research storage res = researches[id];
        
        addressToOrcid[msg.sender] = orcid;
        res.reproducer = msg.sender;
        res.state = ResearchState.PENDING;
    }
    
    function submitReproduction(bytes32 id) public researchExists(id) {
        Research storage res = researches[id];
        require(msg.sender == res.reproducer);
        require(res.state == ResearchState.PENDING);
        
        //TODO
    }
    
    function vote(bytes32 id, bool voteFor) public researchExists(id) researchReproducing(id) {
        Research storage res = researches[id];
        
        require(res.state == ResearchState.PENDING);
        
        uint voteIdx;
        
        if(!res.isLocked) { //if there isn't a voting going on
            res.votesLength++;
            votes[id].length = res.votesLength;
        }
        
        voteIdx = res.votesLength-1;
        
        Vote storage voteObj = votes[id][voteIdx];
        
        require(voteObj.voted[msg.sender] == VotedState.NOT_VOTED); // no double voting
        require(!voteObj.completed); // no necro voting
        
        if(!res.isLocked) {
            res.isLocked = true;
            
            voteObj.target = res.stakers.length / 2 + 1; //50% + 1 consensus
        }
        
        if(voteFor) {
            voteObj.votedFor++;
            voteObj.voted[msg.sender] = VotedState.VOTED_FOR;
            
            if(voteObj.votedFor >= voteObj.target) {
                voteObj.completed = true;
                voteObj.result = true;
                
                
                res.state = ResearchState.REPRODUCED;
                _researchReproduced(res);
                //TODO: Event
            }
        } else {
            voteObj.votedAgainst++;
            voteObj.voted[msg.sender] = VotedState.VOTED_AGAINST;
            
            if(voteObj.votedAgainst >= voteObj.target) {
                voteObj.completed = true;
                voteObj.result = false;
                
                res.reproducer = 0x0; //reset to start
                res.reproducedURL = "";
                res.state = ResearchState.PUBLISHED;
                
                res.isLocked = false;
                //TODO: Event
            }
        }
    }
    
    function _researchReproduced(Research storage res) internal {
        uint moneyToSplit = res.stakedAmount;
        uint reproducerGets = moneyToSplit/2;
        uint researcherGets = moneyToSplit - reproducerGets;
        
        _sendMoney(res.researcher, researcherGets);
        _sendMoney(res.reproducer, reproducerGets);
    }
    
    function _sendMoney(address to, uint value) internal {
        to.transfer(value); //TODO: withdraw pattern
    }
}