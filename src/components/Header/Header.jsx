import React, { Component } from 'react';
//CSS
import './Header.css';
//Material UI
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      valoreRicerca: '',
      anchorEl: null,
      categoriaSelezionata: null,
    }
  }

  //Funzione per cambiare pagina 
  apriNuovaPagina = (num) => {
    this.props.cambiaPagina(num);
  }

  //Funzione che prende il valore inserito dall'utente nella barra di ricerca
  settaValoreRicerca = (e) => {
    this.setState({ valoreRicerca: e.target.value });
  }

  //Funzione che invia il valore inserito dall'utente nella barra di ricerca
  //al componente padre
  inviaValoreRicerca = (e) => {
    e.preventDefault();
    this.props.sendValue(this.state.valoreRicerca);
    this.setState({ valoreRicerca: '' });
  }

  //Funzione per aprire il form 
  handleClickOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  //Funzione per chiudere il form 
  handleClickClose = () => {
    this.setState({ anchorEl: null });
  }

  //Funzione per impostare la categoria selezionata **TODO**
  selezionaCategoria = (label) => {
    console.log('Categoria --- 1 ' + label);
    this.props.risulatiPerCategoria(label);
    this.setState({ categoriaSelezionata: label });
    this.apriNuovaPagina(0);
  }

  render() {

    const { pagina } = this.props;
    const { valoreRicerca, anchorEl, categoriaSelezionata } = this.state;
    const open = Boolean(anchorEl);

    //Lista categorie ricerca selezionabili
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
          onClick={() => this.apriNuovaPagina(0)}>
          <h1>InfoPulse</h1>
        </div>
        {/* BLOCCO BARRA DI RICERCA */}
        <div className='bloccoBarraRicerca'>
          {/* Preferiti */}
          {pagina === 2
            ? <IconButton><FavoriteIcon /></IconButton>
            : <IconButton onClick={() => this.apriNuovaPagina(2)}><FavoriteBorderIcon /></IconButton>
          }
          {/* Filtri di ricerca */}
          <IconButton
            id="menu-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={this.handleClickOpen}>
            <EqualizerIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            className='contCategory'
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClickClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {categorie.map(el => {
              return (
                <MenuItem
                  key={el.key}
                  className={`category ${categoriaSelezionata === el.label ? 'selected' : ''}`}
                  onClick={() => {
                    this.selezionaCategoria(el.label);
                    this.handleClickClose();
                  }}>
                  {el.label}
                </MenuItem>
              )
            })}
          </Menu>
          {/* Barra di ricerca */}
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            onSubmit={this.inviaValoreRicerca} >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search..."
              value={valoreRicerca}
              onFocus={() => this.apriNuovaPagina(1)}
              onChange={this.settaValoreRicerca}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </div>
    )
  }
}

export default Header
