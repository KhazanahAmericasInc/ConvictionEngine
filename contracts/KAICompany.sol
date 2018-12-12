pragma solidity ^0.4.24;

contract KAICompany {
    // Company name and address of who did BD
    bytes32 public name;
    address public initiator;

    // link back to the address of CEngine
    address public contractInitiated;

    // mapping of addresses to booleans that holds true if a user is on IC, HOD or on bd team
    mapping(address => bool) public onProject;

    // Conviction list for the company
    mapping(address => uint256) public convictionList;
    uint256 public totalConviction; // total cumulative amount

    // Negative Conviction List for the company
    mapping(address => uint256) public nconvictionList;
    uint256 public totalnConviction; // total cumulative amount

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
    enum States { ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EXIT, HOLD }
    States public state;
    bool public onHold;

    // HOLD state (holds previous state when company goes on hold)
    States public heldState;

    // project ID
    uint256 public id;

    // modifier to make functions only accessible to owners
    modifier onlyOwner() {
        if (msg.sender != contractInitiated) {
            revert("Function was not called by owner.");
        }

        _; // continue executing rest of method body
    }

    // Constructor and variable init + assignment
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

    // addTeam adds a team member (uses map to check whether a member is on the team or not) given (address of sender: _adder, address of addee: _addee)
    function addTeam(address _adder, address _addee) public onlyOwner {
        require(teamCheck[_adder], "You must be on the team to add people to the team.");
        onProject[_addee] = true;
        // User Management
        teamCheck[_addee] = true;
        teamList.push(_addee);
        teamListLength += 1;
    }

    // addConviction adds conviction amount with possible state restrictions given (address of sender: _from, token amount: _amount)
    function addConviction(address _from, uint256 _amount) public onlyOwner {
        if(teamCheck[_from] && (uint(state) == 0 || uint(state) == 1 || uint(state) == 4 || uint(state) == 6)){
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

    // addnConviction adds negative conviction amount with possible state restrictions given (address of sender: _from, token amount: _amount)
    function addnConviction(address _from, uint256 _amount) public onlyOwner {
        if(teamCheck[_from] && (uint(state) == 0 || uint(state) == 1 || uint(state) == 4 || uint(state) == 6)){
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

    // setHOD sets HOD status to an address for the project given (address of sender: _from, address of hod: _hod)
    function setHOD(address _from, address _hod) public onlyOwner{
        require(!isHODSet && onProject[_from], "HOD already set");
        onProject[_hod] = true;
        HOD = _hod;
        isHODSet = true;
    }

    // unhold unholds a project from the hold state given (address of sender: _from)
    function unhold(address _from) public onlyOwner {
        require(onProject[_from] && state == States.HOLD, "not on team");
        onHold = false;
        state = States(uint(heldState));
    }

    // hold holds a project from an investment state given (address of sender: _from)
    function hold(address _from) public onlyOwner {
        require(onProject[_from] && state != States.HOLD, "must be on team");
        onHold = true;
        heldState = state;
        state = States.HOLD;
    }

    // nextStage progresses the stage given state restrictions (address of sender: _from)
    function nextStage(address _from) public onlyOwner{
        require(uint(state) < uint(States.EXIT), "Company already at exit state.");
        
        if(teamCheck[_from] && (uint(state) == 0 || uint(state) == 1 || uint(state) == 4 || uint(state) == 7)){
            state = States(uint(state) + 1);
        }else if(_from == HOD && uint(state) == 2) {
            state = States(uint(state) + 1);
        }else if(icteamCheck[_from] && uint(state) == 3) {
            state = States(uint(state) + 1);
        }else{
            revert("undefined rule");
        }
    }
}

