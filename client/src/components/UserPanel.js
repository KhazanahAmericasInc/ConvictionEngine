import React, { Component } from 'react';
import ETF from './user/ETF';


export default class UserPanel extends Component {
    render() {
        const { onAddConvictionETF, etfBalance, totalETFBalance } = this.props;
        return (
            <div className="row">
                <div className="col-md-12">
                    <br />
                    <ETF onAddConvictionETF={onAddConvictionETF} etfBalance={etfBalance} totalETFBalance={totalETFBalance} />
                    <br />
                </div>
            </div>
        )
    }
}
