import React, { Component } from "react";
import CompanyPanel from "./CompanyPanel";

export default class Panels extends Component {
  // Panels is the component which maps company panels to the company data given the search results

  render() {
    const {
      companies,
      search,
      onNext,
      onAddConviction,
      onAddTeam,
      onAddnConviction,
      onHold,
      onunHold,
      onSetHOD
    } = this.props;

    // filters search to the keywords
    let filteredCompanies =
      search == "" || search == null
        ? companies
        : companies.filter(company => {
            if (company.company_name == null) return false;
            return (
              company.company_name
                .toLowerCase()
                .indexOf(search.toLowerCase()) !== -1
            );
          });

    return (
      <div className={styles.panelPadding}>
        <br />
        {filteredCompanies.map(company => (
          <React.Fragment>
            <CompanyPanel
              key={company.company_id}
              company={company}
              onNext={onNext}
              onAddConviction={onAddConviction}
              onAddTeam={onAddTeam}
              onAddnConviction={onAddnConviction}
              onHold={onHold}
              onunHold={onunHold}
              onSetHOD={onSetHOD}
            />
            <br />
          </React.Fragment>
        ))}
        <br />
      </div>
    );
  }
}

const styles = theme => ({
  panelPadding: {
    padding: "50px"
  }
});
