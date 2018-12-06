import React, { Component } from "react";

export default class NewCompanyForm extends Component {
  // NewCompanyForm is the component which allows the creation of new companies by the admin.

  constructor(props) {
    super(props);

    this.state = { company_name: "" };

    this.handleCompanyName = this.handleCompanyName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCompanyName(event) {
    this.setState({ company_name: event.target.value });
  }

  handleSubmit(event) {
    this.props.onAddCompany(0, this.state.company_name);
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
              <input
                type="text"
                value={this.state.company_name}
                onChange={this.handleCompanyName}
                className="form-control"
                id="inputCompanyName"
                placeholder="Enter Company Name"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
