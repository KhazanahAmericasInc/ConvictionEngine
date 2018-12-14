import React, { Component } from 'react'

export default class ETF extends Component {
    // The ETF component is the component which shows the user their contribution to the ETF pool
    constructor(props) {
        super(props);

        this.state = { conviction: 0 };

        this.handleKAIAmount = this.handleKAIAmount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleKAIAmount(event) {
        this.setState({ conviction: event.target.value });
    }

    handleSubmit(event) {
        this.props.onAddConvictionETF(this.state.conviction);
        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <h3>Contribute to ETF Pool</h3>
                <p>Total Pool:  &nbsp;
                <span className="badge badge-primary">{this.props.totalETFBalance}</span> KAI</p>
                <p>Current Balance: &nbsp;
                <span className="badge badge-success">{this.props.etfBalance}</span> KAI </p>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Conviction Amount</label>
                        <input
                            type="text"
                            onChange={this.handleKAIAmount}
                            className="form-control"
                            id="inputConvictionAmount"
                            placeholder="Enter amount of KAI to add"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add KAI
              </button>
                </form>
            </React.Fragment>
        );
    }
}
