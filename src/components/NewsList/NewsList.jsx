import React, { Component } from "react";
//CSS
import "./NewsList.css";
//Funzioni API
import { getTopNews, getNewsByCategory } from "../../../services/NewsApi";
//Material UI
import CircularProgress from '@mui/material/CircularProgress';
//Componenti
import NewsThumbnail from "../NewsThumbnail/NewsThumbnail";
import PaginationElement from "../PaginationElement/PaginationElement";

export class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaNotizie: [],
      currentPage: 1,
      numberPages: 1,
      caricamento: false,
    };
  }

  componentDidMount() {
    this.caricaNotizie();
  }

  componentDidUpdate(prevProps) {
    const { categoria } = this.props;
    if (categoria !== prevProps.categoria) {
      this.caricaNotizie();
    }
  }

  //Funzione per caricare le notizie dall'API
  caricaNotizie = async () => {
    const { categoria } = this.props;
    const { currentPage } = this.state;
    const elementiPagina = 12;
    const indexOfLastRecord = currentPage * elementiPagina;
    const indexOfFirstRecord = indexOfLastRecord - elementiPagina;

    let listaNotizie = [];
    let numberPages = 1;

    this.setState({ caricamento: true });

    try {
      let notizie;
      if (categoria !== "") {
        this.setState({ listaNotizie: [], currentPage: 1 });
        notizie = await getNewsByCategory(categoria);
      } else {
        notizie = await getTopNews();
      }
      const notizieFiltrate = notizie.filter((notizia) => notizia.title !== "[Removed]");
      numberPages = Math.ceil(notizieFiltrate.length / elementiPagina);
      listaNotizie = notizieFiltrate.slice(indexOfFirstRecord, indexOfLastRecord);
    } catch (error) {
      console.error("Errore caricamento news", error);
    } finally {
      this.setState({ caricamento: false });
    }

    this.setState({ listaNotizie, numberPages });
  };

  //Funzione (di callback) per aggiungere un articlo alla lista dei preferiti
  addPreferiti = (id, dati) => {
    this.props.aggiungiPreferiti(id, dati);
  };

  //Funzione che implementa il principio della paginazione
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    // Ritarda l'esecuzione di caricaNotizie di 300 millisecondi 
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      this.caricaNotizie();
    }, 300);
  }

  render() {
    const { listaNotizie, numberPages, currentPage, caricamento } = this.state;
    const {categoria} = this.props;

    return (
      <div className="newsList">
        {Array.isArray(listaNotizie) && listaNotizie.length > 0 ? (
          listaNotizie.map((el, index) => (
            <NewsThumbnail key={index} dati={el} addPrefe={this.addPreferiti} />
          ))
        ) : (
          <p className="caricamentoNotizie">
            {caricamento ? <CircularProgress /> : 'Non ci sono notizie'}
          </p>
        )}
        <PaginationElement
          categoria={categoria}
          currentPage={currentPage}
          numeroPagina={numberPages}
          onPageChange={this.handlePageChange} />
      </div>
    );
  }
}

export default NewsList;
