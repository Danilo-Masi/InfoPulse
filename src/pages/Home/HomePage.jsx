import React, { Component } from "react";
//CSS
import "../../assets/style/Style.css";
//Componenti
import NewsList from "../../components/NewsList/NewsList";
import PageTitle from "../../components/PageTitle/PageTitle";
import Pagination from "../../components/Pagination/Pagination";

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
        <PageTitle titolo={'Latest news'} />
        <NewsList
          categoria={categoria}
          aggiungiPreferiti={this.nuoviPreferiti}
        />
        <Pagination />
      </div>
    );
  }
}

export default HomePage;
