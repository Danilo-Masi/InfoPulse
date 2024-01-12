import React, { Component } from 'react';
//CSS
import './Pagination.css';
//Material UI
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export class Pagination extends Component {
    render() {
        return (
            <div className='pagination'>
                <div className='pagPrecedente'>
                    <ArrowBackIcon />
                    <p>Precedente </p>
                </div>
                <div className='pagSuccessivo'>
                    <p>Successiva</p>
                    <ArrowForwardIcon />
                </div>
            </div>
        )
    }
}

export default Pagination