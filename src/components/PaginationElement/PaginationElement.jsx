import React, { Component } from 'react';
//CSS
import './PaginationElement.css';
//Material UI
import Pagination from '@mui/material/Pagination';

export class PaginationElement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paginaCorrente: this.props.currentPage,
        }
    }

    componentDidUpdate(prevProps) {
        this.settaPagina(prevProps);
    }

    //Funzione che al cambio della categoria ed il ricaricamento delle news torna sulla pagina 1
    settaPagina = (prevProps) => {
        const {categoria} = this.props;
        if (categoria !== prevProps.categoria) {
            this.setState({ paginaCorrente: 1 });
        }
    }

    //Funzione (di callback) per cambiare la pagina di visualizzazione degli articoli
    handlePageChange = (event, page) => {
        const { paginaCorrente } = this.state;
        if (paginaCorrente !== page) {
            this.setState({ paginaCorrente: page });
            this.props.onPageChange(page);
        }
    }

    render() {

        const { numeroPagina } = this.props;
        const { paginaCorrente } = this.state;

        return (
            <div className='pagination'>
                <Pagination
                    page={paginaCorrente}
                    count={numeroPagina}
                    shape="rounded"
                    onChange={this.handlePageChange} />
            </div>
        )
    }
}

export default PaginationElement;