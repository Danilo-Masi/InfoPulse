import React from 'react';
//CSS
import './NewsThumbnail.css';
//Images
import Placeholder from '../../assets/images/Placeholder.jpg';
//Material UI
import IconButton from '@mui/material/IconButton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function NewsThumbnail(props) {

    const { dati, listaFavoriti } = props;
    var stringTitolo = dati.title;
    var stringDescrizione = dati.description;
    var fonte = dati.source.name;
    var url = dati.urlToImage;
    var link = dati.url;
    //Creazione della data
    var dataPubblicazione = new Date(dati.publishedAt);
    var giorno = dataPubblicazione.getDate() + 1;
    var mese = dataPubblicazione.getMonth() + 1;
    var anno = dataPubblicazione.getFullYear();
    //Preleva la dimensione della vista
    var vista = window.innerWidth;
    //Preleva il valore del tema dal localStorage
    const temaSalvato = localStorage.getItem('temaSalvato');
    //Imposta le classi in base al tema corrente
    const temaCorrenteContainer = temaSalvato === 'dark' ? 'newsThumbnailDark' : 'newsThumbnailLight';
    const temaCorrenteAuthor = temaSalvato === 'dark' ? 'newsAuthorDark' : 'newsAuthorLight';
    //Verifica se è presente l'articolo nei preferiti
    let id = link;
    const isPreferito = listaFavoriti.some(item => item.id === id);

    //Funzione per aprire il link all'articolo completo
    const apriFinestraArticolo = () => {
        window.open(link, '_blank');
    }

    //Funzione ( di callback) per aggiungere l'articolo ai preferiti
    const aggiungiPreferiti = () => {
        const id = link;
        props.addPrefe(id, dati);
    }

    return (
        <div className={`newsThumbnail ${temaCorrenteContainer}`}>
            {/* Immagine */}
            <div className='newsImage' onClick={apriFinestraArticolo}>
                <img
                    src={url ? url : Placeholder}
                    alt={stringTitolo} />
            </div>
            {/* Titolo e descrizione */}
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
            {/* Box dati */}
            <div className={`newsAuthor ${temaCorrenteAuthor}`}>
                {fonte ? (
                    <p>{fonte} <br />{giorno}/{mese}/{anno}</p>
                ) : (
                    <p>Nessuna fonte <br />{giorno}/{mese}/{anno}</p>
                )}
                <IconButton onClick={aggiungiPreferiti}>
                    {isPreferito ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
            </div>
        </div >
    )
}

export default NewsThumbnail