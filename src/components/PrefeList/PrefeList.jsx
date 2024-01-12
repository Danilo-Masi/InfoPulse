import React, { Component } from "react";
//CSS
import "./PrefeList.css";
//Material UI
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//Componenti
import PrefeThumbnail from "../PrefeThumbnail/PrefeThumbnail";

export class PrefeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaPrefe: [],
        };
    }

    componentDidMount() {
        this.caricaLista();
    }

    //Carica la lista con tutti gli articoli aggiunti ai preferiti
    caricaLista = () => {
        const prefe = JSON.parse(localStorage.getItem("listaPreferiti"));
        if (prefe !== null || Array.isArray(prefe)) {
            this.setState({ listaPrefe: prefe });
        } else {
            this.setState({ listaPrefe: [] });
        }
    };

    //Funzione per tornare alla HomePage
    tornaIndietro = (num) => {
        this.props.tornaIndietro(num);
    };

    // Funzione per rimuovere un articolo dalla lista dei preferiti
    removePreferiti = (id) => {
        //Carico la lista dei preferiti dal local storage
        let prefe = JSON.parse(localStorage.getItem("listaPreferiti")) || [];
        //Filtra la lista per escludere l'articolo con l'id specificato
        let preferiti = prefe.filter((el) => el.id !== id);
        //Aggiorna il localStorage con la nuova lista
        localStorage.setItem("listaPreferiti", JSON.stringify(preferiti));
        //Aggiorna lo stato locale per riflettere immediatamente la rimozione
        this.setState({ listaPrefe: preferiti });
    };

    render() {
        const { listaPrefe } = this.state;

        return (
            <div className="prefeList">
                {listaPrefe && listaPrefe.length > 0 ? (
                    listaPrefe.map((el, index) => {
                        return (
                            <PrefeThumbnail
                                key={index}
                                datiPrefe={el.dati}
                                rimuoviPrefe={this.removePreferiti}
                            />
                        );
                    })
                ) : (
                    <p className="contListaVuota">Nessun articolo presente</p>
                )}
            </div>
        );
    }
}

export default PrefeList;
