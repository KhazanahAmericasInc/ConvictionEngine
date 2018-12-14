import React, { Component } from "react";
import Mint from "./admin/Mint";
import Burn from "./admin/Burn";
import Rank from "./admin/Rank";
import Send from "./admin/Send";
import Steal from "./admin/Steal";
import Ownership from "./admin/Ownership";
import SetHOD from "./admin/SetHOD";

export default class AdminPanel extends Component {
  // The AdminPanel is the component which contains all of the admin controls.

  render() {
    const {
      onMintKAI,
      onBurnKAI,
      onChangeRank,
      onStealKAI,
      onSendKAI,
      onSetAdmin,
      onSetHOD
    } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <SetHOD onSetHOD={onSetHOD} />
          <br />
          <Rank onChangeRank={onChangeRank} />
          <br />
          <Send onSendKAI={onSendKAI} />
          <br />
          <Steal onStealKAI={onStealKAI} />
          <br />
          <Mint onMintKAI={onMintKAI} />
          <br />
          <Burn onBurnKAI={onBurnKAI} />
          <br />
          <Ownership onSetAdmin={onSetAdmin} />
        </div>
      </div>
    );
  }
}
