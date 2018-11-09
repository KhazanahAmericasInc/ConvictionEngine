import React, { Component } from 'react'

export default class CompanyPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {conviction_level: ''};

    this.handleConvictionLevel = this.handleConvictionLevel.bind(this);
  }


  handleConvictionLevel(event) {
    this.setState({conviction_level: event.target.value});
  }

  render() {
    const {company, onNext, onAddConviction} = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">#{company.company_id} {company.company_name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{company.company_address}</h6>
          <p className="card-text">Investment Stage: {company.investment_stage}</p>
          <p className="card-text">Your KAI Invested: {company.user_kai}</p>
          <div className="form-group">
            <label htmlFor="inputdefault">Add Conviction:</label>
            <input className="form-control" value={this.state.conviction_level} onChange={this.handleConvictionLevel} id="inputConviction" type="text"/>
            <br/>
            <a className="btn btn-primary" onClick={onAddConviction.bind(this,this.state.conviction_level,company.company_id)}>Add Conviction</a>
            <a className="btn btn-primary" onClick={onNext.bind(this,company.company_id)}>Next Stage</a>
          </div>
        </div>
      </div>
    )
  }
}
