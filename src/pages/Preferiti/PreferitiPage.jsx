import React, { Component } from 'react';
//CSS
import '../../assets/style/Style.css';
//Componenti
import PrefeList from '../../components/PrefeList/PrefeList';

export class PreferitiPage extends Component {

  constructor(props) {
    super(props);
  }

  onBack = (num) => {
    this.props.backToBack(num);
  }

  render() {

    return (
      <div className='containerMain'>
        <PrefeList tornaIndietro={this.onBack}/>
      </div>
    )
  }
}

export default PreferitiPage