import React, { Component } from 'react';
//CSS
import '../../assets/style/Style.css';
//Componenti
import SearchList from '../../components/SearchList/SearchList';

export class SearchResultPage extends Component {

  constructor(props) {
    super(props);
  }

  onArticlePage = (num, dati) => {
    console.log('SearchResultPage (3) --- ' + num);
    this.props.apriStaCazz(num, dati);
  }

  nuoviPreferiti = () => {
    console.log('Prefe Search --- 3');
    this.props.onAggiuni();
  }

  render() {

    const { datiRicerca } = this.props;

    return (
      <div className='containerMain'>
        <SearchList
          risultati={datiRicerca}
          openPage={this.onArticlePage}
          aggiungiPreferiti={this.nuoviPreferiti} />
      </div>
    )
  }
}

export default SearchResultPage