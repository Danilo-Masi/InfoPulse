import React, { Component } from "react";
//CSS
import "../../assets/style/Style.css";
//Componenti
import PrefeList from "../../components/PrefeList/PrefeList";

export class PreferitiPage extends Component {
  constructor(props) {
    super(props);
  }

  //Funzione (di callback) per tornare alla HomePage
  onBack = (num) => {
    this.props.backToBack(num);
  };

  render() {
    return (
      <div className="containerMain">
        <PrefeList tornaIndietro={this.onBack} />
      </div>
    );
  }
}

export default PreferitiPage;
