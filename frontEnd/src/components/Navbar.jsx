import React, { useState } from 'react';
import './css/Navbar.css';
import logo from '../assets/OrçamentoSecreto.png';
import { Modal } from 'react-bootstrap';

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <nav className='nav-topo'>
        <div className='container-airbnb d-flex align-items-center justify-content-between'>
          <div className='col-6'>
            <img className='logo' src={logo} alt='Logo do Site' />
          </div>
        <div  className='row d-flex align-items-center justify-content-end'>
        <div className='col'>
            <a className='link-especial' onClick={openModal}>
              Legenda
            </a>
          </div>
          <div className='col '>
            <div className='row d-flex align-items-center'>
                <a href='https://exposedvocesabia.wixsite.com/exposed---tudo-que-e/blank-1' target='_blank' className='link-especial'>
                Entenda <i className='mdi mdi-help-box'></i>  </a>
            </div>
          </div>
        </div>
         
         <Modal show={showModal} onHide={closeModal} contentClassName='bg-dark text-white border-dark'>
              <Modal.Header closeButton>
                <Modal.Title>Gráfico</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <table class="table table-sm table-dark">
                <tbody>
                    <tr>
                    <td>Autor</td>
                    <td>Nome do parlamentar que apresentou a emenda</td>
                    </tr>

                    <tr>
                    <td>Tipo de AutorAutor</td>
                    <td> Tipo de autor da emenda (por exemplo, deputado, senador)</td>
                    </tr>

                    <tr>
                    <td>Benficiário</td>
                    <td>Nome do beneficiário da emenda</td>
                    </tr>

                    <tr>
                    <td>Estado</td>
                    <td>Unidade Federativa (Estado) do beneficiário</td>
                    </tr>

                    <tr>
                    <td>Orgão</td>
                    <td>Nome do órgão responsável pela execução da emenda</td>
                    </tr>

                    <tr>
                    <td>UO</td>
                    <td>Código da unidade orçamentária do órgão</td>
                    </tr>

                    <tr>
                    <td>Ano</td>
                    <td>Ano em que a emenda foi cadastrada</td>
                    </tr>

                    <tr>
                    <td>Objeto</td>
                    <td>Descrição do objeto da emenda</td>
                    </tr>

                    <tr>
                    <td>Justificativa</td>
                    <td> Justificativa apresentada para a emenda</td>
                    </tr>

                    <tr>
                    <td>Valor</td>
                    <td>Recursos públicos que serão alocados para a finalidade ou destino descrito na emenda</td>
                    </tr>
                    
                </tbody>
                </table>
              </Modal.Body>
              <Modal.Footer>
                <button className='botao btn btn-dark border-white' onClick={closeModal}>Fechar</button>
              </Modal.Footer>
            </Modal>
        </div>
      </nav>
    </div>
  );
}
