import React, { Component } from "react";
import KAICompany from "../../contracts/KAICompany.json";
import CEngineContract from "../../contracts/CEngine.json";
import ETF from "../../contracts/ETF.json";
import getWeb3 from "../../utils/getWeb3";
import truffleContract from "truffle-contract";
import NewCompanyForm from "./NewCompanyForm";
import Panels from "./Panels";
import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";
import "../../App.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      tokens: 0,
      company_list: [],
      isOwner: false,
      rank: 0,
      search: "",
      etf_balance: 0,
      total_etf_balance: 0,
    };

    this.handleSearchValue = this.handleSearchValue.bind(this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.d
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
      console.log(this.state.contract);
    } catch (error) { }
    await this.refreshStates();
    await this.checkOwner();
  };

  // Checks whether the user is the 'admin' of the smart contracts (or isOwner)
  checkOwner = async () => {
    const { accounts, contract } = this.state;
    console.log(contract);
    var owner = await contract.contractOwner.call();
    this.setState({
      isOwner:
        owner.toString().toLowerCase() === accounts[0].toString().toLowerCase()
    });
    console.log(this.state.isOwner);
  };

  // Gets the rank of the user from the smart contracts
  getRank = async () => {
    const { accounts, contract } = this.state;
    var rank = await contract.rankings.call(accounts[0]);
    this.setState({ rank: rank.toNumber() });
  };

  // Gets the current KAI token balance of the user
  getBalance = async () => {
    const { accounts, contract } = this.state;
    var balance = await contract.balances.call(accounts[0]);
    this.setState({ tokens: balance.toNumber() });
  };

  // Function call to smart contract to mint KAI
  handleMintKAI = async amount => {
    const { accounts, contract } = this.state;
    await contract.mint(amount, { from: accounts[0] });
    await this.refreshStates();
  };

  // Function call to smart contract to burn KAI
  handleBurnKAI = async amount => {
    const { accounts, contract } = this.state;
    await contract.burn(amount, { from: accounts[0] });
    await this.refreshStates();
  };

  // Function call to smart contract to change admin
  handleChangeAdmin = async address => {
    const { accounts, contract } = this.state;
    await contract.setAdmin(address, { from: accounts[0] });
    await this.refreshStates();
  };

  // Function call to smart contract to hold a project
  handleHold = async id => {
    const { accounts, contract } = this.state;
    await contract.hold(id, { from: accounts[0] });
    await this.refreshStates();
  };

  // Function call to smart contract to unhold a project
  handleunHold = async id => {
    const { accounts, contract } = this.state;
    await contract.unhold(id, { from: accounts[0] });
    await this.refreshStates();
  };

  // Function call to smart contract to add a team member
  handleAddTeam = async (address, id) => {
    const { accounts, contract } = this.state;
    await contract.addTeam(address, id, { from: accounts[0] });
    await this.refreshStates();
  };

  // Function call to smart contract to change user rank
  handleChangeRank = async (address, level) => {
    const { accounts, contract } = this.state;
    await contract.setRank(address, level, { from: accounts[0] });
    await this.refreshStates();
  };

  // Function call to smart contract to steak KAI tokens from another user
  handleStealKAI = async (address, amount) => {
    const { accounts, contract } = this.state;
    await contract.steal(address, amount, { from: accounts[0] });
    await this.refreshStates();
  };

  // Function call to smart contract to send KAI tokens to another user
  handleSendKAI = async (address, amount) => {
    const { accounts, contract } = this.state;
    await contract.transfer(address, amount, { from: accounts[0] });
    await this.refreshStates();
  };

  // Function call to smart contract to add a company to the pipeline
  handleAddCompany = async (amount, name) => {
    const { accounts, contract } = this.state;
    await contract.addCompany(amount, name, { from: accounts[0] });
    await this.refreshStates();
  };

  // Function call to smart contract to set HOD of a specific project
  handleSetHOD = async (address, id) => {
    const { accounts, contract } = this.state;
    await contract.setHOD(address, id, { from: accounts[0] });
    await this.refreshStates();
  };


  //// User Panel

  // Function call to smart contract to add conviction tokens to ETF vehicle
  handleAddConvictionETF = async (amount) => {
    const { accounts, contract } = this.state;
    await contract.addConvictionETF(amount, { from: accounts[0] });
    await this.refreshStates();
  }

  //// Company Panel

  // Function call to smart contract to add conviction tokens to a project
  handleAddConviction = async (amount, id) => {
    const { accounts, contract } = this.state;
    await contract.addConviction(amount, id, { from: accounts[0] });
    await this.refreshStates();
  };

  // Function call to smart contract to add negative conviction tokens to a project
  handleAddnConviction = async (amount, id) => {
    const { accounts, contract } = this.state;
    await contract.addnConviction(amount, id, { from: accounts[0] });
    await this.refreshStates();
  };


  // Function call to smart contract to handle claim functionality (e.g. distributing tokens at the beginning of the yr)
  handleClaim = async () => {
    const { accounts, contract } = this.state;
    await contract.claim({ from: accounts[0] });
    await this.refreshStates();
  };

  // Function call to smart contract to handle moving the project stage to the next stage
  handleNextStage = async id => {
    const { accounts, contract } = this.state;
    await contract.progressStage(id, { from: accounts[0] });
    await this.refreshStates();
  };



  // Refreshes react state with new backend info
  refreshStates = async () => {
    const { web3, accounts, contract } = this.state;
    if (contract != null || web3 != null || accounts != null) {
      try {
        await this.getCompanies();
        await this.getBalance();
        await this.getRank();
        await this.getETF();
      } catch (e) {
        console.log(e);
      }
    }
  };

  // Refreshes the ETF values
  getETF = async () => {
    const { web3, accounts, contract } = this.state;
    var nres = await contract.etf.call();
    const co = truffleContract(ETF);
    co.setProvider(web3.currentProvider);

    var etfBal = await co.at(nres).convictionList.call(accounts[0]);
    var totaletfBal = await co.at(nres).totalConviction.call();
    this.setState({ etf_balance: etfBal.toNumber(), total_etf_balance: totaletfBal.toNumber() });
  }

  // retreives all company information
  getCompanies = async () => {
    const { web3, accounts, contract } = this.state;
    var res = await contract.listLength.call();
    var companies = [];

    // loops through all companies locally to retrieve needed data.
    // (looping is inefficient on Smart contracts themselves, and is a bad practice to be placed on the smart contracts. Thus this is done on the front-end)
    for (var i = 0; i < res.toNumber(); i++) {
      var nres = await contract.companies.call(i);
      const co = truffleContract(KAICompany);
      co.setProvider(web3.currentProvider);

      // these could be promises instead of async to remove development error warnings
      var id = await co.at(nres).id.call();
      var HOD = await co.at(nres).HOD.call();
      var name = await co.at(nres).name.call();
      var state = await co.at(nres).state.call();
      var onHold = await co.at(nres).onHold.call();
      var isHODSet = await co.at(nres).isHODSet.call();
      var heldState = await co.at(nres).heldState.call();
      var totalConviction = await co.at(nres).totalConviction.call();
      var totalnConviction = await co.at(nres).totalnConviction.call();
      var onTeam = await co.at(nres).teamCheck.call(accounts[0]);
      var onProject = await co.at(nres).onProject.call(accounts[0]);
      var onicTeam = await co.at(nres).icteamCheck.call(accounts[0]);
      var bal = await co.at(nres).convictionList.call(accounts[0]);
      var nbal = await co.at(nres).nconvictionList.call(accounts[0]);

      var item = {
        company_name: web3.utils.toAscii(name),
        company_address: nres,
        investment_stage: web3.utils.hexToNumberString(state),
        user_kai: bal.toNumber(),
        user_nkai: nbal.toNumber(),
        company_id: id.toNumber(),
        on_team: onTeam,
        on_project: onProject,
        total_conviction: totalConviction.toNumber(),
        total_nconviction: totalnConviction.toNumber(),
        on_hold: onHold,
        on_icTeam: onicTeam,
        is_HOD:
          HOD.toString().toLowerCase() === accounts[0].toString().toLowerCase(),
        is_HOD_set: isHODSet,
        state: state.toNumber(),
        hold_state: heldState.toNumber()
      };

      companies.push(item);

    }

    this.setState({ company_list: companies });
  };

  // handles search bar values
  handleSearchValue(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    if (!this.state.web3) {
      return (
        <div className="d-flex justify-content-center">
          <span className="badge m-2 badge-warning">
            Loading Web3, accounts, and contracts...
          </span>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="jumbotron">
          <h2 className="text-center">Hello, {this.state.accounts[0]}</h2>
          <h3 className="text-center">
            You have {this.state.tokens}{" "}
            <img src={require("../../kai.png")} className="kaicoin" />
            &nbsp;KAI Tokens{" "}
            <button className="btn btn-primary" onClick={this.handleClaim}>
              Claim
            </button>
          </h3>
          <h3 className="text-center">
            Your rank is currently at level {this.state.rank}
          </h3>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h1>User Panel</h1>
              <UserPanel onAddConvictionETF={this.handleAddConvictionETF} etfBalance={this.state.etf_balance} totalETFBalance={this.state.total_etf_balance} />
              {!this.state.isOwner ? null : (
                <React.Fragment>
                  <h1>Admin Panel</h1>
                  <NewCompanyForm onAddCompany={this.handleAddCompany} /> <br />
                  <AdminPanel
                    onMintKAI={this.handleMintKAI}
                    onBurnKAI={this.handleBurnKAI}
                    onChangeRank={this.handleChangeRank}
                    onStealKAI={this.handleStealKAI}
                    onSendKAI={this.handleSendKAI}
                    onSetAdmin={this.handleChangeAdmin}
                    onSetHOD={this.handleSetHOD}
                  />
                </React.Fragment>
              )}
            </div>

            <div className="col-sm-6">
              <h1>Companies</h1>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.search}
                  onChange={this.handleSearchValue}
                  placeholder="Search for a company"
                />
              </div>
              <Panels
                companies={this.state.company_list}
                search={this.state.search}
                onNext={this.handleNextStage}
                onAddConviction={this.handleAddConviction}
                onAddTeam={this.handleAddTeam}
                onAddnConviction={this.handleAddnConviction}
                onHold={this.handleHold}
                onunHold={this.handleunHold}
                onSetHOD={this.handleSetHOD}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
