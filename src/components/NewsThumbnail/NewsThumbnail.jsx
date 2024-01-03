import React from 'react';
//CSS
import './NewsThumbnail.css';
//Material UI
import IconButton from '@mui/material/IconButton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function NewsThumbnail(props) {

    const { dati } = props;
    var stringTitolo = dati.title;
    var stringDescrizione = dati.description;
    var autore = dati.author;
    var fonte = dati.source.name;
    var url = dati.urlToImage;
    var link = dati.url;
    //Creazione della data
    var dataPubblicazione = new Date(dati.publishedAt);
    var giorno = dataPubblicazione.getDate();
    var mese = dataPubblicazione.getMonth() + 1;
    var anno = dataPubblicazione.getFullYear();
    //Preleva la dimensione della vista
    var vista = window.innerWidth;
    //Preleva il valore del tema dal localStorage
    const temaSalvato = localStorage.getItem('temaSalvato');

    //Funzione per aprire il link all'articolo completo
    const apriFinestraArticolo = () => {
        window.open(link, '_blank');
    }

    //Funzione per aggiungere l'articolo ai preferiti
    const aggiungiPreferiti = () => {
        console.log('Prefe --- 1');
        const id = link;
        props.addPrefe(id, dati);
    }

    return (
        <div className={temaSalvato === 'dark' ? 'newsThumbnail' : 'newsThumbnailLight'}>
            {/* IMMAGINE */}
            <div className='newsImage' onClick={apriFinestraArticolo}>
                <img src={url} />
            </div>
            {/* TITOLO E DESCRIZIONE */}
            <div className='newsInfo' onClick={apriFinestraArticolo}>
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
            <div className={temaSalvato === 'dark' ? 'newsAuthor' : 'newsAuthorLight'}>
                {autore ? (
                    <p>{autore.split(" ").length > 5 ? fonte : autore} <br />{giorno}/{mese}/{anno}</p>
                ) : (
                    <p>{fonte} <br />{giorno}/{mese}/{anno}</p>
                )}
                <IconButton onClick={aggiungiPreferiti}>
                    <BookmarkBorderIcon />
                </IconButton>
            </div>
        </div >
    )
}

export default NewsThumbnail