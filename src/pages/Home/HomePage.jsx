import React, { Component } from 'react';
//CSS
import '../../assets/style/Style.css';
//Componenti
import NewsList from '../../components/NewsList/NewsList';

export class HomePage extends Component {

  constructor(props) {
    super(props);
  }

  nuoviPreferiti = () => {
    console.log('Prefe --- 3');
    this.props.onAggiuni();
  }

  render() {
    return (
      <div className='containerMain'>
        <NewsList aggiungiPreferiti={this.nuoviPreferiti}/>
      </div>
    )
  }
}

export default HomePage