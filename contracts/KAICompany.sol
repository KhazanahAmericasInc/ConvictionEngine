pragma solidity ^0.4.24;

contract KAICompany {
    // Company name and address of who did BD
    bytes32 public name;
    address public initiator;
    address public contractInitiated;

    // Conviction list for the company
    mapping(address => uint256) public convictionList;

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
        convictionList[tx.origin] = _amount;
        state = States.ZERO;
        id = _id;
    }

    function addConviction(uint256 _amount) public onlyOwner {
        convictionList[tx.origin] += _amount;
    }

    function nextStage() public onlyOwner{
        require(uint(state) < uint(States.EXIT), "Company already at exit state.");
        state = States(uint(state) + 1);
    }

}

