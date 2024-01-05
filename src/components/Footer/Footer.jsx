import React, { Component } from 'react';
//CSS
import './Footer.css';

export class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <div className='footerLogo'>
          <h1>InfoPulse</h1>
          <p>Developed with &#10084;&#65039; and &#127829; by Danilo Masi </p>
        </div>
        <div className='footerLink'>
          <h3>Titolo 1</h3>
          <p>link 1</p>
          <p>link 2</p>
          <p>link 3</p>
        </div>
        <div className='footerLink'>
        <h3>Titolo 1</h3>
          <p>link 1</p>
          <p>link 2</p>
          <p>link 3</p>
        </div>
      </div>
    )
  }
}

export default Footer