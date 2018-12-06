import React, { Component } from 'react'

export default class CompanyPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {conviction_level: '', add_mamber: '', HODAddr: ''};

    this.handleConvictionLevel = this.handleConvictionLevel.bind(this);
    this.handleAddMember = this.handleAddMember.bind(this);
    this.handleHODAddr = this.handleHODAddr.bind(this);
  }


  handleConvictionLevel(event) {
    this.setState({conviction_level: event.target.value});
  }

  handleAddMember(event) {
    this.setState({add_member: event.target.value});
  }

  handleHODAddr(event) {
    this.setState({HODAddr: event.target.value});
  }

  validSet(onTeam, isHOD, onicTeam, state){
    return (onTeam && (state == 0 || state == 1 || state == 4 || state == 7))
          || (isHOD && (state == 2))
          || (onicTeam && (state == 3 || state == 5));
  }

  render() {
    const investmentStates = {0: 'BD Approval', 1: 'KAI Approval', 2: 'HOD Approval', 3: 'Intro IC1', 4: 'KAI Approval', 5: 'IC2', 6: 'Awaiting Funds', 7: 'Waiting Exit', 8: 'Exited'};
    const {company, onNext, onAddConviction, onAddTeam, onAddnConviction, onunHold, onHold, onSetHOD} = this.props;
    return (
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
          <h5 className="card-title">#{company.company_id} {company.company_name} &nbsp; </h5>
          <h6 className="card-subtitle mb-2 text-muted">{company.company_address}</h6>
          <p>
            Total KAI: &nbsp; 
            <span className="badge badge-success">+{company.total_conviction}</span> &nbsp;
            <span className="badge badge-danger">-{company.total_nconviction}</span>
          </p>
          </li>
          {company.on_project ? (
          
          <React.Fragment>
            <li className="list-group-item">
            <p className="card-text">Investment Stage: &nbsp;
              <span className="badge badge-primary">
                {company.on_hold ? investmentStates[company.hold_state]:investmentStates[company.investment_stage]}
              </span>
            </p>
            <p className="card-text">Your KAI Invested: &nbsp;
            <span className="badge badge-success">+{company.user_kai}</span> &nbsp;
            <span className="badge badge-danger">-{company.user_nkai}</span>
            {!company.on_hold ? null : (<React.Fragment>(ON HOLD)</React.Fragment>)}</p>
            </li>
            

            
            {!company.on_hold ? ( <React.Fragment>
            <li className="list-group-item">
            <label>Actions Available:</label>
            <div className="form-group">
            {this.validSet(company.on_team, company.is_HOD, company.on_icTeam, company.state) ? 
            (
              <button className="btn btn-primary" onClick={onNext.bind(this,company.company_id)}>Next Stage</button> 
            ): null}
            &nbsp;
              <button className="btn btn-primary" onClick={onHold.bind(this,company.company_id)}>Hold Project</button>
            </div>
            </li>
            

            <li className="list-group-item">
            {this.validSet(company.on_team, company.is_HOD, company.on_icTeam, company.state) ? 
            (<div className="form-group">
              <label htmlFor="inputdefault">Add Conviction:</label>
              <input className="form-control" value={this.state.conviction_level} onChange={this.handleConvictionLevel} id="inputConviction" type="text"/>
              <br/>
              <button className="btn btn-primary" onClick={onAddConviction.bind(this,this.state.conviction_level,company.company_id)}>Add Conviction</button>&nbsp;
              <button className="btn btn-primary" onClick={onAddnConviction.bind(this, this.state.conviction_level, company.company_id)}>Add N-Conviction</button>
            </div>)
            : null}
            </li>


            <li className="list-group-item">
            {company.on_team ? 
            (<React.Fragment>
            <label>Add Team Member:</label>
            <div className="form-inline">
              <input className="form-control" value={this.state.add_member} onChange={this.handleAddMember}/>
              <br/>
              <button className="btn btn-primary" onClick={onAddTeam.bind(this, this.state.add_member, company.company_id)}>Add Team Member</button>
            </div>
            </React.Fragment>):null}
            </li>
          </React.Fragment>) :  <button className="btn btn-primary" onClick={onunHold.bind(this, company.company_id)}>Unhold Project</button>} </React.Fragment> ): 
         null}          
          
        </ul>
      </div>
    )
  }
}
