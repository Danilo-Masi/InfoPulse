import React, { Component } from 'react';
//CSS
import '../../assets/style/Style.css';
//Componenti
import SearchList from '../../components/SearchList/SearchList';

export class SearchResultPage extends Component {

  constructor(props) {
    super(props);
  }

  //Funzione (di callback) per cambiare la pagina corrente
  onArticlePage = (num) => {
    this.props.apriStaCazz(num);
  }

  //Funzione (di callback) per aggiungere un articolo ai preferiti
  nuoviPreferiti = (id, dati) => {
    this.props.onAggiuni(id, dati);
  }

  render() {

    const { datiRicerca, listaFavoriti } = this.props;

    return (
      <div className='containerMain'>
        <SearchList
          listaFavoriti={listaFavoriti}
          risultati={datiRicerca}
          openPage={this.onArticlePage}
          aggiungiPreferiti={this.nuoviPreferiti} />
      </div>
    )
  }
}

export default SearchResultPage