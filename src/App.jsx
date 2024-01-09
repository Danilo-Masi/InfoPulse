import React, { Component } from 'react';
//CSS
import './App.css';
//Pagine
import HomePage from './pages/Home/HomePage';
import SearchResultPage from './pages/SearchResult/SearchResultPage';
import PreferitiPage from './pages/Preferiti/PreferitiPage';
//Componenti
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
//Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
//Funzioni API
import { getNewsBySearch } from '../services/NewsApi';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      paginaSelzionata: 0,
      temaSelezionato: this.darkTheme,
      listaRisulati: [],
      listaPreferiti: [],
      categoria: '',
    }
  }

  //Dark mode *DA MODIFICARE
  darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  //Ligth mode *DA MODIFICARE
  lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  componentDidMount() {
    this.settaTema();
  }

  //Funzione che carica il tema 
  settaTema = () => {
    const temaSalvato = localStorage.getItem('temaSalvato');
    if (temaSalvato === 'dark') {
      this.setState({ temaSelezionato: this.darkTheme });
    } else {
      this.setState({ temaSelezionato: this.lightTheme });
    }
  }

  //Funzione per cambiare il tema corrente
  cambiaTemaCorrente = () => {
    const { temaSelezionato } = this.state;
    let nuovoTema;
    if (temaSelezionato === this.darkTheme) {
      nuovoTema = 'light';
    } else {
      nuovoTema = 'dark';
    }
    this.setState({ temaSelezionato: (nuovoTema === 'dark') ? this.darkTheme : this.lightTheme });
    localStorage.setItem('temaSalvato', nuovoTema);
  }

  //Funzione per cambiare la pagina corrente
  changePage = (num) => {
    this.setState({
      paginaSelzionata: num,
    })
  }

  //Funzione che prende in input la stringa di ricerca inserita dall'utente
  //e carica i dati dall'API in base alla stringa di ricerca
  onValoreInserito = async (strCerca) => {
    try {
      this.setState({ listaRisulati: [] });
      const risulatiRicerca = await getNewsBySearch(strCerca);
      this.setState({ listaRisulati: risulatiRicerca });
    } catch (error) {
      console.error('Errore caricamento news ricerca', error);
    }
  }

  // Funzione per aggiungere un articolo alla lista degli articoli preferiti
  addPreferiti = (id, dati) => {
    //Carica la lista dei preferiti dal localStorage
    const prefe = JSON.parse(localStorage.getItem('listaPreferiti')) || [];
    //Verifica se l'articolo passato è gia presente nella lista dei preferiti
    const isPresente = prefe.some(el => el.id === id);
    if (!isPresente) {
      //Aggiunge l'articolo alla lista dei preferiti nel local storage
      prefe.push({ id, dati });
      //Aggiorna lo stato con i preferiti
      this.setState({ listaPreferiti: prefe });
      //Aggiorna la lista dei preferiti del local storage
      localStorage.setItem('listaPreferiti', JSON.stringify(prefe));
    } else {
      alert("Articolo già presente tra gli articoli preferiti");
    }
  }

  //Funzione che imposta come stato la categoria selezionata
  cercaPerCategoria = (label) => {
    this.setState({ categoria: label });
  }

  render() {

    const { paginaSelzionata, temaSelezionato, listaRisulati, listaPreferiti, categoria } = this.state;

    return (
      <ThemeProvider theme={temaSelezionato}>
        <CssBaseline />
        <div className='app'>
          <Header
            pagina={paginaSelzionata}
            sendValue={this.onValoreInserito}
            cambiaPagina={this.changePage}
            risulatiPerCategoria={this.cercaPerCategoria} />
          {paginaSelzionata === 0
            ? (<HomePage
              categoria={categoria}
              listaFavoriti={listaPreferiti}
              onAggiuni={this.addPreferiti} />)
            : paginaSelzionata === 1
              ? (<SearchResultPage
                listaFavoriti={listaPreferiti}
                datiRicerca={listaRisulati}
                apriStaCazz={this.changePage}
                onAggiuni={this.addPreferiti} />)
              : (<PreferitiPage backToBack={this.changePage} />)
          }
          <Footer
            tema={temaSelezionato}
            changeTheme={this.cambiaTemaCorrente} />
        </div>
      </ThemeProvider>
    )
  }
}

export default App