import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import TelaInicial from './components/TelaInicial';
import CadastroVestidos from './components/CadastroVestidos';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TelaInicial />} />
          <Route path="/cadastro-vestidos" element={<CadastroVestidos />} />
          <Route path='*' element={<h1>Página não encontrada</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
