import React, { Component } from 'react'
import CompanyPanel from './CompanyPanel';

export default class Panels extends Component {
    
  render() {
    const { companies, onNext, onAddConviction} = this.props
    return (
      <div className={styles.panelPadding}>
        <br/>
        {companies.map(company =>
        (<CompanyPanel 
          key={company.company_id}
          company={company}
          onNext={onNext}
          onAddConviction={onAddConviction}
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
