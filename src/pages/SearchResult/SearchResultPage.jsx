import React, { Component } from "react";
//CSS
import "../../assets/style/Style.css";
//Componenti
import SearchList from "../../components/SearchList/SearchList";
import PageTitle from '../../components/PageTitle/PageTitle';

export class SearchResultPage extends Component {
  constructor(props) {
    super(props);
  }

  //Funzione (di callback) per cambiare la pagina corrente
  onArticlePage = (num) => {
    this.props.apriStaCazz(num);
  };

  //Funzione (di callback) per aggiungere un articolo ai preferiti
  nuoviPreferiti = (id, dati) => {
    this.props.onAggiuni(id, dati);
  };

  render() {
    const { datiRicerca, stringaRicerca } = this.props;

    return (
      <div className="containerMain">
        <PageTitle
          stringaRicerca={stringaRicerca}
          titolo={'Search for: '} />
        <SearchList
          risultati={datiRicerca}
          openPage={this.onArticlePage}
          aggiungiPreferiti={this.nuoviPreferiti}
        />
      </div>
    );
  }
}

export default SearchResultPage;
