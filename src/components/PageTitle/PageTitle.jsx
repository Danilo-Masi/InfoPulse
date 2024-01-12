import React, { Component } from 'react';
//CSS
import './PageTitle.css';
//Material UI
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export class PageTitle extends Component {

    constructor(props) {
        super(props);
    }

    //Funzione (di callback) per tornare alla HomePage
    tornaIndietro = (num) => {
        this.props.tornaIndietro(num);
    }

    render() {

        const { titolo, stringaRicerca, pagina } = this.props;

        return (
            <div className='pageTitle'>
                {pagina ?
                    (<IconButton onClick={() => this.tornaIndietro(0)}>
                        <ArrowBackIcon />
                    </IconButton>)
                    : ('')
                }
                <h1>{titolo} {stringaRicerca ? stringaRicerca : ""}</h1>
            </div>
        )
    }
}

export default PageTitle