pragma solidity ^0.4.24;


contract ETF {
    // CEngine address
    address public contractInitiated;

    // ETF/Index Name
    bytes32 public name;

    // ETF Pool conviction
    mapping(address => uint256) public convictionList;
    uint256 public totalConviction;

    // modifier to make functions only accessible to owners
    modifier onlyOwner() {
        if (msg.sender != contractInitiated) {
            revert("Function was not called by owner.");
        }

        _; // continue executing rest of method body
    }

    constructor(bytes32 _name) public {
        contractInitiated = msg.sender;
        name = _name;
    }

     // addConviction adds conviction amount with possible state restrictions given (address of sender: _from, token amount: _amount)
    function addConviction(address _from, uint256 _amount) public onlyOwner returns (bool){
        convictionList[_from] += _amount;
        totalConviction += _amount;
        return true;
    }

}
