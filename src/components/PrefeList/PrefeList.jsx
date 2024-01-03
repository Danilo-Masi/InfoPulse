import React, { Component } from 'react';
//CSS
import './PrefeList.css';
//Componenti 
import PrefeThumbnail from '../PrefeThumbnail/PrefeThumbnail';

export class PrefeList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { listaPrefe } = this.props;

        return (
            <div className='prefeList'>
                <div className='prefeTitle'>
                    <h2>Lista preferiti...</h2>
                </div>
                <div className='listaPreriti'>
                    {listaPrefe && listaPrefe.length > 0
                        ? listaPrefe.map((el, index) => {
                            return (
                                <PrefeThumbnail
                                    datiPrefe={el.dati}
                                    key={index} />
                            )
                        }) : (<p>Nessun articolo preferito</p>)}
                </div>
            </div>
        )
    }
}

export default PrefeList