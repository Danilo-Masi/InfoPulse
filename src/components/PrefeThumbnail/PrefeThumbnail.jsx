import React, { Component } from 'react';
//CSS
import './PrefeThumbnail.css';
//Material UI
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export class PrefeThumbnail extends Component {

    constructor(props) {
        super(props);
    }

    apriFinestraArticolo = () => {
        var link = this.props.datiPrefe.url;
        window.open(link, '_blank');
    }

    render() {

        //Preleva la dimensione della vista
        var vista = window.innerWidth;
        const { datiPrefe } = this.props;
        //Creazione dei dati
        var url = datiPrefe.urlToImage;
        var stringTitolo = datiPrefe.title;
        var stringDescrizione = datiPrefe.description;
        var autore = datiPrefe.author;
        var fonte = datiPrefe.source.name;
        //Creazione della data
        var dataPubblicazione = new Date(datiPrefe.publishedAt);
        var giorno = dataPubblicazione.getDate();
        var mese = dataPubblicazione.getMonth() + 1;
        var anno = dataPubblicazione.getFullYear();

        return (
            <div className='containerPrefe'>
                {/* IMMAGINE */}
                <div className='prefeImage' onClick={this.apriFinestraArticolo}>
                    <img src={url} />
                </div>
                {/* TITOLO E DESCRIZIONE */}
                <div className='prefeInfo' onClick={this.apriFinestraArticolo}>
                    <h3>{vista < 728 ? (
                        stringTitolo && stringTitolo.split(" ").length > 7
                            ? stringTitolo.split(" ").slice(0, 7).join(" ") + "..."
                            : stringTitolo
                    ) : (
                        stringTitolo && stringTitolo.split(" ").length > 8
                            ? stringTitolo.split(" ").slice(0, 8).join(" ") + "..."
                            : stringTitolo
                    )}</h3>
                    <p>{vista < 728 ? (
                        stringDescrizione && stringDescrizione.split(" ").length > 10
                            ? stringDescrizione.split(" ").slice(0, 10).join(" ") + "..."
                            : stringDescrizione
                    ) : (
                        stringDescrizione && stringDescrizione.split(" ").length > 12
                            ? stringDescrizione.split(" ").slice(0, 12).join(" ") + "..."
                            : stringDescrizione
                    )}</p>
                </div>
                {/* AUTORE E DATA */}
                <div className='prefeAuthor'>
                    {autore ? (
                        <p>{autore.split(" ").length > 5 ? fonte : autore} <br />{giorno}/{mese}/{anno}</p>
                    ) : (
                        <p>{fonte} <br />{giorno}/{mese}/{anno}</p>
                    )}
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        )
    }
}

export default PrefeThumbnail