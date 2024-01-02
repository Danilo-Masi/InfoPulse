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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

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
    let num = 2;
    this.props.cambiaPagina(num);
  }

  //Funzione che al onClik del logo riporta la pagina
  //corrente alla homepage
  apriHomePage = () => {
    let num = 0;
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

    const { tema } = this.props;
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
        {/* BLOCCO BOTTONI */}
        <div className='bloccoBottoni'>
          {/* Bottone cambio tema */}
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            aria-label="app-mode"
            onClick={this.cambiaTema} >
            {tema.palette.mode === 'light' ? <DarkModeSharpIcon /> : <LightModeSharpIcon />}
          </IconButton>
          {/* Select categoria */}
          <Select
            size='small'
            id="lingua-select"
            value={'ENG'}>
            <MenuItem value={'IT'}>IT</MenuItem>
            <MenuItem value={'ENG'}>ENG</MenuItem>
          </Select>
        </div>
      </div>
    )
  }
}

export default Header