pragma solidity ^0.4.24;

contract CEngine {
    mapping (address => uint256) public balances;

    constructor(uint256 initialSupply) public {
        balances[msg.sender] = initialSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balances[msg.sender] >= _value, "Not enough tokens");
        require(balances[_to] + _value >= balances[_to], "Value entered is not accepted");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        return true;
    }
}
