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
          <h3>Titolo 1</h3>
          <p>link 1</p>
          <p>link 2</p>
          <p>link 3</p>
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
          <p>Link 3</p>
        </div>
      </div>
    );
  }
}

export default Footer;
