import React, { Component } from "react";
//CSS
import "../../assets/style/Style.css";
//Componenti
import PrefeList from "../../components/PrefeList/PrefeList";
import PageTitle from "../../components/PageTitle/PageTitle";

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
        <PageTitle
          pagina={'pagina'}
          tornaIndietro={this.onBack}
          titolo={'Saved articles'} />
        <PrefeList />
      </div>
    );
  }
}

export default PreferitiPage;
