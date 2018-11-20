pragma solidity ^0.4.24;

import "./KAICompany.sol";

contract CEngine {
    mapping (address => uint256) public balances;
    mapping (address => uint256) public rankings;
    mapping (address => bool)    public isClaimed;

    KAICompany[] public companies;

    uint256 public listLength;
    uint256 id;

    address contractOwner;

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
        contractOwner = msg.sender;
    }

    function addCompany(uint256 _amount, bytes32 _name) public returns (bool){
        require(balances[msg.sender] >= _amount, "Needs enough tokens.");
        balances[msg.sender] -= _amount;
        KAICompany newCompany = new KAICompany(_amount, _name, msg.sender, id);
        companies.push(newCompany);
        id++;
        listLength++;
        return true;
    }

    function addConviction(uint256 _amount, uint _id) public returns (bool){
        require(balances[msg.sender] >= _amount, "Needs enough tokens.");
        balances[msg.sender] -= _amount;
        companies[_id].addConviction(_amount);
        return true;
    }

    function progressStage(uint _id) public returns (bool){
        companies[_id].nextStage();
        return true;
    }

    function claim() public returns (bool){
        require(!isClaimed[msg.sender], "Already claimed tokens");
        isClaimed[msg.sender] = true;
        balances[msg.sender] += 10000;
        return true;
    }

    // ADMIN FUNCTIONS

    function send(address _to, uint256 _value) public onlyOwner returns (bool) {
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
}
