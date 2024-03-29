import React, { Component } from "react";
//CSS
import "./PrefeThumbnail.css";
//Images
import Placeholder from '../../assets/images/Placeholder.webp';
//Material UI
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export class PrefeThumbnail extends Component {
    constructor(props) {
        super(props);
    }

    //Funzione per aprire l'articolo completo
    apriFinestraArticolo = () => {
        var link = this.props.datiPrefe.url;
        window.open(link, "_blank");
    };

    //Funzione (di callback) per cancellare un articolo
    //dalla lista dei preferiti
    cancellaPreferiti = () => {
        let id = this.props.datiPrefe.url;
        this.props.rimuoviPrefe(id);
    };

    render() {
        const { datiPrefe } = this.props;
        //Decomposizione dei dati caricati dalle props
        var url = datiPrefe.urlToImage;
        var stringTitolo = datiPrefe.title;
        var stringDescrizione = datiPrefe.description;
        var fonte = datiPrefe.source.name;
        var data = datiPrefe.publishedAt;
        //Creazione della data
        var dataPubblicazione = new Date(data);
        var giorno = dataPubblicazione.getDate() + 1;
        var mese = dataPubblicazione.getMonth() + 1;
        var anno = dataPubblicazione.getFullYear();
        //Trasmorma il mese da int a string
        const renderMese = () => {
            switch (mese) {
                case 0:
                    return "Gennaio";
                case 1:
                    return "Febbario";
                case 2:
                    return "Marzo";
                case 3:
                    return "Aprile";
                case 4:
                    return "Maggio";
                case 5:
                    return "Giugno";
                case 6:
                    return "Luglio";
                case 7:
                    return "Agosto";
                case 8:
                    return "Settembre";
                case 9:
                    return "Ottobre";
                case 10:
                    return "Novembre";
                case 11:
                    return "Dicembre";
            }
        };
        //Preleva la dimensione dello schermo
        var vista = window.innerWidth;
        //Preleva il valore del tema dal localStorage
        const temaSalvato = localStorage.getItem("temaSalvato");
        //Imposta le classi in base al tema corrente
        const temaCorrenteContainer =
            temaSalvato === "dark" ? "containerPrefeDark" : "containerPrefeLigth";
        const temaCorrenteAuthor =
            temaSalvato === "dark" ? "prefeAuthorDark" : "prefeAuthorLigth";

        return (
            <div className={`containerPrefe ${temaCorrenteContainer}`}>
                {/* Immagine */}
                <div className="prefeImage" onClick={this.apriFinestraArticolo}>
                    <img src={url ? url : Placeholder} alt={stringTitolo} />
                </div>
                {/* Ttitolo e descrizione */}
                <div className="prefeInfo" onClick={this.apriFinestraArticolo}>
                    <h3>
                        {vista < 728
                            ? stringTitolo && stringTitolo.split(" ").length > 7
                                ? stringTitolo.split(" ").slice(0, 7).join(" ") + "..."
                                : stringTitolo
                            : stringTitolo && stringTitolo.split(" ").length > 12
                                ? stringTitolo.split(" ").slice(0, 12).join(" ") + "..."
                                : stringTitolo}
                    </h3>
                    <p>
                        {vista < 728
                            ? stringDescrizione && stringDescrizione.split(" ").length > 10
                                ? stringDescrizione.split(" ").slice(0, 10).join(" ") + "..."
                                : stringDescrizione
                            : stringDescrizione && stringDescrizione.split(" ").length > 12
                                ? stringDescrizione.split(" ").slice(0, 12).join(" ") + "..."
                                : stringDescrizione}
                    </p>
                </div>
                {/* Box dati */}
                <div className={`prefeAuthor ${temaCorrenteAuthor}`}>
                    {fonte ? (
                        <p>
                            {fonte} <br />
                            {giorno} {renderMese()} {anno}
                        </p>
                    ) : (
                        <p>
                            Nessuna fonte <br />
                            {giorno} {renderMese()} {anno}
                        </p>
                    )}
                    <IconButton onClick={this.cancellaPreferiti}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default PrefeThumbnail;
