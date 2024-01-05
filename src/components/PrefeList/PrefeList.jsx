import React, { Component } from 'react';
//CSS
import './PrefeList.css';
//Material UI
//Material UI
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//Componenti 
import PrefeThumbnail from '../PrefeThumbnail/PrefeThumbnail';

export class PrefeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaPrefe: [],
        }
    }

    componentDidMount() {
        this.caricaLista();
    }

    caricaLista = () => {
        console.log('Carico preferiti');
        const prefe = JSON.parse(localStorage.getItem('listaPreferiti'));
        console.log(" Lista preferiti: " + prefe);
        if (prefe !== null || Array.isArray(prefe)) {
            this.setState({ listaPrefe: prefe });
        } else {
            this.setState({ listaPrefe: [] });
        }
    }

    backPage = () => {
        console.log('ciao');
        let num = 0;
        this.props.tornaIndietro(num);
    }

    // Funzione per aggiungere un articolo alla lista degli articoli preferiti
    removePreferiti = (id) => {
        console.log("Rimuovo l'articolo " + id);
        //Carico la lista dei preferiti dal local storage
        let prefe = JSON.parse(localStorage.getItem('listaPreferiti')) || [];
        //Filtra la lista per escludere l'articolo con l'id specificato
        let preferiti = prefe.filter(el => el.id !== id);
        //Aggiorna il localStorage con la nuova lista
        localStorage.setItem('listaPreferiti', JSON.stringify(preferiti));
        //Aggiorna lo stato locale per riflettere immediatamente la rimozione
        this.setState({ listaPrefe: preferiti });
    }

    render() {

        const { listaPrefe } = this.state;

        return (
            <div className='prefeList'>
                <div className='prefeTitle'>
                    <IconButton onClick={this.backPage}>
                        <ArrowBackIcon />
                    </IconButton>
                    <h2>Lista preferiti...</h2>
                </div>
                <div className='listaPreriti'>
                    {listaPrefe && listaPrefe.length > 0
                        ? listaPrefe.map((el, index) => {
                            return (
                                <PrefeThumbnail
                                    key={index}
                                    datiPrefe={el.dati}
                                    rimuoviPrefe={this.removePreferiti} />
                            )
                        }) : (<p>Nessun articolo preferito</p>)}
                </div>
            </div>
        )
    }
}

export default PrefeList