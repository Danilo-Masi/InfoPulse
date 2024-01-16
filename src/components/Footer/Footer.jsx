import React, { Component } from "react";
//CSS
import "./Footer.css";
//Material UI
import IconButton from "@mui/material/IconButton";
import LightModeSharpIcon from "@mui/icons-material/LightModeSharp";
import DarkModeSharpIcon from "@mui/icons-material/DarkModeSharp";

export class Footer extends Component {
  constructor(props) {
    super(props);
  }

  //Funzione (di callback) per cambiare il tema corrente dell'applicazione
  cambiaTema = () => {
    this.props.changeTheme();
  };

  //Funzone (di callback) per cambiare la pagina corrente
  cambiaPagina = (num) => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.props.modificaPagina(num);
  }

  render() {
    const { tema } = this.props;

    return (
      <div className="footer">
        {/* Footer logo */}
        <div className="footerLogo">
          <h1>InfoPulse</h1>
          <p>
            Developed with &#10084;&#65039; and &#127829; <br />
            by{" "}
            <a href="https://github.com/Danilo-Masi" target="_blank">
              {" "}
              Danilo Masi{" "}
            </a>
          </p>
          <p>
            * Per leggere l'articolo completo, <br />
            verrai reindirizzato alla sua fonte originale.
          </p>
        </div>
        {/* Footer link */}
        <div className="footerLink">
          <h3>Link</h3>
          <p onClick={() => this.cambiaPagina(0)}>Home</p>
          <p onClick={() => this.cambiaPagina(2)}>Preferiti</p>
        </div>
        {/* Footer link */}
        <div className="footerLink">
          <h3>Impostazioni</h3>
          <div className="bloccoBottoni">
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="app-mode"
              onClick={this.cambiaTema}
            >
              {tema.palette.mode === "light" ? (
                <DarkModeSharpIcon />
              ) : (
                <LightModeSharpIcon />
              )}
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
