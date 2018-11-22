import React, { Component } from 'react'
import CompanyPanel from './CompanyPanel';

export default class Panels extends Component {
    
  render() {
    const { companies, onNext, onAddConviction, onAddTeam} = this.props
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
