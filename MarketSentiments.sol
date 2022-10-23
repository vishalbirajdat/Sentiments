// SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.8.0 < 0.9.0;

contract MarketSentiments{
    address public owner;
    bool public setOnlyOneUser;
    string[] public coinsArray;

    event CoinDetails(
        string indexed coin,
        address indexed user,
        uint256 up,
        uint256 down
    );


    struct VoterDetails {
        bool exist;
        uint256 up;
        uint256 down;
        mapping(address=>uint256) VoterCounts;
    }


    mapping(string => VoterDetails) public VoteCoin;


    constructor(){
        owner = msg.sender;
        setOnlyOneUser = false;
    }

    modifier ownerRequire(){
        require(msg.sender == owner);
        _;
    }



    function setCoin(string memory _coin) public ownerRequire{
        // only one created in storage
        VoterDetails storage newVoterDetails = VoteCoin[_coin];
        newVoterDetails.exist = true;
        coinsArray.push(_coin);
    }


    function getCoinUpDown(string memory _coin) public view returns(uint256, uint256){
        return (VoteCoin[_coin].up, VoteCoin[_coin].down);
    }



    function setOnlyOneVoter() public ownerRequire{
        setOnlyOneUser = true;
    }


    function setVote(string memory _coin, uint _updown) public returns(uint256, uint256) {

        VoterDetails storage oldVoterDetails = VoteCoin[_coin];

        require(oldVoterDetails.exist == true, "Something is missing or this coin is deleted");
        require(_updown == 1 || _updown == 0, "something is missing, Don't try to hack");
        
        if(setOnlyOneUser){
            require(oldVoterDetails.VoterCounts[msg.sender] < 1, "You have already voted this coin Please vote other coins");
        }

        if (_updown == 0){
            oldVoterDetails.down++;
            emit CoinDetails(_coin,msg.sender,0,1);
        }else{
            oldVoterDetails.up++;
            emit CoinDetails(_coin,msg.sender,1,0);
        }


        oldVoterDetails.VoterCounts[msg.sender]++;

        return ( oldVoterDetails.up,  oldVoterDetails.down);
    }



}