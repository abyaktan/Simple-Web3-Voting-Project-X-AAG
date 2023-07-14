// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Ballot {
        string name;
        string[] options;
        mapping(string => uint256) votes;
        bool isClosed;
    }

    mapping(uint256 => Ballot) public ballots;
    uint256 public ballotCount;

    event BallotCreated(uint256 indexed ballotId, string name, string[] options);
    event VoteCasted(uint256 indexed ballotId, string option, address voter);
    event BallotClosed(uint256 indexed ballotId);

    modifier onlyValidBallot(uint256 _ballotId) {
        require(_ballotId <= ballotCount, "Invalid ballot ID");
        _;
    }

    modifier onlyOpenBallot(uint256 _ballotId) {
        require(!ballots[_ballotId].isClosed, "Ballot is closed");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    address private owner;

    constructor() {
        owner = msg.sender;
    }

    function createBallot() external onlyOwner {
        string memory name = "Presidential Election";
        string[] memory options = new string[](3);
        options[0] = "Anies Baswedan";
        options[1] = "Prabowo Subianto";
        options[2] = "Aldi Taher";

        ballotCount++;
        Ballot storage ballot = ballots[ballotCount];
        ballot.name = name;
        ballot.options = options;
        ballot.isClosed = false;

        emit BallotCreated(ballotCount, name, options);
    }

    function castVote(uint256 _ballotId, string memory _option) external onlyValidBallot(_ballotId) onlyOpenBallot(_ballotId) {
        Ballot storage ballot = ballots[_ballotId];
        require(isOptionValid(ballot, _option), "Invalid option");

        ballot.votes[_option]++;
        emit VoteCasted(_ballotId, _option, msg.sender);
    }

    function closeBallot(uint256 _ballotId) external onlyValidBallot(_ballotId) onlyOpenBallot(_ballotId) onlyOwner {
        ballots[_ballotId].isClosed = true;
        emit BallotClosed(_ballotId);
    }

    function getBallotOptions(uint256 _ballotId) external view onlyValidBallot(_ballotId) returns (string[] memory) {
        return ballots[_ballotId].options;
    }

    function getVoteCount(uint256 _ballotId, string memory _option) external view onlyValidBallot(_ballotId) returns (uint256) {
        return ballots[_ballotId].votes[_option];
    }

    function isOptionValid(Ballot storage _ballot, string memory _option) private view returns (bool) {
        for (uint256 i = 0; i < _ballot.options.length; i++) {
            if (keccak256(bytes(_ballot.options[i])) == keccak256(bytes(_option))) {
                return true;
            }
        }
        return false;
    }
}
