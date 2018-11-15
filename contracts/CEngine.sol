pragma solidity ^0.4.24;

import "./KAICompany.sol";

contract CEngine {
    mapping (address => uint256) public balances;
    mapping (address => bool) public isClaimed;
    KAICompany[] public companies;
    uint256 public listLength;
    uint256 id;

    constructor(uint256 _initialSupply) public {
        balances[msg.sender] = _initialSupply;
        listLength = 0;
        id = 0;
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

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balances[msg.sender] >= _value, "Not enough tokens");
        require(balances[_to] + _value >= balances[_to], "Value entered is not accepted");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        return true;
    }

    function claim() public returns (bool){
        require(!isClaimed[msg.sender], "Already claimed tokens");
        isClaimed[msg.sender] = true;
        balances[msg.sender] += 10000;
        return true;
    }
}
