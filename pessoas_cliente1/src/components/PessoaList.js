import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import PessoaForm from './PessoaForm';

const PessoaList = () => {
  const [pessoas, setPessoas] = useState([]);
  const [selectedPessoa, setSelectedPessoa] = useState(null);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    fetchPessoas();
  }, []);

  const fetchPessoas = () => {
    apiService.getPessoas()
      .then((response) => {
        setPessoas(response.data);
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    apiService.deletePessoa(id)
      .then(() => {
        fetchPessoas();
      })
      .catch(err => console.error(err));
  };

  const handleEdit = (pessoa) => {
    setSelectedPessoa(pessoa);
  };

  const handlePessoaAddedOrUpdated = () => {
    fetchPessoas();
    setSelectedPessoa(null); // Limpa a seleção após adicionar ou atualizar
  };

  const handleCalculateIdealWeight = (id) => {
    apiService.calculateIdealWeight(id)
      .then(response => {
        alert(`Peso ideal: ${response.data.pesoIdeal}`);
      })
      .catch(err => console.error(err));
  };

  const handleSearch = () => {
    apiService.getPessoa(searchId)
      .then(response => {
        setSelectedPessoa(response.data);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Lista de Pessoas</h2>
      <PessoaForm 
        onPessoaAdded={handlePessoaAddedOrUpdated} 
        onPessoaUpdated={handlePessoaAddedOrUpdated} 
        pessoaInicial={selectedPessoa} // Passa a pessoa selecionada para edição
      />
      <div>
        <input 
          type="text" 
          placeholder="ID da Pessoa" 
          value={searchId} 
          onChange={(e) => setSearchId(e.target.value)} 
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>
      <ul>
        {pessoas.map((pessoa) => (
          <li key={pessoa.id}>
            {pessoa.nome} - {pessoa.altura}m - {pessoa.peso}kg - {pessoa.sexo}
            <button onClick={() => handleEdit(pessoa)}>Editar</button>
            <button onClick={() => handleDelete(pessoa.id)}>Excluir</button>
            <button onClick={() => handleCalculateIdealWeight(pessoa.id)}>Calcular Peso Ideal</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PessoaList;
