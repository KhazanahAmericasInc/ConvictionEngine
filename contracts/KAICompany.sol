pragma solidity ^0.4.24;

contract KAICompany {
    // Company name and address of who did BD
    bytes32 public name;
    address public initiator;
    address public contractInitiated;

    // Conviction list for the company
    mapping(address => uint256) public convictionList;

    // BD team
    mapping(address => bool) public teamCheck;
    address[] public teamList;
    uint256 public teamListLength;

    // HOD address
    address public HOD;

    // IC team
    mapping(address => bool) public icteamCheck;
    address[] public icteamList;
    uint256 public icteamListLength;

    // Investment stages
    enum States { ZERO, ONE, TWO, THREE, FOUR, EXIT }
    States public state;

    uint256 public id;

    modifier onlyOwner() {
        if (msg.sender != contractInitiated) {
            revert("Function was not called by owner.");
        }

        _; // continue executing rest of method body
    }

    constructor(uint256 _amount, bytes32 _name, address _from, uint256 _id) public {
        address user = tx.origin;

        contractInitiated = msg.sender;
        initiator = _from;
        name = _name;
        convictionList[user] = _amount;
        state = States.ZERO;
        id = _id;

        // Add user to the team
        teamCheck[user] = true;
        teamList.push(user);
        teamListLength += 1;
    }

    function addTeam(address _adder, address _addee) public onlyOwner {
        require(teamCheck[_adder], "You must be on the team to add people to the team.");
        // User Management
        teamCheck[_addee] = true;
        teamList.push(_addee);
        teamListLength += 1;
    }

    function addConviction(uint256 _amount) public onlyOwner {
        convictionList[tx.origin] += _amount;
    }

    function nextStage(uint256 _rank) public onlyOwner{
        require(uint(state) < uint(States.EXIT), "Company already at exit state.");
        require(_rank > 0, "Undefined rank");

        state = States(uint(state) + 1);
    }

}

