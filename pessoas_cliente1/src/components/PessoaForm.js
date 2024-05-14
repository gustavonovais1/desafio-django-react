import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const PessoaForm = ({ onPessoaAdded, onPessoaUpdated, pessoaInicial }) => {
  const [pessoa, setPessoa] = useState(pessoaInicial || { nome: '', data_nasc: '', cpf: '', altura: 0, peso: 0, sexo: '' });

  useEffect(() => {
    setPessoa(pessoaInicial || { nome: '', data_nasc: '', cpf: '', altura: 0, peso: 0, sexo: '' });
  }, [pessoaInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPessoa({
      ...pessoa,
      [name]: name === 'altura' || name === 'peso' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting pessoa:", pessoa); // Log para verificar o payload
    if (pessoa.id) {
      apiService.updatePessoa(pessoa.id, pessoa)
        .then(() => onPessoaUpdated())
        .catch(err => console.error(err));
    } else {
      apiService.createPessoa(pessoa)
        .then(() => onPessoaAdded())
        .catch(err => console.error(err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nome" value={pessoa.nome} onChange={handleChange} placeholder="Nome" required />
      <input type="date" name="data_nasc" value={pessoa.data_nasc} onChange={handleChange} placeholder="Data de Nascimento" required />
      <input type="text" name="cpf" value={pessoa.cpf} onChange={handleChange} placeholder="CPF" maxLength="11" required />
      <input type="number" name="altura" value={pessoa.altura} onChange={handleChange} placeholder="Altura" required />
      <input type="number" name="peso" value={pessoa.peso} onChange={handleChange} placeholder="Peso" required />
      <select name="sexo" value={pessoa.sexo} onChange={handleChange} required>
        <option value="">Selecione o Sexo</option>
        <option value="M">Masculino</option>
        <option value="F">Feminino</option>
      </select>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default PessoaForm;
