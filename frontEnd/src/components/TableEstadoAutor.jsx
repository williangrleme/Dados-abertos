import React from 'react'
import { useState, useEffect } from 'react';
import './css/Table.css';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { Modal, Button } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function TableEstadoAutor() {
  const [processos, setProcessos] = useState([]);
  const [filteredProcessos, setFilteredProcessos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [estadoSuggestions, setEstadoSuggestions] = useState([]);
  const [estadoSearchValue, setEstadoSearchValue] = useState('');
  const [autorSuggestions, setAutorSuggestions] = useState([]);
  const [autorSearchValue, setAutorSearchValue] = useState('');
  const [valorOrder, setValorOrder] = useState('asc');
  const [quantidadeOrder, setQuantidadeOrder] = useState('asc');
  const [autorOrder, setAutorOrder] = useState('asc');
  const [estadoOrder, setEstadoOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [selectedChart, setSelectedChart] = useState('');
  const [resumo, setResumo] = useState([]);
  const [processosPorPagina, setProcessosPorPagina] = useState(3);
  const totalPages = Math.ceil(filteredProcessos.length / processosPorPagina);
  const currentPage = Math.floor(startIndex / processosPorPagina) + 1;
  const [searchBy, setSearchBy] = useState(''); // Estado inicial vazio
  const [searchValue, setSearchValue] = useState(''); // Estado inicial vazio


  
  const transformProcessoAnoToString = (processos) => {
    return processos.map((processo) => {
      return {
        ...processo,
        valor_total_processos: processo.valor_total_processos.toString()
      };
    });
  };

  useEffect(() => {
  let filtered = processos;

  if (searchBy === 'estado' && searchValue !== '') {
    filtered = filtered.filter((processo) => processo.Estado === searchValue);
  } else if (searchBy === 'autor' && searchValue !== '') {
    filtered = filtered.filter((processo) => processo.Autor === searchValue);
  }

  setFilteredProcessos(filtered);
}, [processos, searchBy, searchValue]);


  const handleChangeProcessosPorPagina = (event) => {
    const value = parseInt(event.target.value);
    setProcessosPorPagina(value);
    setStartIndex(0);
    setSearchBy('');
    setSearchValue('');
  };
  

const openModal = (chartType) => {
  setSelectedChart(chartType);
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
  setEstadoSuggestions([]);
  setAutorSuggestions([]);
  setAutorSearchValue('');
  setEstadoSearchValue('');
  setValorOrder('asc'); // Redefine a direção da ordenação para ascendente
};

  

  useEffect(() => {
    axios.get(`http://localhost:3000/processo/processoPorEstadoAutor`)

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

  // Define as sugestões para o campo de busca
  const getEstadoSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : processos.filter(processo =>
      processo.Estado.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  const getAutorSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : processos.filter(processo =>
      processo.Autor.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // Renderiza as sugestões de busca
  const renderEstadoSuggestion = (suggestion) => (
    <div>
      {suggestion.Estado}
    </div>
  );
  const renderAutorSuggestion = (suggestion) => (
    <div>
      {suggestion.Autor}
    </div>
  );

  // Define a ação a ser tomada quando o usuário seleciona uma sugestão
  const onEstadoSuggestionSelected = (event, { suggestionValue }) => {
    setEstadoSearchValue(suggestionValue);
    setFilteredProcessos(processos.filter(processo => processo.Estado === suggestionValue));
    setValorOrder('asc'); // Redefine a direção da ordenação ao selecionar uma sugestão
  };
  const onAutorSuggestionSelected = (event, { suggestionValue }) => {
    setAutorSearchValue(suggestionValue);
    setFilteredProcessos(processos.filter(processo => processo.Autor === suggestionValue));
    setValorOrder('asc'); // Redefine a direção da ordenação ao selecionar uma sugestão
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
  
  const handleSortByEstado = () => {
    const sortedProcessos = [...filteredProcessos];
  
    if (estadoOrder === 'asc') {
      sortedProcessos.sort((a, b) => {
        if (a.Estado < b.Estado) return -1;
        if (a.Estado > b.Estado) return 1;
        return 0;
      });
      setEstadoOrder('desc');
    } else {
      sortedProcessos.sort((a, b) => {
        if (a.Estado > b.Estado) return -1;
        if (a.Estado < b.Estado) return 1;
        return 0;
      });
      setEstadoOrder('asc');
    }
  
    setFilteredProcessos(sortedProcessos);
  };

  const handleSortByAutor = () => {
    const sortedProcessos = [...filteredProcessos];
  
    if (autorOrder === 'asc') {
      sortedProcessos.sort((a, b) => {
        if (a.Autor < b.Autor) return -1;
        if (a.Autor > b.Autor) return 1;
        return 0;
      });
      setAutorOrder('desc');
    } else {
      sortedProcessos.sort((a, b) => {
        if (a.Autor > b.Autor) return -1;
        if (a.Autor < b.Autor) return 1;
        return 0;
      });
      setAutorOrder('asc');
    }
  
    setFilteredProcessos(sortedProcessos);
  };


  // Define o valor do campo de busca quando o usuário digita
  const onEstadoInputChange = (event, { newValue }) => {
    setEstadoSearchValue(newValue);
    setEstadoSuggestions(getEstadoSuggestions(newValue));
  };
  const onAutorInputChange = (event, { newValue }) => {
    setAutorSearchValue(newValue);
    setAutorSuggestions(getEstadoSuggestions(newValue));
  };

  // Configuração do Autosuggest
  const estadoInputProps = {
    placeholder: `Pesquisar por Estado`,
    value: estadoSearchValue,
    onChange: onEstadoInputChange,
  };
  const autorInputProps = {
    placeholder: `Pesquisar por Autor`,
    value: autorSearchValue,
    onChange: onAutorInputChange,
  };

  useEffect(() => {
    setStartIndex(0);
  }, [estadoSearchValue]);
  useEffect(() => {
    setStartIndex(0);
  }, [autorSearchValue]);
  

  return (
    <div className="container-airbnb row ">

      <div className='container'>
        <div className='row'>
          <span className='fs-4 fw-bold titulo'>{`Por Estado/Autor`}</span>
        </div>
        <div className="row text-white justify-content-between align-items-center my-1">
          <div className="col">
            <select className='text-white select border-0' value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
              <option value="">Pesquisar por</option>
              <option value="autor">Autor</option>
              <option value="estado">Estado</option>
            </select>
            {searchBy === 'estado' && (
              <Autosuggest
                suggestions={estadoSuggestions}
                onSuggestionsFetchRequested={({ value }) => setEstadoSuggestions(getEstadoSuggestions(value))}
                onSuggestionsClearRequested={() => setEstadoSuggestions([])}
                onSuggestionSelected={onEstadoSuggestionSelected}
                getSuggestionValue={(suggestion) => suggestion.Estado}
                renderSuggestion={renderEstadoSuggestion}
                inputProps={estadoInputProps}
                containerProps={{
                  className: 'autosuggest-suggestions-container',
                }}
              />
            )}
            {searchBy === 'autor' && (
              <Autosuggest
                suggestions={autorSuggestions}
                onSuggestionsFetchRequested={({ value }) => setAutorSuggestions(getAutorSuggestions(value))}
                onSuggestionsClearRequested={() => setAutorSuggestions([])}
                onSuggestionSelected={onAutorSuggestionSelected}
                getSuggestionValue={(suggestion) => suggestion.Autor}
                renderSuggestion={renderAutorSuggestion}
                inputProps={autorInputProps}
                containerProps={{
                  className: 'autosuggest-suggestions-container',
                }}
              />
            )}
            </div>
          <div className='col'>
          <button type="button" className="botao fs-6 p-2 btn btn-light border-dark" onClick={handleReset}>
              <i className='fs-6 mdi mdi-backspace'></i>
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
      <th scope="col">Estado{' '}
        <i
          className={`mdi mdi-chevron-${estadoOrder === 'asc' ? 'down' : 'up'}`}
          onClick={handleSortByEstado}
        ></i></th>
      <th scope="col">Autor{' '}
        <i
          className={`mdi mdi-chevron-${autorOrder === 'asc' ? 'down' : 'up'}`}
          onClick={handleSortByAutor}
        ></i>
      </th>
      <th scope="col">Quantidade
        <i
          className={`mdi mdi-chevron-${quantidadeOrder === 'asc' ? 'down' : 'up'}`}
          onClick={handleSortByQuantidade}
        ></i>
      </th>
      <th scope="col">Valor
        <i
          className={`mdi mdi-chevron-${valorOrder === 'asc' ? 'down' : 'up'}`}
          onClick={handleSortByValor}
        ></i>
      </th>
    </tr>
  </thead>
  <tbody>
    {filteredProcessos.slice(startIndex, startIndex + processosPorPagina).map((processo) => (
         <tr key={processo.numero}>
          <td>{processo.Estado}</td>
          <td>{processo.Autor}</td>
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
<div>
        <div className='mt-2 mb-4'>
          <button className='botao btn btn-dark border-dark' onClick={() => openModal('quantidade_processos')}>Abrir Gráfico de Quantidade</button>
          <button className='botao btn btn-dark border-dark' onClick={() => openModal('valor_total_processos')}>Abrir Gráfico de Valor</button>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)} contentClassName='bg-dark text-white border-dark'>
          <Modal.Header closeButton>
            <Modal.Title>Gráfico</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedChart === 'quantidade_processos' && (
              <BarChart width={450} height={300} data={filteredProcessos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Autor" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantidade_processos" fill="#58A491" />
              </BarChart>
            )}
            {selectedChart === 'valor_total_processos' && (
              <BarChart width={450} height={300} data={filteredProcessos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Autor" />
                <YAxis domain={[0, 'dataMax + 6000000']} />
                <Tooltip />
                <Legend />
                <Bar dataKey="valor_total_processos" fill="#58A491" />
              </BarChart>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Fechar</Button>
          </Modal.Footer>
        </Modal>

      </div>


    </div>
  );
}
