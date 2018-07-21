contract Science {
    enum ResearchState {PUBLISHED, PENDING, REPRODUCED}
    
    struct Vote {
        uint votedFor;
        uint votedAgainst;
        uint target;
        bool result;
        
        mapping(address => bool) voters;
    }
    
    struct Research {
        address researcher;
        string paperURL;
        bytes32 checksum;
        
        uint stakedAmount;
        mapping(address => uint) staked;
        address[] stakers;
        
        Vote[] votes;
        bool isLocked;
        
        address reproducer;
        string reproducedURL;
        
        ResearchState state;
    }
    
    mapping (address => string) public addressToOrcid;
    
    mapping (bytes32 => Research) researches;
    bytes32[] researchKeys;
}
