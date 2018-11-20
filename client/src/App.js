import React, { Component } from "react";
import KAICompany from "./contracts/KAICompany.json";
import CEngineContract from "./contracts/CEngine.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";
import NewCompanyForm from "./components/NewCompanyForm";
import Panels from "./components/Panels";
import AdminPanel from "./components/AdminPanel";
import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null, tokens: 0, company_list: [], isOwner: false, rank: 0};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      //const Contract = truffleContract(SimpleStorageContract);
      const CEngine = truffleContract(CEngineContract);
      //Contract.setProvider(web3.currentProvider);
      CEngine.setProvider(web3.currentProvider);
      //const instance = await Contract.deployed();
      const CEInstance = await CEngine.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: CEInstance }, this.getBalance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
    this.refreshStates();
    this.checkOwner();
  };

  checkOwner = async () => {
    const {accounts, contract} = this.state;
    var owner = await contract.contractOwner.call();
    console.log(owner);
    this.setState({isOwner: (owner.toString().toLowerCase() === accounts[0].toString().toLowerCase() ? true : false)});
  };

  getRank = async () => {
    const {accounts, contract} = this.state;
    var rank = await contract.rankings.call(accounts[0]);
    this.setState({rank: rank.toNumber()});
  }

  getBalance = async () => {
    const { accounts, contract } = this.state;
    var balance = await contract.balances.call(accounts[0]);
    this.setState({tokens: balance.toNumber()});
  };

  handleMintKAI = async(amount) => {
    const {accounts, contract} = this.state;
    await contract.mint(amount, {from: accounts[0]});
    this.refreshStates();
  }

  handleBurnKAI = async(amount) => {
    const {accounts, contract} = this.state;
    await contract.burn(amount, {from: accounts[0]});
    this.refreshStates();
  }

  handleChangeAdmin = async(address) => {
    const {accounts, contract} = this.state;
    await contract.setAdmin(address, {from: accounts[0]});
    this.refreshStates();
  }

  handleChangeRank = async(address, level) => {
    const {accounts, contract} = this.state;
    await contract.setRank(address, level, {from: accounts[0]});
    this.refreshStates();
  }

  handleStealKAI = async(address, amount) => {
    const {accounts, contract} = this.state;
    console.log(address);
    console.log(amount);
    await contract.steal(address, amount, {from: accounts[0]});
    this.refreshStates();
  }

  handleSendKAI = async(address, amount) => {
    const {accounts, contract} = this.state;
    await contract.transfer(address, amount, {from: accounts[0]});
    this.refreshStates();
  }

  handleAddCompany = async (amount, name) => {
    const { accounts, contract } = this.state;
    await contract.addCompany(amount, name, {from: accounts[0]});
    this.refreshStates();
  }

  handleAddConviction = async(amount, id) => {
    const {accounts, contract} = this.state;
    await contract.addConviction(amount, id, {from: accounts[0]});
    this.refreshStates();
  }

  handleClaim = async() => {
    const {accounts, contract} = this.state;
    await contract.claim({from: accounts[0]});
    this.refreshStates();
  }

  handleNextStage = async(id) => {
    const {accounts, contract} = this.state;
    await contract.progressStage(id, {from: accounts[0]});
    this.refreshStates();
  }

  refreshStates = async() => {
    this.getCompanies();
    this.getBalance();
    this.getRank();
  }

  getCompanies = async () => {
    const {web3, accounts, contract} = this.state;
    var res = await contract.listLength.call();

    var companies = [];

    for(var i = 0; i < res.toNumber(); i++){
      var nres = await contract.companies.call(i);
      const co = truffleContract(KAICompany);
      co.setProvider(web3.currentProvider);
      var name = await co.at(nres).name.call();
      var state = await co.at(nres).state.call();
      var bal = await co.at(nres).convictionList.call(accounts[0]);
      var id = await co.at(nres).id.call();


      var item = {
        company_name: web3.utils.toAscii(name),
        company_address: nres, 
        investment_stage: web3.utils.hexToNumberString(state),
        user_kai: bal.toNumber(),
        company_id: id.toNumber(),
      };

      companies.push(item);
    }

    this.setState({company_list: companies})
  }


  render() {
    if (!this.state.web3) {
      return <div className="d-flex justify-content-center">
        <span className="badge m-2 badge-warning">Loading Web3, accounts, and contracts...</span>
      </div>;
    }
    return (
      <React.Fragment>
        <div className="jumbotron">
          <h2 className="text-center">Hello, {this.state.accounts[0]}</h2>
          <h3 className="text-center">You have {this.state.tokens} KAI. <button className="btn btn-primary" onClick={this.handleClaim}>Claim</button></h3>
          <h3 className="text-center">Your rank is currently at level {this.state.rank}</h3>
        </div>
        <div className="container">
        <div className="row">
        <div className="col-sm">
          <h1>User Panel</h1>
          {!this.state.isOwner ? 
          (<NewCompanyForm onAddCompany={this.handleAddCompany} />) : 
          (<React.Fragment>
            <NewCompanyForm onAddCompany={this.handleAddCompany} />
            <br/>
            <h1>Admin Panel</h1>
            <AdminPanel 
            onMintKAI={this.handleMintKAI} 
            onBurnKAI={this.handleBurnKAI} 
            onChangeRank={this.handleChangeRank} 
            onStealKAI={this.handleStealKAI} 
            onSendKAI={this.handleSendKAI}
            onSetAdmin={this.handleChangeAdmin}/>
          </React.Fragment>)}

        </div>
        <div className="col-sm-6">
          <Panels companies={this.state.company_list} onNext={this.handleNextStage} onAddConviction={this.handleAddConviction}/>
        </div>
        </div>
          
        </div>
      </React.Fragment>
      
    );
  }
}

export default App;
