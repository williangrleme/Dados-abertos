import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './App.css';
import '@mdi/font/css/materialdesignicons.css' 
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import TableAutorAno from './components/TableAutorAno';
import TableResumo from './components/TableResumo';
import TableEstadoAutor from './components/TableEstadoAutor';
import Table from './components/Table';
import TableSimples from './components/TableSimples';
import Title from './components/Title'
import React, { useState, useEffect } from 'react';

import geral from './assets/geral.png';
import autor from './assets/autor.png';
import estado from './assets/estado.png';
import orgao from './assets/orgao.png';
import ano from './assets/ano.png';
import autorano from './assets/autorano.png';
import estadoautor from './assets/estadoautor.png';

function App() {

  const [tableGeralAberta, setTableGeralAberta] = useState(false);
  const [tableAutorAberta, setTableAutorAberta] = useState(false);
  const [tableAutorAnoAberta, setTableAutorAnoAberta] = useState(false);
  const [tableEstadoAberta, setTableEstadoAberta] = useState(false);
  const [tableEstadoAutorAberta, setTableEstadoAutorAberta] = useState(false);
  const [tableAnoAberta, setTableAnoAberta] = useState(false);
  const [tableOrgaoAberta, setTableOrgaoAberta] = useState(false);

  return (
    <div>
      <Navbar/>
      <Title/>
      <TableResumo/>

      <h1 className='container-airbnb text-white fw-bold'>Visualizar por</h1>

      <div className='text-white container-airbnb row text-center'>  
        <div className='row mt-5'>
          <div className='col-12' >
                {tableGeralAberta ? (
                  <span className="fs-1 mdi mdi-close-circle-outline" onClick={() => setTableGeralAberta(false)}></span>
                ) : (
                  <img src={geral} alt="Título" onClick={() => setTableGeralAberta(true)} className="tables" />
                )}
                {tableGeralAberta && <Table />}
              </div>
        </div>
        <div className='row mt-5'>
          <div className='col-6'>
            {tableAutorAberta ? (
              <span className="fs-1 mdi mdi-close-circle-outline" onClick={() => setTableAutorAberta(false)}></span>
            ) : (
              <img src={autor} alt="Título" onClick={() => setTableAutorAberta(true)} className="tables" />
            )}
            {tableAutorAberta && <TableSimples campo="autor"/>}
          </div>
          <div className='col-6'>
            {tableEstadoAberta ? (
              <span className="fs-1 mdi mdi-close-circle-outline" onClick={() => setTableEstadoAberta(false)}></span>
            ) : (
              <img src={estado} alt="Título" onClick={() => setTableEstadoAberta(true)} className="tables" />
            )}
            {tableEstadoAberta && <TableSimples campo="estado"/>}
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-6'>
            {tableAnoAberta ? (
              <span className="fs-1 mdi mdi-close-circle-outline" onClick={() => setTableAnoAberta(false)}></span>
            ) : (
              <img src={ano} alt="Título" onClick={() => setTableAnoAberta(true)} className="tables" />
            )}
            {tableAnoAberta && <TableSimples campo="ano"/>}
          </div>

          <div className='col-6'>
            {tableOrgaoAberta ? (
              <span className="fs-1 mdi mdi-close-circle-outline" onClick={() => setTableOrgaoAberta(false)}></span>
            ) : (
              <img src={orgao} alt="Título" onClick={() => setTableOrgaoAberta(true)} className="tables" />
            )}
            {tableOrgaoAberta && <TableSimples campo="orgao"/>}
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-6'>
                {tableAutorAnoAberta ? (
                  <span className="fs-1 mdi mdi-close-circle-outline" onClick={() => setTableAutorAnoAberta(false)}></span>
                ) : (
                  <img src={autorano} alt="Título" onClick={() => setTableAutorAnoAberta(true)} className="tables" />
                )}
                {tableAutorAnoAberta && <TableAutorAno/>}
              </div>

              <div className='col-6'>
                {tableEstadoAutorAberta ? (
                  <span className="fs-1 mdi mdi-close-circle-outline" onClick={() => setTableEstadoAutorAberta(false)}></span>
                ) : (
                  <img src={estadoautor} alt="Título" onClick={() => setTableEstadoAutorAberta(true)} className="tables" />
                )}
                {tableEstadoAutorAberta && <TableEstadoAutor/>}
              </div>
          </div>
      </div>




  

  

  

      <Footer/>
    </div>
  )
}

export default App
