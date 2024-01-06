import React, { Component } from 'react';
//CSS
import './NewsList.css';
//Funzioni API
import { getTopNews, getNewsByCategory } from '../../../services/NewsApi';
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

  componentDidUpdate(prevProps) {
    let {categoria} = this.props;
    if(categoria !== '' && categoria !== prevProps.categoria) {
      this.caricaNotizie();
    }
  }

  caricaNotizie = async () => {

    let { categoria } = this.props;
    console.log(categoria);
    if (categoria !== '') {
      try {
        const notizie = await getNewsByCategory(categoria);
        console.log('CATEGORIA: ' + notizie);
        // Rimuove dalla lista gli elementi che hanno titolo [Removed] o non hanno un immagine di copertina
        const notizieFiltrate = notizie.filter((notizia) => notizia.title !== '[Removed]' && notizia.urlToImage !== null);
        this.setState({ listaNotizie: notizieFiltrate });
      } catch (error) {
        console.error('Errore caricamento news', error);
      }
    } else {
      console.log('ciao');
      try {
        const notizie = await getTopNews();
        console.log('TOP NEWS');
        // Rimuove dalla lista gli elementi che hanno titolo [Removed] o non hanno un immagine di copertina
        const notizieFiltrate = notizie.filter((notizia) => notizia.title !== '[Removed]');
        this.setState({ listaNotizie: notizieFiltrate });
      } catch (error) {
        console.error('Errore caricamento news', error);
      }
    }
  }

  addPreferiti = (id, dati) => {
    console.log('Prefe --- 2');
    this.props.aggiungiPreferiti(id, dati);
  }

  render() {

    const { listaFavoriti, categoria } = this.props;
    const { listaNotizie } = this.state;

    return (
      <div className='newsList'>
        {Array.isArray(listaNotizie) && listaNotizie.length > 0 ? (
          listaNotizie.map((el, index) => (
            <NewsThumbnail
              key={index}
              dati={el}
              addPrefe={this.addPreferiti}
              listaFavoriti={listaFavoriti} />
          ))
        ) : (
          <p className='caricamentoNotizie'>La lista delle notizie è vuota</p>
        )}
      </div>
    )
  }
}

export default NewsList;