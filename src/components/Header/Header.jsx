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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';


export class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      valoreRicerca: '',
      open: false,
      categoriaSelezionata: null,
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

  //Funzione per aprire il form ** DA MODIFICARE **
  handleClickOpen = () => {
    this.setState({ open: true });
  }

  //Funzione per chiudere il form ** DA MODIFICARE **
  handleClickClose = () => {
    this.setState({ open: false });
  }

  //Funzione per selezionare la categoria scelta dall'utente
  selezionaCategoria = (label) => {
    const categoriaSelezionata = label;
    alert("Hai selezionato la categoria: " + categoriaSelezionata);
    console.log('Categoria --- 1 ' + label);
    this.props.risulatiPerCategoria(label);
    this.setState({ open: false, categoriaSelezionata: label });
    this.apriHomePage();
  }

  render() {

    const { tema, pagina } = this.props;
    const { valoreRicerca, open, categoriaSelezionata } = this.state;
    const categorie = [
      { key: 0, label: 'general' },
      { key: 1, label: 'entertainment' },
      { key: 2, label: 'business' },
      { key: 3, label: 'science' },
      { key: 4, label: 'sports' },
      { key: 5, label: 'technology' },
    ]

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
          <IconButton onClick={this.handleClickOpen}>
            <EqualizerIcon />
          </IconButton>
          {/* Dialog */}
          <Dialog
            open={open}
            onClose={this.handleClickClose}
            fullWidth
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              <p>Seleziona una categoria...</p>
            </DialogTitle>
            <DialogContent>
              <div className='stackCategory'>
                {categorie.map(el => {
                  return (
                    <div
                      key={el.key}
                      className={`category ${categoriaSelezionata === el.label ? 'selected' : ''}`}
                      onClick={() => this.selezionaCategoria(el.label)}>
                      <p>{el.label}</p>
                    </div>
                  )
                })}
              </div>
            </DialogContent>
          </Dialog>
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