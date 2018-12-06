import React, { Component } from "react";

export default class Steal extends Component {
  // Steal is the admin panel component to steal KAI tokens from a user

  constructor(props) {
    super(props);

    this.state = { amount: 0, address: "" };

    this.handleAmount = this.handleAmount.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAmount(event) {
    this.setState({ amount: event.target.value });
  }

  handleAddress(event) {
    this.setState({ address: event.target.value });
  }

  handleSubmit(event) {
    this.props.onStealKAI(this.state.address, this.state.amount);
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <h3>Steal KAI Tokens</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              onChange={this.handleAddress}
              className="form-control"
              id="inputAddress"
              placeholder="Enter address"
            />
          </div>
          <div className="form-group">
            <label>Steal Amount</label>
            <input
              type="text"
              onChange={this.handleAmount}
              className="form-control"
              id="inputAmount"
              placeholder="Enter amount of KAI to steal"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Steal KAI
          </button>
        </form>
      </React.Fragment>
    );
  }
}
