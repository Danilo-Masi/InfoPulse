import React from "react";
//CSS
import "./NewsThumbnail.css";
//Images
import Placeholder from "../../assets/images/Placeholder.jpg";
//Material UI
import IconButton from "@mui/material/IconButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { render } from "react-dom";

function NewsThumbnail(props) {
  const { dati } = props;
  var stringTitolo = dati.title;
  var stringDescrizione = dati.description;
  var fonte = dati.source.name;
  var url = dati.urlToImage;
  var link = dati.url;
  //Creazione della data
  var dataPubblicazione = new Date(dati.publishedAt);
  var giorno = dataPubblicazione.getDate();
  var mese = dataPubblicazione.getMonth();
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
  //Preleva la dimensione della vista
  var vista = window.innerWidth;
  //Preleva il valore del tema dal localStorage
  const temaSalvato = localStorage.getItem("temaSalvato");
  //Imposta le classi in base al tema corrente
  const temaCorrenteContainer =
    temaSalvato === "dark" ? "newsThumbnailDark" : "newsThumbnailLight";
  const temaCorrenteAuthor =
    temaSalvato === "dark" ? "newsAuthorDark" : "newsAuthorLight";
  //Verifica se è presente l'articolo nei preferiti
  const prefe = JSON.parse(localStorage.getItem("listaPreferiti")) || [];
  let id = link;
  const isPreferito = prefe.some((item) => item.id === id);

  //Funzione per aprire il link all'articolo completo
  const apriFinestraArticolo = () => {
    window.open(link, "_blank");
  };

  //Funzione ( di callback) per aggiungere l'articolo ai preferiti
  const aggiungiPreferiti = () => {
    const id = link;
    props.addPrefe(id, dati);
  };

  return (
    <div className={`newsThumbnail ${temaCorrenteContainer}`}>
      {/* Immagine */}
      <div className="newsImage" onClick={apriFinestraArticolo}>
        <img src={url ? url : Placeholder} alt={stringTitolo} />
      </div>
      {/* Titolo e descrizione */}
      <div className="newsInfo" onClick={apriFinestraArticolo}>
        <h3>
          {vista < 728
            ? stringTitolo && stringTitolo.split(" ").length > 7
              ? stringTitolo.split(" ").slice(0, 7).join(" ") + "..."
              : stringTitolo
            : stringTitolo && stringTitolo.split(" ").length > 8
              ? stringTitolo.split(" ").slice(0, 8).join(" ") + "..."
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
      <div className={`newsAuthor ${temaCorrenteAuthor}`}>
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
        <IconButton onClick={aggiungiPreferiti}>
          {isPreferito ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </div>
    </div>
  );
}

export default NewsThumbnail;
