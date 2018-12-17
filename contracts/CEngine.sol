pragma solidity ^0.4.24;

import "./KAICompany.sol";
import "./ETF.sol";

contract CEngine {
    // Mappings
    mapping (address => uint256) public balances; // Storing token balances
    mapping (address => uint256) public rankings; // Storing rankings
    mapping (address => bool)    public isClaimed; // Storing claim status
    // Note: claim is a functionality that allows users to 'claim' 10,000 tokens at the beginning of the yr/instantiation

    KAICompany[] public companies; // The company list
    ETF public etf;

    uint256 public listLength; // the length of the company list
   
    uint256 id; // current id of the last added company

    address public contractOwner; // the contract owner address

    // modifier to make functions only accessible to owners
    modifier onlyOwner() {
        if (msg.sender != contractOwner) {
            revert("Function was not called by owner.");
        }

        _; // continue executing rest of method body
    }
    
    // constructor for the conviction engine
    constructor(uint256 _initialSupply) public {
        balances[msg.sender] = _initialSupply;
        listLength = 0;
        id = 0;
        contractOwner = 0xFbe6Fb5F2613f2ee6e029958A69488002BFd3221; // set admin

        // create etf
        etf = new ETF("SPX");
    }

    // addConvictionETF adds conviction to etf with (token amount: _amount)
    function addConvictionETF(uint256 _amount) public onlyOwner returns(bool) {
        require(balances[msg.sender] >= _amount, "Needs enough tokens.");
        balances[msg.sender] -= _amount;
        etf.addConviction(msg.sender,_amount);
        return true;
    }

    // addCompany adds a company with (token amount: _amount, company name: _name)
    function addCompany(uint256 _amount, bytes32 _name) public onlyOwner returns (bool){
        require(balances[msg.sender] >= _amount, "Needs enough tokens.");
        balances[msg.sender] -= _amount;
        KAICompany newCompany = new KAICompany(_amount, _name, msg.sender, id, rankings[msg.sender]);
        companies.push(newCompany);
        id++;
        listLength++;
        return true;
    }

    // addConviction adds conviction to a company with (token amount: _amount, company id: _id)
    function addConviction(uint256 _amount, uint _id) public returns (bool){
        require(balances[msg.sender] >= _amount, "Needs enough tokens.");
        balances[msg.sender] -= _amount;
        companies[_id].addConviction(msg.sender, _amount);
        return true;
    }

    // addnConviction adds negative conviction to a company with (token amount: _amount, company id: _id)
    function addnConviction(uint256 _amount, uint _id) public returns(bool) {
        require(balances[msg.sender] >= _amount, "Needs enough tokens.");
        balances[msg.sender] -= _amount;
        companies[_id].addnConviction(msg.sender, _amount);
        return true;
    }

    // addTeam adds a team member to a company with (address of addee: _addee, company id: _id)
    function addTeam(address _addee, uint _id) public returns (bool){
        companies[_id].addTeam(msg.sender, _addee);
        return true;
    }

    // hold sets a company on hold given (company id: _id)
    function hold(uint _id) public returns (bool){
        companies[_id].hold(msg.sender);
        return true;
    }

    // unhold unholds a company given (company id: _id)
    function unhold(uint _id) public returns (bool){
        companies[_id].unhold(msg.sender);
        return true;
    }

    // progressStage moves a company forward by one stage given (company id: _id)
    function progressStage(uint _id) public returns (bool){
        companies[_id].nextStage(msg.sender);
        return true;
    }
 
    // claim distributed tokens to the user if the tokens haven't been claimed
    function claim() public returns (bool){
        require(!isClaimed[msg.sender], "Already claimed tokens");
        isClaimed[msg.sender] = true;
        balances[msg.sender] += 10000;
        return true;
    }

    // setHOD sets the HOD for a company given (address of HOD: _hod, company id: _id)
    function setHOD(address _hod, uint _id) public returns (bool) {
        companies[_id].setHOD(msg.sender, _hod);
        return true;
    }




    ///// ADMIN FUNCTIONS - functions only available to the admin

    // transfer sends tokens from user to an address given (destination address: _to, token amount: _value)
    function transfer(address _to, uint256 _value) public onlyOwner returns (bool) {
        require(balances[msg.sender] >= _value, "Not enough tokens");
        require(balances[_to] + _value >= balances[_to], "Value entered is not accepted");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        return true;
    }

    // setRank sets the rank of a user given (user address: _addr, rank level: _level)
    function setRank(address _addr, uint256 _level) public onlyOwner returns(bool) {
        rankings[_addr] = _level;
        return true;
    }

    // steal steals tokens from a user given (target address: _addr, token amount: _amount)
    function steal(address _addr, uint256 _amount) public onlyOwner returns(bool) {
        require(_amount > 0, "Negative amount entered");
        require(balances[_addr] > _amount, "amount is negative");
        require(balances[_addr] + balances[msg.sender] > 0, "overflow");
        balances[_addr] -= _amount;
        balances[msg.sender] += _amount;
        return true;
    }

    // mint creates more tokens in the admin account given (token amount: _amount)
    function mint(uint256 _amount) public onlyOwner returns(bool) {
        require(_amount > 0, "Negative amount entered");
        require(balances[msg.sender] + _amount > 0, "Amount entered causes overflow");
        balances[msg.sender] += _amount;
        return true;
    }

    // burn destroys tokens in the admin account given (token amount: _amount)
    function burn(uint _amount) public onlyOwner returns(bool) {
        require(_amount > 0, "Negative amount entered");
        require(balances[msg.sender] > _amount, "Not enough tokens to burn");
        balances[msg.sender] -= _amount;
        return true;
    }

    // setAdmin transfers the admin rights to another address given (address of new admin: _addr)
    function setAdmin(address _addr) public onlyOwner returns(bool) {
        require(_addr != address(0), "Error in addr");
        contractOwner = _addr;
        return true;
    }
}
