import React, { Component } from 'react'

export default class Burn extends Component {

    constructor(props) {
        super(props);
    
        this.state = {burn_kai: 0};
    
        this.handleKAIAmount = this.handleKAIAmount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleKAIAmount(event) {
        this.setState({burn_kai: event.target.value});
    }

    handleSubmit(event) {
        this.props.onBurnKAI(this.state.burn_kai);
        event.preventDefault();
    }
    
  render() {
    return (
        <React.Fragment>
        <h3>Burn KAI Tokens</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Burn Amount</label>
            <input type="text" onChange={this.handleKAIAmount}  className="form-control" id="intputBurnLevel" placeholder="Enter amount of KAI to burn"/>
          </div>
          <button type="submit" className="btn btn-primary">Burn KAI</button>
        </form>
        </React.Fragment>
    )
  }
}
