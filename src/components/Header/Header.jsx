import React, { Component } from 'react';
//CSS
import './Header.css';
//Material UI
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import LightModeSharpIcon from '@mui/icons-material/LightModeSharp';
import DarkModeSharpIcon from '@mui/icons-material/DarkModeSharp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EqualizerIcon from '@mui/icons-material/Equalizer';

export class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      valoreRicerca: '',
    }
  }

  //Funzione che al onFocus della barra di ricerca
  //richiama un altra funzione in App.jsx per cambiare la
  //visualizzazione della pagina corrente
  apriPaginaRisultati = () => {
    let num = 1;
    this.props.cambiaPagina(num);
  }

  //Funzione che al onClik del logo riporta la pagina
  //corrente alla homepage
  apriHomePage = () => {
    let num = 0;
    this.props.cambiaPagina(num);
  }

  apriPaginaPreferiti = () => {
    let num = 2;
    this.props.cambiaPagina(num);
  }

  //Funzione che imposta come valoreRicerca il valore
  //inserito dall'utente nella barra di ricerca
  settaValoreRicerca = (e) => {
    this.setState({ valoreRicerca: e.target.value });
  }

  //Funzione che invia il valoreRicerca nello stato
  //al componente App.jsx per fare le dovute operazioni
  inviaValoreRicerca = (e) => {
    e.preventDefault();
    this.props.sendValue(this.state.valoreRicerca);
    this.setState({ valoreRicerca: '' });
  }

  //Chiama la funzione nel comonente padre (App)
  //per modificare il tema dell'applicazione
  cambiaTema = () => {
    this.props.changeTheme();
  }

  render() {

    const { tema, pagina } = this.props;
    const { valoreRicerca } = this.state;

    return (
      <div className='header'>
        {/* BLOCCO LOGO */}
        <div
          className='bloccoLogo'
          onClick={this.apriHomePage}>
          <h1>Info Pulse</h1>
        </div>
        {/* BLOCCO BARRA DI RICERCA */}
        <div className='bloccoBarraRicerca'>
          {/* Preferiti */}
          {pagina === 2
            ? <IconButton><FavoriteIcon /></IconButton>
            : <IconButton onClick={this.apriPaginaPreferiti}><FavoriteBorderIcon /></IconButton>
          }
          {/* Filtri di ricerca */}
          <IconButton>
            <EqualizerIcon />
          </IconButton>
          {/* Barra di ricerca */}
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            onSubmit={this.inviaValoreRicerca} >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search..."
              value={valoreRicerca}
              onFocus={this.apriPaginaRisultati}
              onChange={this.settaValoreRicerca}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        {/* 
        <div className='bloccoBottoni'>
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            aria-label="app-mode"
            onClick={this.cambiaTema} >
            {tema.palette.mode === 'light' ? <DarkModeSharpIcon /> : <LightModeSharpIcon />}
          </IconButton>
        </div> */}
      </div>
    )
  }
}

export default Header