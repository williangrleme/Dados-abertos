import React from 'react'
import './css/Title.css';

import titulo from '../assets/titulo.png';

export default function Title() {
  return (
    <div className='container-airbnb justify-content-center' >
        <img className='titulo' src={titulo} alt="Orçamento Secreto"/>
    </div>
  )
}
