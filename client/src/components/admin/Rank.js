import React, { Component } from 'react'

export default class Rank extends Component {

    constructor(props) {
        super(props);
    
        this.state = {rank_level: 0, address: ""};
    
        this.handleRankAmount = this.handleRankAmount.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRankAmount(event) {
        this.setState({rank_level: event.target.value});
    }

    handleAddress(event) {
        this.setState({address: event.target.value});
    }

    handleSubmit(event) {
        this.props.onChangeRank(this.state.address, this.state.rank_level);
        event.preventDefault();
    }
    
  render() {
    return (
        <React.Fragment>
        <h3>Change Rank</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Address</label>
            <input type="text" value={this.state.address} onChange={this.handleAddress}  className="form-control" id="inputAddress" placeholder="Enter address"/>
          </div>
          <div className="form-group">
            <label>Rank Level</label>
            <input type="text" value={this.state.level} onChange={this.handleRankAmount} className="form-control" id="inputRankLevel" placeholder="Enter rank level"/>
          </div>
          <button type="submit" className="btn btn-primary">Change Rank</button>
        </form>
        </React.Fragment>
    )
  }
}
