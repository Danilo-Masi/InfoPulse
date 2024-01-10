import React, { Component } from "react";
//CSS
import "../../assets/style/Style.css";
//Componenti
import NewsList from "../../components/NewsList/NewsList";
import Welcome from "../../components/Welcome/Welcome";

export class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  //Funzione (di callback) per aggiungere un articlo alla lista dei preferiti
  nuoviPreferiti = (id, dati) => {
    this.props.onAggiuni(id, dati);
  };

  render() {
    const { categoria } = this.props;

    return (
      <div className="containerMain">
        <Welcome />
        <NewsList
          categoria={categoria}
          aggiungiPreferiti={this.nuoviPreferiti}
        />
      </div>
    );
  }
}

export default HomePage;
