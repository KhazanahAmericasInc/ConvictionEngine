pragma solidity ^0.4.24;

contract KAICompany {
    // Company name and address of who did BD
    bytes32 public name;
    address public initiator;
    address public contractInitiated;

    mapping(address => bool) public onProject;

    // Conviction list for the company
    mapping(address => uint256) public convictionList;
    uint256 public totalConviction;

    // Negative Conviction List for the company
    mapping(address => uint256) public nconvictionList;
    uint256 public totalnConviction;

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

        contractInitiated = msg.sender;
        initiator = _from;
        name = _name;
        convictionList[_from] = _amount;
        totalConviction = _amount;
        state = States.ZERO;
        id = _id;

        // Add user to the project
        onProject[_from] = true;

        // Add user to the team
        teamCheck[_from] = true;
        teamList.push(_from);
        teamListLength += 1;
    }

    function addTeam(address _adder, address _addee) public onlyOwner {
        require(teamCheck[_adder], "You must be on the team to add people to the team.");
        onProject[_addee] = true;
        // User Management
        teamCheck[_addee] = true;
        teamList.push(_addee);
        teamListLength += 1;
    }

    function addConviction(address _from, uint256 _amount) public onlyOwner {
        require(teamCheck[_from],"must be on the team");
        convictionList[_from] += _amount;
        totalConviction += _amount;
    }

    function addnConviction(address _from, uint256 _amount) public onlyOwner {
        require(teamCheck[_from],"must be on the team");
        nconvictionList[_from] += _amount;
        totalnConviction += _amount;
    }

    function nextStage(uint256 _rank) public onlyOwner{
        require(uint(state) < uint(States.EXIT), "Company already at exit state.");
        require(_rank > 0, "Undefined rank");

        state = States(uint(state) + 1);
    }
}

