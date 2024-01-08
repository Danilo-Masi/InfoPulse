import React, { Component } from 'react';
//CSS
import './Footer.css';
//Material UI
import IconButton from '@mui/material/IconButton';
import LightModeSharpIcon from '@mui/icons-material/LightModeSharp';
import DarkModeSharpIcon from '@mui/icons-material/DarkModeSharp';

export class Footer extends Component {

  constructor(props) {
    super(props);
  }

  //Chiama la funzione nel comonente padre (App)
  //per modificare il tema dell'applicazione
  cambiaTema = () => {
    this.props.changeTheme();
  }

  render() {

    const { tema } = this.props;

    return (
      <div className='footer'>
        <div className='footerLogo'>
          <h1>InfoPulse</h1>
          <p>Developed with &#10084;&#65039; and &#127829; <br />by <a href='https://github.com/Danilo-Masi' target='_blank'> Danilo Masi </a></p>
          <p>* Per la visualizzazione del articolo completo <br />si viene rediretti alla fonte originale </p>
        </div>
        <div className='footerLink'>
          <h3>Titolo 1</h3>
          <p>link 1</p>
          <p>link 2</p>
          <p>link 3</p>
        </div>
        <div className='footerLink'>
          <h3>Titolo 1</h3>
          {/* Bottone cambia tema */}
          <div className='bloccoBottoni'>
            <IconButton
              type="button"
              sx={{ p: '10px' }}
              aria-label="app-mode"
              onClick={this.cambiaTema} >
              {tema.palette.mode === 'light' ? <DarkModeSharpIcon /> : <LightModeSharpIcon />}
            </IconButton>
          </div>
          <p>Link 3</p>
        </div>
      </div>
    )
  }
}

export default Footer