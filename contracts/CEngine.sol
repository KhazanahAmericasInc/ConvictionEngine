pragma solidity ^0.4.24;

import "./KAICompany.sol";

contract CEngine {
    mapping (address => uint256) public balances;
    mapping (address => uint256) public rankings;
    mapping (address => bool)    public isClaimed;

    KAICompany[] public companies;

    uint256 public listLength;
    uint256 id;

    address public contractOwner;

    modifier onlyOwner() {
        if (msg.sender != contractOwner) {
            revert("Function was not called by owner.");
        }

        _; // continue executing rest of method body
    }

    constructor(uint256 _initialSupply) public {
        balances[msg.sender] = _initialSupply;
        listLength = 0;
        id = 0;
        contractOwner = 0xFbe6Fb5F2613f2ee6e029958A69488002BFd3221;
    }

    function addCompany(uint256 _amount, bytes32 _name) public onlyOwner returns (bool){
        require(balances[msg.sender] >= _amount, "Needs enough tokens.");
        balances[msg.sender] -= _amount;
        KAICompany newCompany = new KAICompany(_amount, _name, msg.sender, id, rankings[msg.sender]);
        companies.push(newCompany);
        id++;
        listLength++;
        return true;
    }

    function addConviction(uint256 _amount, uint _id) public returns (bool){
        require(balances[msg.sender] >= _amount, "Needs enough tokens.");
        balances[msg.sender] -= _amount;
        companies[_id].addConviction(msg.sender, _amount);
        return true;
    }

    function addnConviction(uint256 _amount, uint _id) public returns(bool) {
        require(balances[msg.sender] >= _amount, "Needs enough tokens.");
        balances[msg.sender] -= _amount;
        companies[_id].addnConviction(msg.sender, _amount);
        return true;
    }

    function addTeam(address _addee, uint _id) public returns (bool){
        companies[_id].addTeam(msg.sender, _addee);
        return true;
    }

    function hold(uint _id) public returns (bool){
        companies[_id].hold(msg.sender);
        return true;
    }

    function unhold(uint _id) public returns (bool){
        companies[_id].unhold(msg.sender);
        return true;
    }

    function progressStage(uint _id) public returns (bool){
        companies[_id].nextStage(rankings[msg.sender]);
        return true;
    }
 
    function claim() public returns (bool){
        require(!isClaimed[msg.sender], "Already claimed tokens");
        isClaimed[msg.sender] = true;
        balances[msg.sender] += 10000;
        return true;
    }

    function setHOD(address _hod, uint _id) public returns (bool) {
        companies[_id].setHOD(msg.sender, _hod);
        return true;
    }

    // ADMIN FUNCTIONS

    function transfer(address _to, uint256 _value) public onlyOwner returns (bool) {
        require(balances[msg.sender] >= _value, "Not enough tokens");
        require(balances[_to] + _value >= balances[_to], "Value entered is not accepted");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        return true;
    }

    function setRank(address _addr, uint256 _level) public onlyOwner returns(bool) {
        rankings[_addr] = _level;
        return true;
    }

    function steal(address _addr, uint256 _amount) public onlyOwner returns(bool) {
        require(_amount > 0, "Negative amount entered");
        require(balances[_addr] > _amount, "amount is negative");
        require(balances[_addr] + balances[msg.sender] > 0, "overflow");
        balances[_addr] -= _amount;
        balances[msg.sender] += _amount;
        return true;
    }

    function mint(uint256 _amount) public onlyOwner returns(bool) {
        require(_amount > 0, "Negative amount entered");
        require(balances[msg.sender] + _amount > 0, "Amount entered causes overflow");
        balances[msg.sender] += _amount;
        return true;
    }

    function burn(uint _amount) public onlyOwner returns(bool) {
        require(_amount > 0, "Negative amount entered");
        require(balances[msg.sender] > _amount, "Not enough tokens to burn");
        balances[msg.sender] -= _amount;
        return true;
    }

    function setAdmin(address _addr) public onlyOwner returns(bool) {
        require(_addr != address(0), "Error in addr");
        contractOwner = _addr;
        return true;
    }
}
