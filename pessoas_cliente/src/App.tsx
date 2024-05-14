import PessoaList from './components/PessoaList';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Gerenciamento de Pessoas</h1>
      <PessoaList />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        From Gustavo Novais to BK-OPEN
        </p>

      </header>
    </div>
  );
}

export default App;
