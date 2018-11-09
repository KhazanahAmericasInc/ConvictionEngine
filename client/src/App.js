import React, { Component } from "react";
import KAICompany from "./contracts/KAICompany.json";
import CEngineContract from "./contracts/CEngine.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";
import NewCompanyForm from "./components/NewCompanyForm";
import Panels from "./components/Panels";
import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null, tokens: 0, company_list: [] };

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
    this.getCompanies();
  };

  getBalance = async () => {
    const { accounts, contract } = this.state;
    var balance = await contract.balances.call(accounts[0]);
    this.setState({tokens: balance.toNumber()});
  };

  handleAddCompany = async (amount, name) => {
    const { accounts, contract } = this.state;
    await contract.addCompany(amount ,name, {from: accounts[0]});
    this.getBalance();
    this.getCompanies();
  }

  handleAddConviction = async(amount, id) => {
    const {accounts, contract} = this.state;
    await contract.addConviction(amount, id, {from: accounts[0]});
    this.getBalance();
    this.getCompanies();
  }

  handleNextStage = async(id) => {
    const {accounts, contract} = this.state;
    await contract.progressStage(id, {from: accounts[0]});
    this.getCompanies();
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
        <h3 className="text-center">You have {this.state.tokens} KAI.</h3>
        </div>
        <div className="container">
        <div className="row">
        <div className="col-sm">
          <NewCompanyForm onAddCompany={this.handleAddCompany} />
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
