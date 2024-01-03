import React, { Component } from 'react';
//CSS
import './PrefeThumbnail.css';

export class PrefeThumbnail extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        //Preleva la dimensione della vista
        var vista = window.innerWidth;
        const { datiPrefe } = this.props;
        //Creazione dei dati
        var url = datiPrefe.urlToImage;
        var stringTitolo = datiPrefe.title;
        var stringDescrizione = datiPrefe.description;

        return (
            <div className='containerPrefe'>
                {/* IMMAGINE */}
                <div className='prefeImage'>
                    <img src={url} />
                </div>
                {/* TITOLO E DESCRIZIONE */}
                <div className='prefeInfo'>
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
            </div>
        )
    }
}

export default PrefeThumbnail