import React, { Component } from "react";

export default class Mint extends Component {
  // Mint is the KAI token burn controls for the admin

  constructor(props) {
    super(props);

    this.state = { mint_kai: 0 };

    this.handleKAIAmount = this.handleKAIAmount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleKAIAmount(event) {
    this.setState({ mint_kai: event.target.value });
  }

  handleSubmit(event) {
    this.props.onMintKAI(this.state.mint_kai);
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <h3>Mint KAI Tokens</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Mint Amount</label>
            <input
              type="text"
              onChange={this.handleKAIAmount}
              className="form-control"
              id="intputMintLevel"
              placeholder="Enter amount of KAI to mint"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Mint KAI
          </button>
        </form>
      </React.Fragment>
    );
  }
}
