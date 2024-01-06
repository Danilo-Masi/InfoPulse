import React, { Component } from 'react';
//CSS
import '../../assets/style/Style.css';
//Componenti
import NewsList from '../../components/NewsList/NewsList';

export class HomePage extends Component {

  constructor(props) {
    super(props);
  }

  nuoviPreferiti = (id, dati) => {
    console.log('Prefe --- 3');
    this.props.onAggiuni(id, dati);
  }

  render() {

    const { listaFavoriti, categoria } = this.props;

    return (
      <div className='containerMain'>
        <NewsList
          categoria={categoria}
          listaFavoriti={listaFavoriti}
          aggiungiPreferiti={this.nuoviPreferiti} />
      </div>
    )
  }
}

export default HomePage