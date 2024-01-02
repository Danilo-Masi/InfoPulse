import React, { Component } from 'react';
//CSS
import './NewsList.css';
//Funzioni API
import { getTopNews } from '../../../services/NewsApi';
//Componenti
import NewsThumbnail from '../NewsThumbnail/NewsThumbnail';

export class NewsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listaNotizie: [],
    }
  }

  componentDidMount() {
    this.caricaNotizie();
  }

  caricaNotizie = async () => {
    try {
      const notizie = await getTopNews();
      // Rimuove dalla lista gli elementi che hanno titolo [Removed] o non hanno un immagine di copertina
      const notizieFiltrate = notizie.filter((notizia) => notizia.title !== '[Removed]' && notizia.urlToImage !== null);
      this.setState({ listaNotizie: notizieFiltrate });
    } catch (error) {
      console.error('Errore caricamento news', error);
    }
  }

  addPreferiti = () => {
    console.log('Prefe --- 2');
    this.props.aggiungiPreferiti();
  }

  render() {

    const { listaNotizie } = this.state;

    return (
      <div className='newsList'>
        {listaNotizie.length > 0 ? (
          listaNotizie.map((el, index) => (
            <NewsThumbnail
              key={index}
              dati={el}
              addPrefe={this.addPreferiti} />
          ))
        ) : (
          <p className='caricamentoNotizie'>La lista delle notizie è vuota</p>
        )}
      </div>
    )
  }
}

export default NewsList;