import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { Modal } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './css/Table.css';

export default function TableSimples({ campo }) {
  const [processos, setProcessos] = useState([]);
  const [filteredProcessos, setFilteredProcessos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [campoSuggestions, setCampoSuggestions] = useState([]);
  const [campoSearchValue, setCampoSearchValue] = useState('');
  const [valorOrder, setValorOrder] = useState('asc');
  const [quantidadeOrder, setQuantidadeOrder] = useState('asc');
  const [campoOrder, setCampoOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [selectedChart, setSelectedChart] = useState('');
  const [resumo, setResumo] = useState([]);
  const [processosPorPagina, setProcessosPorPagina] = useState(3);
  const totalPages = Math.ceil(filteredProcessos.length / processosPorPagina);
  const currentPage = Math.floor(startIndex / processosPorPagina) + 1;

  const isCampoAno = campo === 'ano';

  const transformProcessoAnoToString = (processos) => {
    if (isCampoAno) {
      return processos.map((processo) => {
        return {
          ...processo,
          ano: processo.ano.toString(),
          valor_total_processos: processo.valor_total_processos.toString()
        };
      });
    }
    return processos;
  };

  const handleChangeProcessosPorPagina = (event) => {
    const value = parseInt(event.target.value);
    setProcessosPorPagina(value);
    setStartIndex(0);
  };

  const openModal = (chart) => {
    setSelectedChart(chart);
    setShowModal(true);
  };

  const handleNext = () => {
    const nextIndex = startIndex + processosPorPagina;
    if (nextIndex < processos.length) {
      setStartIndex(nextIndex);
      setValorOrder('asc');
    }
  };
  
  const handlePrevious = () => {
    const previousIndex = startIndex - processosPorPagina;
    if (previousIndex >= 0) {
      setStartIndex(previousIndex);
      setValorOrder('asc');
    }
  };
  
  const handleReset = () => {
    setFilteredProcessos(processos);
    setCampoSearchValue('');
    setCampoSuggestions([]);
    setValorOrder('asc');
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/processo/processoPor${campo}`)
      .then(response => {
        const transformedProcessos = transformProcessoAnoToString(response.data);
        setProcessos(transformedProcessos);
        setFilteredProcessos(transformedProcessos);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3000/processo/processoResumo')
      .then(response => {
        setResumo(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  const getCampoSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : processos.filter(processo => processo[campo].toLowerCase().slice(0, inputLength) === inputValue);
  };

  const renderCampoSuggestion = suggestion => <div>{suggestion[campo]}</div>;

  const onCampoSuggestionSelected = (event, { suggestionValue }) => {
    setCampoSearchValue(suggestionValue);
    setFilteredProcessos(processos.filter(processo => processo[campo] === suggestionValue));
    setValorOrder('asc');
  };

  const handleSortByValor = () => {
    const sortedProcessos = [...filteredProcessos];

    if (valorOrder === 'asc') {
      sortedProcessos.sort((a, b) => a.valor_total_processos - b.valor_total_processos);
      setValorOrder('desc');
    } else {
      sortedProcessos.sort((a, b) => b.valor_total_processos - a.valor_total_processos);
      setValorOrder('asc');
    }

    setFilteredProcessos(sortedProcessos);
  };

  const handleSortByQuantidade = () => {
    const sortedProcessos = [...filteredProcessos];

    if (quantidadeOrder === 'asc') {
      sortedProcessos.sort((a, b) => a.quantidade_processos - b.quantidade_processos);
      setQuantidadeOrder('desc');
    } else {
      sortedProcessos.sort((a, b) => b.quantidade_processos - a.quantidade_processos);
      setQuantidadeOrder('asc');
    }

    setFilteredProcessos(sortedProcessos);
  };

  const handleSortByCampo = () => {
    const sortedProcessos = [...filteredProcessos];

    if (campoOrder === 'asc') {
      sortedProcessos.sort((a, b) => {
        if (a[campo] < b[campo]) return -1;
        if (a[campo] > b[campo]) return 1;
        return 0;
      });
      setCampoOrder('desc');
    } else {
      sortedProcessos.sort((a, b) => {
        if (a[campo] > b[campo]) return -1;
        if (a[campo] < b[campo]) return 1;
        return 0;
      });
      setCampoOrder('asc');
    }

    setFilteredProcessos(sortedProcessos);
  };

  const onCampoInputChange = (event, { newValue }) => {
    setCampoSearchValue(newValue);
    setCampoSuggestions(getCampoSuggestions(newValue));
  };

  const campoInputProps = {
    placeholder: `Pesquisar por ${campo}`,
    value: campoSearchValue,
    onChange: onCampoInputChange,
  };

  useEffect(() => {
    setStartIndex(0);
  }, [campoSearchValue]);

  return (
    <div className="container-airbnb row border-bottom border-dark">
      <div className="container">
        <div className="row">
          <span className="fs-2 fw-bold titulo">{`Por ${campo}`}</span>
        </div>
        <div className="row text-white justify-content-between align-items-center my-1">
          <div className="col mt-2 autosuggest-container">
            <Autosuggest
              suggestions={campoSuggestions}
              onSuggestionsFetchRequested={({ value }) => setCampoSuggestions(getCampoSuggestions(value))}
              onSuggestionsClearRequested={() => setCampoSuggestions([])}
              onSuggestionSelected={onCampoSuggestionSelected}
              getSuggestionValue={suggestion => suggestion[campo]}
              renderSuggestion={renderCampoSuggestion}
              inputProps={campoInputProps}
              containerProps={{
                className: 'autosuggest-suggestions-container',
              }}
            />
          </div>
          <div className="col">
            <button type="button" className="fs-6 p-2 botao btn btn-dark border-dark" onClick={handleReset}>
              <i className="fs-6 mdi mdi-backspace"></i>
              &nbsp; Limpar
            </button>
          </div>
          <div className='col'>
            <span className="fw-bold">Processos por página:&nbsp;</span>
            <select className='text-white select border-0' value={processosPorPagina} onChange={handleChangeProcessosPorPagina}>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className="col">
            <span className="fw-bold">Página: {currentPage}/{totalPages}</span>
          </div>
        </div>
      </div>

      <table className="table table-dark table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">
              {campo}{' '}
              <i
                className={`mdi mdi-chevron-${campoOrder === 'asc' ? 'down' : 'up'}`}
                onClick={handleSortByCampo}
              ></i>
            </th>
            <th scope="col">
              Quantidade
              <i
                className={`mdi mdi-chevron-${quantidadeOrder === 'asc' ? 'down' : 'up'}`}
                onClick={handleSortByQuantidade}
              ></i>
            </th>
            <th scope="col">
              Valor
              <i
                className={`mdi mdi-chevron-${valorOrder === 'asc' ? 'down' : 'up'}`}
                onClick={handleSortByValor}
              ></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProcessos.slice(startIndex, startIndex + processosPorPagina).map(processo => (
            <tr key={processo.numero}>
              <td>{processo[campo]}</td>
              <td>{processo.quantidade_processos}</td>
              <td>{processo.valor_total_processos.toLocaleString('pt-BR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className='botao btn btn-dark border-dark' onClick={handlePrevious} disabled={startIndex === 0}>
          Anterior
        </button>
        <button className='botao btn btn-dark border-dark' onClick={handleNext} disabled={startIndex + processosPorPagina >= processos.length}>
          Próximo
        </button>
      </div>

      <div className='mt-2 mb-4'>
      <button className='botao btn btn-dark border-dark"' onClick={() => openModal('quantidade_processos')}>Abrir Gráfico de Quantidade</button>
      <button className='botao btn btn-dark border-dark' onClick={() => openModal('valor_total_processos')}>Abrir Gráfico de Valor</button>

      <Modal show={showModal} onHide={() => setShowModal(false) }contentClassName='bg-dark text-white border-dark'>
      <Modal.Header closeButton>
        <Modal.Title>Gráfico</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedChart === 'quantidade_processos' && (
          <BarChart width={450} height={300} data={filteredProcessos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={campo} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantidade_processos" fill="#58A491" />
          </BarChart>
        )}
        {selectedChart === 'valor_total_processos' && (
           <BarChart width={450} height={300} data={filteredProcessos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={campo} />
            <YAxis domain={[0, 'dataMax + 6000000']} />
            <Tooltip />
            <Legend />
            <Bar dataKey="valor_total_processos" fill="#58A491" />
          </BarChart>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => setShowModal(false)}>Fechar</button>
      </Modal.Footer>
    </Modal>
      </div>
    </div>
  );
}
