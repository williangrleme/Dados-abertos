import React from 'react'
import { useState, useEffect } from 'react';
import './css/Table.css';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

export default function TableEstadoAutor() {
  const [processos, setProcessos] = useState([]);
  const [filteredProcessos, setFilteredProcessos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [estadoSuggestions, setEstadoSuggestions] = useState([]);
  const [estadoSearchValue, setEstadoSearchValue] = useState('');
  const [autorSuggestions, setAutorSuggestions] = useState([]);
  const [autorSearchValue, setAutorSearchValue] = useState('');
  const [tipoAutorSuggestions, setTipoAutorSuggestions] = useState([]);
  const [tipoAutorSearchValue, setTipoAutorSearchValue] = useState('');
  const [beneficiarioSuggestions, setBeneficiarioSuggestions] = useState([]);
  const [beneficiarioSearchValue, setBeneficiarioSearchValue] = useState('');
  const [orgaoSuggestions, setOrgaoSuggestions] = useState([]);
  const [orgaoSearchValue, setOrgaoSearchValue] = useState('');
  const [uoSuggestions, setUoSuggestions] = useState([]);
  const [uoSearchValue, setUoSearchValue] = useState('');
  const [anoSuggestions, setAnoSuggestions] = useState([]);
  const [anoSearchValue, setAnoSearchValue] = useState('');
  const [objetoSuggestions, setObjetoSuggestions] = useState([]);
  const [objetoSearchValue, setObjetoSearchValue] = useState('');
  const [justificativaSuggestions, setJustificativaSuggestions] = useState([]);
  const [justificativaSearchValue, setJustificativaSearchValue] = useState('');
  const [valorSuggestions, setValorSuggestions] = useState([]);
  const [valorSearchValue, setValorSearchValue] = useState('');
  const [valorOrder, setValorOrder] = useState('asc');
  const [tipoAutorOrder, setTipoAutorOrder] = useState('asc');
  const [autorOrder, setAutorOrder] = useState('asc');
  const [estadoOrder, setEstadoOrder] = useState('asc');
  const [beneficiarioOrder, setBeneficiarioOrder] = useState('asc');
  const [orgaoOrder, setOrgaoOrder] = useState('asc');
  const [uoOrder, setUoOrder] = useState('asc');
  const [anoOrder, setAnoOrder] = useState('asc');
  const [objetoOrder, setObjetoOrder] = useState('asc');
  const [justificativaOrder, setJustificativaOrder] = useState('asc');
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
        Ano: processo.Ano.toString(),
        Mês: processo.Mês.toString(),
        Cod_uo: processo.Cod_uo.toString(),
        Valor_Solicitado: processo.Valor_Solicitado.toString(),
      };
    });
  };

  useEffect(() => {
  let filtered = processos;

  if (searchBy === 'estado' && searchValue !== '') {
    filtered = filtered.filter((processo) => processo.Uf_beneficiario === searchValue);
  } else if (searchBy === 'autor' && searchValue !== '') {
    filtered = filtered.filter((processo) => processo.Autor === searchValue);
  }else if (searchBy === 'tipoautor' && searchValue !== '') {
    filtered = filtered.filter((processo) => processo.Tipo_autor === searchValue);
  }else if (searchBy === 'beneficiario' && searchValue !== '') {
    filtered = filtered.filter((processo) => processo.Nome_beneficiario === searchValue);
  }else if (searchBy === 'orgao' && searchValue !== '') {
    filtered = filtered.filter((processo) => processo.Nome_orgao === searchValue);
  }else if (searchBy === 'uo' && searchValue !== '') {
    filtered = filtered.filter((processo) => processo.Cod_uo === searchValue);
  }else if (searchBy === 'ano' && searchValue !== '') {
    filtered = filtered.filter((processo) => processo.Ano === searchValue);
  }else if (searchBy === 'objeto' && searchValue !== '') {
    filtered = filtered.filter((processo) => processo.Objeto === searchValue);
  }else if (searchBy === 'justificativa' && searchValue !== '') {
    filtered = filtered.filter((processo) => processo.Justificativa === searchValue);
  }else if (searchBy === 'valor' && searchValue !== '') {
    filtered = filtered.filter((processo) => processo.Valor_Solicitado === searchValue);
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
  setTipoAutorSuggestions([]);
  setBeneficiarioSuggestions([]);
  setOrgaoSuggestions([]);
  setUoSuggestions([]);
  setAnoSuggestions([]);
  setObjetoSuggestions([]);
  setJustificativaSuggestions([]);
  setValorSuggestions([]);
  setAutorSearchValue('');
  setEstadoSearchValue('');
  setTipoAutorSearchValue('');
  setBeneficiarioSearchValue('');
  setOrgaoSearchValue('');
  setUoSearchValue('');
  setAnoSearchValue('');
  setObjetoSearchValue('');
  setJustificativaSearchValue('');
  setValorSearchValue('');
  setValorOrder('asc'); // Redefine a direção da ordenação para ascendente
};

  useEffect(() => {
    axios.get('http://localhost:3000/processo/processoTudo')
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
    processo.Uf_beneficiario.toLowerCase().slice(0, inputLength) === inputValue
  );
};
const getAutorSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : processos.filter(processo =>
    processo.Autor.toLowerCase().slice(0, inputLength) === inputValue
  );
};
const getTipoAutorSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : processos.filter(processo =>
    processo.Tipo_autor.toLowerCase().slice(0, inputLength) === inputValue
  );
};
const getBeneficiarioSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : processos.filter(processo =>
    processo.Nome_beneficiario.toLowerCase().slice(0, inputLength) === inputValue
  );
};
const getOrgaoSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : processos.filter(processo =>
    processo.Nome_orgao.toLowerCase().slice(0, inputLength) === inputValue
  );
};
const getUoSuggestions = (value) => {
  const inputValue = typeof value === 'string' ? value.trim().toLowerCase() : '';
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : processos.filter(processo =>
    String(processo.Cod_uo).toLowerCase().slice(0, inputLength) === inputValue
  );
};
const getAnoSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : processos.filter(processo =>
    processo.Ano.toLowerCase().slice(0, inputLength) === inputValue
  );
};
const getObjetoSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : processos.filter(processo =>
    processo.Objeto.toLowerCase().slice(0, inputLength) === inputValue
  );
};
const getJustificativaSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : processos.filter(processo =>
    processo.Justificativa.toLowerCase().slice(0, inputLength) === inputValue
  );
};
const getValorSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : processos.filter(processo =>
    String(processo.Valor_Solicitado).toLowerCase().slice(0, inputLength) === inputValue
  );
};

