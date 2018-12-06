import React, { Component } from 'react'

export default class SetHOD extends Component {

    constructor(props) {
        super(props);
    
        this.state = {amount: 0, address: ""};
    
        this.handleAmount = this.handleAmount.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAmount(event) {
        this.setState({amount: event.target.value});
    }

    handleAddress(event) {
        this.setState({address: event.target.value});
    }

    handleSubmit(event) {
        this.props.onSetHOD(this.state.address, this.state.amount);
        event.preventDefault();
    }
    
  render() {
    return (
        <React.Fragment>
        <h3>Set Project HOD</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>HOD Address</label>
            <input type="text" onChange={this.handleAmount} className="form-control" id="inputAmount" placeholder="Enter HOD address"/>
          </div>
          <div className="form-group">
            <label>Project Number</label>
            <input type="text" onChange={this.handleAddress}  className="form-control" id="inputAddress" placeholder="Enter project number"/>
          </div>
          <button type="submit" className="btn btn-primary">Steal KAI</button>
        </form>
        </React.Fragment>
    )
    }
}
