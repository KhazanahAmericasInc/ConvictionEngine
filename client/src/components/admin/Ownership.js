import React, { Component } from 'react'

export default class Ownership extends Component {

    constructor(props) {
        super(props);
    
        this.state = {address: ""};
    
        this.handleAddress = this.handleAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAddress(event) {
        this.setState({address: event.target.value});
    }

    handleSubmit(event) {
        this.props.onSetAdmin(this.state.address);
        event.preventDefault();
    }
    
  render() {
    return (
        <React.Fragment>
        <h3>Transfer Admin Rights</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Address</label>
            <input type="text" onChange={this.handleAddress}  className="form-control" id="intputMintLevel" placeholder="Enter new admin address"/>
          </div>
          <button type="submit" className="btn btn-primary">Change Admin</button>
        </form>
        </React.Fragment>
    )
  }
}
