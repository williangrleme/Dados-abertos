import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Table.css';

export default function TableResumo() {
  const [processos, setProcessos] = useState([]);
  const [filteredProcessos, setFilteredProcessos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/processo/processoResumo')
      .then(response => {
        setProcessos(response.data);
        setFilteredProcessos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container-airbnb row mb-5">
      <p className="fw-bold my-1 titulo">Resumo</p>

      <table className="table table-dark table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Processos{' '} </th>
            <th scope="col">Valor Total{' '} </th>
            <th scope="col">Estados{' '}</th>
            <th scope="col">Beneficiarios{' '}</th>
            <th scope="col">Autores{' '}</th>
            <th scope="col">Orgãos{' '}</th>
            <th scope="col">Anos{' '}</th>
            <th scope="col">Valor Máximo{' '}</th>
            <th scope="col">Valor Mínimo{' '}</th>
            
          </tr>
        </thead>
        <tbody>
          {filteredProcessos.map(processo => (
            <tr key={processo.numero}>
              <td>{processo.quantidade_processos}</td>
              <td>{processo.valor_total_processos}</td>
              <td>{processo.quantidade_estados}</td>
              <td>{processo.quantidade_beneficiarios}</td>
              <td>{processo.quantidade_autores}</td>
              <td>{processo.quantidade_orgao}</td>
              <td>{processo.Anos}</td>
              <td>{processo.maior_valor}</td>
              <td>{processo.menor_valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
