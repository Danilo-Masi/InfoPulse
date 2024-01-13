import React, { Component } from 'react';
//CSS
import './PaginationElement.css';
//Material UI
import Pagination from '@mui/material/Pagination';

export class PaginationElement extends Component {

    constructor(props) {
        super(props);
    }

    //Funzione (di callback) per cambiare la pagina di visualizzazione degli articoli
    handlePageChange = (event, page) => {
        this.props.onPageChange(page);
    }

    render() {

        const { numeroPagina, currentPage } = this.props;

        return (
            <div className='pagination'>
                <Pagination
                    page={currentPage}
                    count={numeroPagina}
                    shape="rounded"
                    onChange={this.handlePageChange} />
            </div>
        )
    }
}

export default PaginationElement;