// Renderiza as sugestões de busca
const renderEstadoSuggestion = (suggestion) => (
  <div>
    {suggestion.Uf_beneficiario}
  </div>
);
const renderAutorSuggestion = (suggestion) => (
  <div>
    {suggestion.Autor}
  </div>
);
const renderTipoAutorSuggestion = (suggestion) => (
  <div>
    {suggestion.Tipo_autor}
  </div>
);
const renderBeneficiarioSuggestion = (suggestion) => (
  <div>
    {suggestion.Nome_beneficiario}
  </div>
);
const renderOrgaoSuggestion = (suggestion) => (
  <div>
    {suggestion.Nome_orgao}
  </div>
);
const renderUoSuggestion = (suggestion) => (
  <div>
    {suggestion.Cod_uo}
  </div>
);
const renderAnoSuggestion = (suggestion) => (
  <div>
    {suggestion.Ano}
  </div>
);
const renderObjetoSuggestion = (suggestion) => (
  <div>
    {suggestion.Objeto}
  </div>
);
const renderJustificativaSuggestion = (suggestion) => (
  <div>
    {suggestion.Justificativa}
  </div>
);
const renderValorSuggestion = (suggestion) => (
  <div>
    {suggestion.Valor_Solicitado}
  </div>
);

// Define a ação a ser tomada quando o usuário seleciona uma sugestão
const onEstadoSuggestionSelected = (event, { suggestionValue }) => {
  setEstadoSearchValue(suggestionValue);
  setFilteredProcessos(processos.filter(processo => processo.Uf_beneficiario === suggestionValue));
  setValorOrder('asc'); // Redefine a direção da ordenação ao selecionar uma sugestão
};
const onAutorSuggestionSelected = (event, { suggestionValue }) => {
  setAutorSearchValue(suggestionValue);
  setFilteredProcessos(processos.filter(processo => processo.Autor === suggestionValue));
  setValorOrder('asc'); // Redefine a direção da ordenação ao selecionar uma sugestão
};
const onTipoAutorSuggestionSelected = (event, { suggestionValue }) => {
  setTipoAutorSearchValue(suggestionValue);
  setFilteredProcessos(processos.filter(processo => processo.Tipo_autor === suggestionValue));
  setValorOrder('asc'); // Redefine a direção da ordenação ao selecionar uma sugestão
};
const onBeneficiarioSuggestionSelected = (event, { suggestionValue }) => {
  setBeneficiarioSearchValue(suggestionValue);
  setFilteredProcessos(processos.filter(processo => processo.Nome_beneficiario === suggestionValue));
  setValorOrder('asc'); // Redefine a direção da ordenação ao selecionar uma sugestão
};
const onOrgaoSuggestionSelected = (event, { suggestionValue }) => {
  setOrgaoSearchValue(suggestionValue);
  setFilteredProcessos(processos.filter(processo => processo.Nome_orgao === suggestionValue));
  setValorOrder('asc'); // Redefine a direção da ordenação ao selecionar uma sugestão
};
const onUoSuggestionSelected = (event, { suggestionValue }) => {
  setUoSearchValue(suggestionValue);
  setFilteredProcessos(processos.filter(processo => processo.Cod_uo === suggestionValue));
  setValorOrder('asc'); // Redefine a direção da ordenação ao selecionar uma sugestão
};
const onAnoSuggestionSelected = (event, { suggestionValue }) => {
  setAnoSearchValue(suggestionValue);
  setFilteredProcessos(processos.filter(processo => processo.Ano === suggestionValue));
  setValorOrder('asc'); // Redefine a direção da ordenação ao selecionar uma sugestão
};
const onObjetoSuggestionSelected = (event, { suggestionValue }) => {
  setObjetoSearchValue(suggestionValue);
  setFilteredProcessos(processos.filter(processo => processo.Objeto === suggestionValue));
  setValorOrder('asc'); // Redefine a direção da ordenação ao selecionar uma sugestão
};
const onJustificativaSuggestionSelected = (event, { suggestionValue }) => {
  setJustificativaSearchValue(suggestionValue);
  setFilteredProcessos(processos.filter(processo => processo.Justificativa === suggestionValue));
  setValorOrder('asc'); // Redefine a direção da ordenação ao selecionar uma sugestão
};
const onValorSuggestionSelected = (event, { suggestionValue }) => {
  setValorSearchValue(suggestionValue);
  setFilteredProcessos(processos.filter(processo => processo.Valor_Solicitado === suggestionValue));
  setValorOrder('asc'); // Redefine a direção da ordenação ao selecionar uma sugestão
};

