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
    let { categoria } = this.props;
    if (categoria !== '' && categoria !== prevProps.categoria) {
      this.caricaNotizie();
    }
  }

  //Funzione per caricare le notizie dall'API
  caricaNotizie = async () => {
    let { categoria } = this.props;
    if (categoria !== '') {
      try {
        const notizie = await getNewsByCategory(categoria);
        // Rimuove dalla lista gli elementi che hanno titolo [Removed]
        const notizieFiltrate = notizie.filter((notizia) => notizia.title !== '[Removed]');
        this.setState({ listaNotizie: notizieFiltrate });
      } catch (error) {
        console.error('Errore caricamento news', error);
      }
    } else {
      try {
        const notizie = await getTopNews();
        // Rimuove dalla lista gli elementi che hanno titolo [Removed]
        const notizieFiltrate = notizie.filter((notizia) => notizia.title !== '[Removed]');
        this.setState({ listaNotizie: notizieFiltrate });
      } catch (error) {
        console.error('Errore caricamento news', error);
      }
    }
  }

  //Funzione (di callback) per aggiungere un articlo alla lista dei preferiti
  addPreferiti = (id, dati) => {
    this.props.aggiungiPreferiti(id, dati);
  }

  render() {

    const { listaFavoriti } = this.props;
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