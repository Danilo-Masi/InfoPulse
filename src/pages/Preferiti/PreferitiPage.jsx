import React, { Component } from 'react';
//CSS
import '../../assets/style/Style.css';
//Componenti
import PrefeList from '../../components/PrefeList/PrefeList';

export class PreferitiPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { preferiti } = this.props;
    const lun = preferiti.length;

    return (
      <div className='containerMain'>
        {preferiti
          ? (<PrefeList listaPrefe={preferiti} />)
          : (<p>Lista preferiti vuota</p>)
        }
      </div>
    )
  }
}

export default PreferitiPage