const handleSortByValor = () => {
  const sortedProcessos = [...filteredProcessos];

  if (valorOrder === 'asc') {
    sortedProcessos.sort((a, b) => a.Valor_Solicitado - b.Valor_Solicitado);
    setValorOrder('desc');
  } else {
    sortedProcessos.sort((a, b) => b.Valor_Solicitado - a.Valor_Solicitado);
    setValorOrder('asc');
  }

  setFilteredProcessos(sortedProcessos);
};  
const handleSortByTipoAutor = () => {
  const sortedProcessos = [...filteredProcessos];

  if (tipoAutorOrder === 'asc') {
    sortedProcessos.sort((a, b) => a.Tipo_autor - b.Tipo_autor);
    setTipoAutorOrder('desc');
  } else {
    sortedProcessos.sort((a, b) => b.Tipo_autor - a.Tipo_autor);
    setTipoAutorOrder('asc');
  }

  setFilteredProcessos(sortedProcessos);
};
const handleSortByEstado = () => {
  const sortedProcessos = [...filteredProcessos];

  if (estadoOrder === 'asc') {
    sortedProcessos.sort((a, b) => {
      if (a.Uf_beneficiario < b.Uf_beneficiario) return -1;
      if (a.Uf_beneficiario > b.Uf_beneficiario) return 1;
      return 0;
    });
    setEstadoOrder('desc');
  } else {
    sortedProcessos.sort((a, b) => {
      if (a.Uf_beneficiario > b.Uf_beneficiario) return -1;
      if (a.Uf_beneficiario < b.Uf_beneficiario) return 1;
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
const handleSortByBeneficiario = () => {
  const sortedProcessos = [...filteredProcessos];

  if (beneficiarioOrder === 'asc') {
    sortedProcessos.sort((a, b) => {
      if (a.Nome_beneficiario < b.Nome_beneficiario) return -1;
      if (a.Nome_beneficiario > b.Nome_beneficiario) return 1;
      return 0;
    });
    setBeneficiarioOrder('desc');
  } else {
    sortedProcessos.sort((a, b) => {
      if (a.Nome_beneficiario > b.Nome_beneficiario) return -1;
      if (a.Nome_beneficiario < b.Nome_beneficiario) return 1;
      return 0;
    });
    setBeneficiarioOrder('asc');
  }

  setFilteredProcessos(sortedProcessos);
};
const handleSortByOrgao = () => {
  const sortedProcessos = [...filteredProcessos];

  if (orgaoOrder === 'asc') {
    sortedProcessos.sort((a, b) => {
      if (a.Nome_orgao < b.Nome_orgao) return -1;
      if (a.Nome_orgao > b.Nome_orgao) return 1;
      return 0;
    });
    setOrgaoOrder('desc');
  } else {
    sortedProcessos.sort((a, b) => {
      if (a.Nome_orgao > b.Nome_orgao) return -1;
      if (a.Nome_orgao < b.Nome_orgao) return 1;
      return 0;
    });
    setOrgaoOrder('asc');
  }

  setFilteredProcessos(sortedProcessos);
};
const handleSortByUo = () => {
  const sortedProcessos = [...filteredProcessos];

  if (uoOrder === 'asc') {
    sortedProcessos.sort((a, b) => {
      if (a.Cod_uo < b.Cod_uo) return -1;
      if (a.Cod_uo > b.Cod_uo) return 1;
      return 0;
    });
    setUoOrder('desc');
  } else {
    sortedProcessos.sort((a, b) => {
      if (a.Cod_uo > b.Cod_uo) return -1;
      if (a.Cod_uo < b.Cod_uo) return 1;
      return 0;
    });
    setUoOrder('asc');
  }

  setFilteredProcessos(sortedProcessos);
};
const handleSortByAno = () => {
  const sortedProcessos = [...filteredProcessos];

  if (anoOrder === 'asc') {
    sortedProcessos.sort((a, b) => {
      if (a.Ano < b.Ano) return -1;
      if (a.Ano > b.Ano) return 1;
      if (a.Mês < b.Mês) return -1;
      if (a.Mês > b.Mês) return 1;
      return 0;
    });
    setAnoOrder('desc');
  } else {
    sortedProcessos.sort((a, b) => {
      if (a.Ano > b.Ano) return -1;
      if (a.Ano < b.Ano) return 1;
      if (a.Mês > b.Mês) return -1;
      if (a.Mês < b.Mês) return 1;
      return 0;
    });
    setAnoOrder('asc');
  }

  setFilteredProcessos(sortedProcessos);
};
const handleSortByObjeto = () => {
  const sortedProcessos = [...filteredProcessos];

  if (objetoOrder === 'asc') {
    sortedProcessos.sort((a, b) => {
      if (a.Objeto < b.Objeto) return -1;
      if (a.Objeto > b.Objeto) return 1;
      return 0;
    });
    setObjetoOrder('desc');
  } else {
    sortedProcessos.sort((a, b) => {
      if (a.Objeto > b.Objeto) return -1;
      if (a.Objeto < b.Objeto) return 1;
      return 0;
    });
    setObjetoOrder('asc');
  }

  setFilteredProcessos(sortedProcessos);
};
const handleSortByJustificativa = () => {
  const sortedProcessos = [...filteredProcessos];

  if (justificativaOrder === 'asc') {
    sortedProcessos.sort((a, b) => {
      if (a.Justificativa < b.Justificativa) return -1;
      if (a.Justificativa > b.Justificativa) return 1;
      return 0;
    });
    setJustificativaOrder('desc');
  } else {
    sortedProcessos.sort((a, b) => {
      if (a.Justificativa > b.Justificativa) return -1;
      if (a.Justificativa < b.Justificativa) return 1;
      return 0;
    });
    setJustificativaOrder('asc');
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
  setAutorSuggestions(getAutorSuggestions(newValue));
};
const onTipoAutorInputChange = (event, { newValue }) => {
  setTipoAutorSearchValue(newValue);
  setTipoAutorSuggestions(getTipoAutorSuggestions(newValue));
};
const onBeneficiarioInputChange = (event, { newValue }) => {
  setBeneficiarioSearchValue(newValue);
  setBeneficiarioSuggestions(getBeneficiarioSuggestions(newValue));
};
const onOrgaoInputChange = (event, { newValue }) => {
  setOrgaoSearchValue(newValue);
  setOrgaoSuggestions(getOrgaoSuggestions(newValue));
};
const onUoInputChange = (event, { newValue }) => {
  setUoSearchValue(newValue);
  setUoSuggestions(getUoSuggestions(newValue));
};
const onAnoInputChange = (event, { newValue }) => {
  setAnoSearchValue(newValue);
  setAnoSuggestions(getAnoSuggestions(newValue));
};
const onObjetoInputChange = (event, { newValue }) => {
  setObjetoSearchValue(newValue);
  setObjetoSuggestions(getObjetoSuggestions(newValue));
};
const onJustificativaInputChange = (event, { newValue }) => {
  setJustificativaSearchValue(newValue);
  setJustificativaSuggestions(getJustificativaSuggestions(newValue));
};
const onValorInputChange = (event, { newValue }) => {
  setValorSearchValue(newValue);
  setValorSuggestions(getValorSuggestions(newValue));
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
const tipoAutorInputProps = {
  placeholder: `Pesquisar por Tipo de Autor`,
  value: tipoAutorSearchValue,
  onChange: onTipoAutorInputChange,
};
const beneficiarioInputProps = {
  placeholder: `Pesquisar por Beneficiario`,
  value: beneficiarioSearchValue,
  onChange: onBeneficiarioInputChange,
};
const orgaoInputProps = {
  placeholder: `Pesquisar por Orgao`,
  value: orgaoSearchValue,
  onChange: onOrgaoInputChange,
};
const uoInputProps = {
  placeholder: `Pesquisar por Uo`,
  value: uoSearchValue,
  onChange: onUoInputChange,
};
const anoInputProps = {
  placeholder: `Pesquisar por Ano`,
  value: anoSearchValue,
  onChange: onAnoInputChange,
};
const objetoInputProps = {
  placeholder: `Pesquisar por Objeto`,
  value: objetoSearchValue,
  onChange: onObjetoInputChange,
};
const justificativaInputProps = {
  placeholder: `Pesquisar por Justificativa`,
  value: justificativaSearchValue,
  onChange: onJustificativaInputChange,
};
const valorInputProps = {
  placeholder: `Pesquisar por Valor`,
  value: valorSearchValue,
  onChange: onValorInputChange,
};

useEffect(() => {
  setStartIndex(0);
}, [estadoSearchValue, autorSearchValue, tipoAutorSearchValue, beneficiarioSearchValue, orgaoSearchValue, uoSearchValue, anoSearchValue, objetoSearchValue, justificativaSearchValue, valorSearchValue]);


  return (
    <div className="container-airbnb row border-bottom border-dark">

      <div className='container'>
        <div className='row'>
          <span className='fs-4 fw-bold titulo'>{`Geral`}</span>
        </div>
        <div className="row text-white justify-content-between align-items-center my-1">
          <div className="col">
            <select className='fs-5 text-white select border-0' value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
              <option value="">Pesquisar por</option>
              <option value="autor">Autor</option>
              <option value="tipoautor">Tipo de Autor</option>
              <option value="beneficiario">Beneficiario</option>
              <option value="estado">Estado</option>
              <option value="orgao">Orgao</option>
              <option value="uo">Uo</option>
              <option value="ano">Ano</option>
              <option value="objeto">Objeto</option>
              <option value="justificativa">Justificativa</option>
              <option value="valor">Valor</option>
            </select>
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
            {searchBy === 'tipoautor' && (
              <Autosuggest
                suggestions={tipoAutorSuggestions}
                onSuggestionsFetchRequested={({ value }) => setTipoAutorSuggestions(getTipoAutorSuggestions(value))}
                onSuggestionsClearRequested={() => setTipoAutorSuggestions([])}
                onSuggestionSelected={onTipoAutorSuggestionSelected}
                getSuggestionValue={(suggestion) => suggestion.Tipo_autor}
                renderSuggestion={renderTipoAutorSuggestion}
                inputProps={tipoAutorInputProps}
                containerProps={{
                  className: 'autosuggest-suggestions-container',
                }}
              />
            )}
            {searchBy === 'beneficiario' && (
              <Autosuggest
                suggestions={beneficiarioSuggestions}
                onSuggestionsFetchRequested={({ value }) => setBeneficiarioSuggestions(getBeneficiarioSuggestions(value))}
                onSuggestionsClearRequested={() => setBeneficiarioSuggestions([])}
                onSuggestionSelected={onBeneficiarioSuggestionSelected}
                getSuggestionValue={(suggestion) => suggestion.Nome_beneficiario}
                renderSuggestion={renderBeneficiarioSuggestion}
                inputProps={beneficiarioInputProps}
                containerProps={{
                  className: 'autosuggest-suggestions-container',
                }}
              />
            )}
            {searchBy === 'estado' && (
              <Autosuggest
                suggestions={estadoSuggestions}
                onSuggestionsFetchRequested={({ value }) => setEstadoSuggestions(getEstadoSuggestions(value))}
                onSuggestionsClearRequested={() => setEstadoSuggestions([])}
                onSuggestionSelected={onEstadoSuggestionSelected}
                getSuggestionValue={(suggestion) => suggestion.Uf_beneficiario}
                renderSuggestion={renderEstadoSuggestion}
                inputProps={estadoInputProps}
                containerProps={{
                  className: 'autosuggest-suggestions-container',
                }}
              />
            )}
            {searchBy === 'orgao' && (
              <Autosuggest
                suggestions={orgaoSuggestions}
                onSuggestionsFetchRequested={({ value }) => setOrgaoSuggestions(getOrgaoSuggestions(value))}
                onSuggestionsClearRequested={() => setOrgaoSuggestions([])}
                onSuggestionSelected={onOrgaoSuggestionSelected}
                getSuggestionValue={(suggestion) => suggestion.Nome_orgao}
                renderSuggestion={renderOrgaoSuggestion}
                inputProps={orgaoInputProps}
                containerProps={{
                  className: 'autosuggest-suggestions-container',
                }}
              />
            )}{searchBy === 'uo' && (
              <Autosuggest
                suggestions={uoSuggestions}
                onSuggestionsFetchRequested={({ value }) => setUoSuggestions(getUoSuggestions(value))}
                onSuggestionsClearRequested={() => setUoSuggestions([])}
                onSuggestionSelected={onUoSuggestionSelected}
                getSuggestionValue={(suggestion) => suggestion.Cod_uo}
                renderSuggestion={renderUoSuggestion}
                inputProps={uoInputProps}
                containerProps={{
                  className: 'autosuggest-suggestions-container',
                }}
              />
            )}{searchBy === 'ano' && (
              <Autosuggest
                suggestions={anoSuggestions}
                onSuggestionsFetchRequested={({ value }) => setAnoSuggestions(getAnoSuggestions(value))}
                onSuggestionsClearRequested={() => setAnoSuggestions([])}
                onSuggestionSelected={onAnoSuggestionSelected}
                getSuggestionValue={(suggestion) => suggestion.Ano}
                renderSuggestion={renderAnoSuggestion}
                inputProps={anoInputProps}
                containerProps={{
                  className: 'autosuggest-suggestions-container',
                }}
              />
            )}{searchBy === 'objeto' && (
              <Autosuggest
                suggestions={objetoSuggestions}
                onSuggestionsFetchRequested={({ value }) => setObjetoSuggestions(getObjetoSuggestions(value))}
                onSuggestionsClearRequested={() => setObjetoSuggestions([])}
                onSuggestionSelected={onObjetoSuggestionSelected}
                getSuggestionValue={(suggestion) => suggestion.Objeto}
                renderSuggestion={renderObjetoSuggestion}
                inputProps={objetoInputProps}
                containerProps={{
                  className: 'autosuggest-suggestions-container',
                }}
              />
            )}{searchBy === 'justificativa' && (
              <Autosuggest
                suggestions={justificativaSuggestions}
                onSuggestionsFetchRequested={({ value }) => setJustificativaSuggestions(getJustificativaSuggestions(value))}
                onSuggestionsClearRequested={() => setJustificativaSuggestions([])}
                onSuggestionSelected={onJustificativaSuggestionSelected}
                getSuggestionValue={(suggestion) => suggestion.Justificativa}
                renderSuggestion={renderJustificativaSuggestion}
                inputProps={justificativaInputProps}
                containerProps={{
                  className: 'autosuggest-suggestions-container',
                }}
              />
            )}{searchBy === 'valor' && (
              <Autosuggest
                suggestions={valorSuggestions}
                onSuggestionsFetchRequested={({ value }) => setValorSuggestions(getValorSuggestions(value))}
                onSuggestionsClearRequested={() => setValorSuggestions([])}
                onSuggestionSelected={onValorSuggestionSelected}
                getSuggestionValue={(suggestion) => suggestion.Valor_Solicitado}
                renderSuggestion={renderValorSuggestion}
                inputProps={valorInputProps}
                containerProps={{
                  className: 'autosuggest-suggestions-container',
                }}
              />
            )}
            </div>
          <div className='col'>
          <button type="button" className="botao fs-6 p-2 btn btn-light border-dark" onClick={handleReset}>
              <i className='mdi mdi-backspace'></i>
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
    <th scope="col">Autor{' '} <i className={`mdi mdi-chevron-${autorOrder === 'asc' ? 'down' : 'up'}`} onClick={handleSortByAutor}></i> </th>
    <th scope="col">Tipo de Autor{' '} <i className={`mdi mdi-chevron-${tipoAutorOrder === 'asc' ? 'down' : 'up'}`} onClick={handleSortByTipoAutor} ></i> </th>
    <th scope="col">Beneficiário{' '} <i className={`mdi mdi-chevron-${beneficiarioOrder === 'asc' ? 'down' : 'up'}`} onClick={handleSortByBeneficiario} ></i> </th>
    <th scope="col">Estado{' '} <i className={`mdi mdi-chevron-${estadoOrder === 'asc' ? 'down' : 'up'}`} onClick={handleSortByEstado} ></i> </th>
    <th scope="col">Orgão{' '} <i className={`mdi mdi-chevron-${orgaoOrder === 'asc' ? 'down' : 'up'}`} onClick={handleSortByOrgao} ></i> </th>
    <th scope="col">UO{' '} <i className={`mdi mdi-chevron-${uoOrder === 'asc' ? 'down' : 'up'}`} onClick={handleSortByUo} ></i> </th>
    <th scope="col">Ano{' '} <i className={`mdi mdi-chevron-${anoOrder === 'asc' ? 'down' : 'up'}`} onClick={handleSortByAno} ></i> </th>
    <th scope="col">Objeto{' '} <i className={`mdi mdi-chevron-${objetoOrder === 'asc' ? 'down' : 'up'}`} onClick={handleSortByObjeto} ></i> </th>
    <th scope="col">Justificativa{' '} <i className={`mdi mdi-chevron-${justificativaOrder === 'asc' ? 'down' : 'up'}`} onClick={handleSortByJustificativa} ></i> </th>
    <th scope="col">Valor{' '} <i className={`mdi mdi-chevron-${valorOrder === 'asc' ? 'down' : 'up'}`} onClick={handleSortByValor} ></i> </th>
    </tr>
  </thead>
  <tbody>
    {filteredProcessos.slice(startIndex, startIndex + processosPorPagina).map((processo) => (
      <tr key={processo.numero}>
        <td>{processo.Autor}</td>
        <td>{processo.Tipo_autor}</td>
        <td>{processo.Nome_beneficiario}</td>
        <td>{processo.Uf_beneficiario}</td>
        <td>{processo.Nome_orgao}</td>
        <td>{processo.Cod_uo}</td>
        <td>{processo.Ano}-{processo.Mês}</td>
        <td>{processo.Objeto}</td>
        <td>{processo.Justificativa}</td>
        <td>{processo.Valor_Solicitado.toLocaleString('pt-BR')}</td>
      </tr>
    ))}
  </tbody>
</table>
<div className='mb-4'>
  <button className='botao btn btn-dark border-dark' onClick={handlePrevious} disabled={startIndex === 0}>
    Anterior
  </button>
  <button className='botao btn btn-dark border-dark' onClick={handleNext} disabled={startIndex + processosPorPagina >= processos.length}>
    Próximo
  </button>
</div>

    </div>
  );
}
