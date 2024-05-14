import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const apiService = {
  getPessoas: () => axios.get(`${API_URL}/pessoas/`),
  getPessoa: (id) => axios.get(`${API_URL}/pessoas/${id}/`).catch(handleError),
  createPessoa: (pessoa) => axios.post(`${API_URL}/pessoas/`, pessoa).catch(handleError),
  updatePessoa: (id, pessoa) => axios.put(`${API_URL}/pessoas/${id}/`, pessoa).catch(handleError),
  deletePessoa: (id) => axios.delete(`${API_URL}/pessoas/${id}/`).catch(handleError),
  calculateIdealWeight: (id) => axios.get(`${API_URL}/pessoas/${id}/calcular_peso_ideal/`).catch(handleError) 
};

const handleError = (error) => {
  console.error('API call failed. ', error);
  throw error;
};

export default apiService;
