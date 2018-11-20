import React, { Component } from 'react'

export default class NewCompanyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {company_name: '', conviction_level: ''};

    this.handleConvictionLevel = this.handleConvictionLevel.bind(this);
    this.handleCompanyName = this.handleCompanyName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  handleConvictionLevel(event) {
    this.setState({conviction_level: event.target.value});
  }

  handleCompanyName(event) {
    this.setState({company_name: event.target.value});
  }

  handleSubmit(event) {
    this.props.onAddCompany(this.state.conviction_level,this.state.company_name);
    event.preventDefault();
  }

  render() {
    return (
      <div className="row">
         <div className="col-md-12">
         <h3>Add Company</h3>
         <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="company-name">Company Name</label>
            <input type="text" value={this.state.company_name} onChange={this.handleCompanyName} className="form-control" id="inputCompanyName" placeholder="Enter Company Name"/>
          </div>
          <div className="form-group">
            <label htmlFor="company-name">Conviction Amount</label>
            <input type="text" value={this.state.conviction_level} onChange={this.handleConvictionLevel} className="form-control" id="inputConvictionLevel" placeholder="Enter amount of KAI"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
      </div>
    )
  }
}
