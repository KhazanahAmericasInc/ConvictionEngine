import React, { Component } from 'react'
import CompanyPanel from './CompanyPanel';

export default class Panels extends Component {
    
  render() {
    const { companies, onNext, onAddConviction, onAddTeam, onAddnConviction, onHold, onunHold, onSetHOD} = this.props;
    return (
      <div className={styles.panelPadding}>
        <br/>
        {companies.map(company =>
        (<CompanyPanel 
          key={company.company_id}
          company={company}
          onNext={onNext}
          onAddConviction={onAddConviction}
          onAddTeam={onAddTeam}
          onAddnConviction={onAddnConviction}
          onHold={onHold}
          onunHold={onunHold}
          onSetHOD={onSetHOD}
        />))}
        <br/>
      </div>
    )
  }
}

const styles = theme => ({
  panelPadding: {    
    padding: '50px',  
  },
});
