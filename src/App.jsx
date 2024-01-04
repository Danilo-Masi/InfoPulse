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

  //Prende il tema presente nel localStorage e lo imposta
  //come nuovo stato
  settaTema = () => {
    const temaSalvato = localStorage.getItem('temaSalvato');
    if (temaSalvato === 'dark') {
      this.setState({ temaSelezionato: this.darkTheme });
    } else {
      this.setState({ temaSelezionato: this.lightTheme });
    }
  }

  //Una volta cliccato il pulsante per cambiare il tema
  //questo setta il tema nello stato e lo setta nel
  //local storage
  cambiaModalita = () => {
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
    console.log(strCerca);
    try {
      const risulatiRicerca = await getNewsBySearch(strCerca);
      this.setState({ listaRisulati: risulatiRicerca });
    } catch (error) {
      console.error('Errore caricamento news ricerca', error);
    }
  }

  // Funzione per aggiungere un articolo alla lista degli articoli preferiti
  addPreferiti = (id, dati) => {
    console.log('Prefe --- 4');
    const { listaPreferiti } = this.state;
    // Verifica se l'articolo è già presente nella listaPreferiti
    const isPresente = listaPreferiti.some(el => el.id === id);
    if (!isPresente) {
      // Aggiungi l'articolo alla listaPreferiti
      this.setState({
        listaPreferiti: [...listaPreferiti, { id, dati }],
      }, () => {
        console.log(this.state.listaPreferiti);
        //Archiviazione dell'array dei preferiti nel localStorage
        localStorage.setItem('listaPreferiti', JSON.stringify(listaPreferiti));
      });
    } else {
      //Aggiungere un alert per l'utente
      console.log('L\'articolo è già presente nella listaPreferiti.');
    }
  }

  render() {

    const { paginaSelzionata, temaSelezionato, listaRisulati, listaPreferiti } = this.state;

    return (
      <ThemeProvider theme={temaSelezionato}>
        <CssBaseline />
        <div className='app'>
          <Header
            pagina={paginaSelzionata}
            tema={temaSelezionato}
            changeTheme={this.cambiaModalita}
            sendValue={this.onValoreInserito}
            cambiaPagina={this.changePage} />
          {paginaSelzionata === 0
            ? (<HomePage onAggiuni={this.addPreferiti} />)
            : paginaSelzionata === 1
              ? (<SearchResultPage
                apriStaCazz={this.changePage}
                datiRicerca={listaRisulati}
                onAggiuni={this.addPreferiti} />)
              : (<PreferitiPage backToBack={this.changePage}/>)
          }
          <Footer />
        </div>
      </ThemeProvider>
    )
  }
}

export default App