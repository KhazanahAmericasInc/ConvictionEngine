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
    bool public isHODSet;

    // IC team
    mapping(address => bool) public icteamCheck;
    address[] public icteamList;
    uint256 public icteamListLength;

    // Investment stages
    enum States { ZERO, ONE, TWO, THREE, FOUR, EXIT, HOLD }
    States public state;
    bool public onHold;

    // HOLD state
    States public heldState;

    uint256 public id;

    modifier onlyOwner() {
        if (msg.sender != contractInitiated) {
            revert("Function was not called by owner.");
        }

        _; // continue executing rest of method body
    }

    constructor(uint256 _amount, bytes32 _name, address _from, uint256 _id, uint256 _rank) public {
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
        require(teamCheck[_from] && (uint(state) == 0 || uint(state) == 4),"must be on the team");

        if(teamCheck[_from] && (uint(state) == 0 || uint(state) == 1 || uint(state) == 4)){
            convictionList[_from] += _amount;
            totalConviction += _amount;
        }else if(_from == HOD && uint(state) == 2){
            convictionList[_from] += _amount;
            totalConviction += _amount;
        }else if (icteamCheck[_from] && uint(state) == 3){
            convictionList[_from] += _amount;
            totalConviction += _amount;
        }else{
            revert("undefined rule");
        }
    }

    function addnConviction(address _from, uint256 _amount) public onlyOwner {
        require(teamCheck[_from],"must be on the team");
        nconvictionList[_from] += _amount;
        totalnConviction += _amount;
    }

    function setHOD(address _from, address _hod) public onlyOwner{
        require(!isHODSet && onProject[_from], "HOD already set");
        onProject[_hod] = true;
        HOD = _hod;
        isHODSet = true;
    }

    function unhold(address _from) public onlyOwner {
        require(onProject[_from] && state == States.HOLD, "not on team");
        onHold = false;
        state = States(uint(heldState));
    }

    function hold(address _from) public onlyOwner {
        require(onProject[_from] && state != States.HOLD, "must be on team");
        onHold = true;
        heldState = state;
        state = States.HOLD;
    }

    function nextStage(uint256 _rank) public onlyOwner{
        require(uint(state) < uint(States.EXIT), "Company already at exit state.");
        require(_rank > 0, "Undefined rank");

        state = States(uint(state) + 1);
    }
}

