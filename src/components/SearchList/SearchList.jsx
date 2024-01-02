import React, { Component } from 'react';
//CSS
import './SearchList.css';
//Componenti
import NewsThumbnail from '../NewsThumbnail/NewsThumbnail';

export class SearchList extends Component {

    constructor(props) {
        super(props);
    }

    apriArticoloCompleto = (num, dati) => {
        console.log('SearchList (2) --- ' + num);
        this.props.openPage(num, dati);
    }

    addPreferiti = () => {
        console.log('Prefe Search --- 2');
        this.props.aggiungiPreferiti();
      }

    render() {

        const { risultati } = this.props;

        return (
            <div className='searchList'>
                {risultati.length > 0 ? (
                    risultati.map((el, index) => (
                        <NewsThumbnail
                            key={index}
                            dati={el}
                            addPrefe={this.addPreferiti}
                            apriArticolo={this.apriArticoloCompleto} />
                    ))
                ) : (
                    <p className='caricamentoRicerca'>Fai la tua ricerca</p>
                )}
            </div>
        )
    }
}

export default SearchList