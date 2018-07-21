pragma solidity 0.4.24;

contract Science {
    event Registration(address indexed user, string orcid);
    event ResearchPublished(bytes32 indexed id, address indexed researcher);
    event Staked(address indexed staker, bytes32 indexed id, uint amount);
    event StartReproduce(address indexed reproducer, bytes32 indexed id);
    event SubmitReproduction(address indexed reproducer, bytes32 indexed id);
    event Voted(address indexed voter, bool voteFor, bytes32 indexed id, uint voteIdx);
    event VoteCompleted(bool result, bytes32 indexed id, uint voteIdx);

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
    
    mapping (address => string) public addressToOrcid;
    
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
    
    modifier isRegistered() {
        require(bytes(addressToOrcid[msg.sender]).length != 0);
        _;
    }
       
    constructor () public payable {
        //...
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
    
    function getMyOrcid() public view isRegistered() returns(string) {
        return addressToOrcid[msg.sender];
    }

    //write
    function register(string orcid) public {
        require(bytes(addressToOrcid[msg.sender]).length == 0);
        addressToOrcid[msg.sender] = orcid;

        emit Registration(msg.sender, orcid);
    }
    
    function publishResearch(string paperURL, string title) public payable paidEnough(publishFee) isRegistered() {
        bytes32 id = keccak256(abi.encodePacked(now, paperURL, blockhash(block.number-1)));
        Research storage res = researches[id];
        
        //somehow it shouldn't overlap
        require(res.researcher == 0x0);
        
        res.researcher = msg.sender;
        res.paperURL = paperURL;
        res.title = title;
        res.id = id;
        res.state = ResearchState.PUBLISHED;
        
        researchKeys.push(id);

        emit ResearchPublished(id, msg.sender);
    }
    
    function stakeResearch(bytes32 id) public payable researchExists(id) isRegistered() paidEnough(minStake) researchNotLocked(id) {
        
        Research storage res = researches[id];
        
        if(res.staked[msg.sender] == 0) {
            res.stakers.push(msg.sender);
        }
        res.staked[msg.sender] += msg.value;
        res.stakedAmount += msg.value;

        emit Staked(msg.sender, id, msg.value);
    }
    
    //TODO: Withdraw stake
    
    function startReproduce(bytes32 id) public payable paidEnough(reproduceFee) researchExists(id) researchNotReproducing(id) isRegistered() {
        Research storage res = researches[id];
        
        res.reproducer = msg.sender;
        res.state = ResearchState.PENDING;

        emit StartReproduce(msg.sender, id);
    }
    
    function submitReproduction(bytes32 id, string reproducedURL) public researchExists(id) isRegistered() {
        Research storage res = researches[id];
        require(msg.sender == res.reproducer);
        require(res.state == ResearchState.PENDING);
        
        res.reproducedURL = reproducedURL;

        emit SubmitReproduction(msg.sender, id);
    }
    
    function vote(bytes32 id, bool voteFor) public researchExists(id) isRegistered() researchReproducing(id) {
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
        
        emit Voted(msg.sender, voteFor, id, voteIdx);

        if(voteFor) {
            voteObj.votedFor++;
            voteObj.voted[msg.sender] = VotedState.VOTED_FOR;
            
            if(voteObj.votedFor >= voteObj.target) {
                voteObj.completed = true;
                voteObj.result = true;
                
                
                res.state = ResearchState.REPRODUCED;
                _researchReproduced(res);

                emit VoteCompleted(true, id, voteIdx);
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

                emit VoteCompleted(false, id, voteIdx);
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
    
    //TODO: Owner withdraw?
}