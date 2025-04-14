import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { Home } from './pages/Home';

const firebaseConfig = {
  apiKey: "AIzaSyvC0Gk4Jj0Tp0C812Ga3Yp9gCK2WMI0M8Y",
  authDomain: "portfolio-69b38.firebaseapp.com",
  projectId: "portfolio-69b38",
  storageBucket: "portfolio-69b38.appspot.com",
  messagingSenderId: "776037467082",
  appId: "1:776037467082:web:689d72782b2807a7848533"
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

function Login() {
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center'>
        <h1 className='text-2xl font-semibold mb-6'>Entrar no sistema</h1>
        <button
          onClick={handleLogin}
          className='bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition'
        >
          Entrar com Google
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  const turmas = ['6º Ano A', '6º Ano B', '7º Ano A'];
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nomeTurma, setNomeTurma] = useState('');
  const [serie, setSerie] = useState('');

  const novaTurma = () => setMostrarFormulario(!mostrarFormulario);
  const salvarTurma = () => {
    alert(`Turma criada: ${nomeTurma} - ${serie}`);
    setNomeTurma('');
    setSerie('');
    setMostrarFormulario(false);
  };

  return (
    <div className='flex h-screen'>
      <aside className='w-64 bg-white border-r p-4 rounded-r-2xl shadow-md'>
        <h2 className='text-xl font-semibold mb-4'>Menu</h2>
        <ul className='space-y-2'>
          <li className='hover:underline cursor-pointer'>📁 Turmas</li>
          <li className='hover:underline cursor-pointer'>📝 Registros</li>
          <li className='hover:underline cursor-pointer'>📊 Relatórios</li>
        </ul>
        <li className='hover:underline cursor-pointer text-blue-600 mt-6'>➕ Novo Registro</li>
      </aside>
      <main className='flex-1 p-6 bg-gray-100 rounded-l-2xl overflow-y-auto'>
        <h1 className='text-2xl font-bold mb-4'>Painel do Professor</h1>
        <div className='space-y-4'>
          <h2 className='text-lg font-semibold'>Minhas Turmas</h2>
          <ul className='space-y-2'>
            {turmas.map((turma, index) => (
              <li key={index} className='bg-white p-3 rounded-xl shadow text-sm hover:bg-gray-50 cursor-pointer'>
                {turma}
              </li>
            ))}
          </ul>
          <div className='pt-2'>
            <label className='block text-sm font-medium mb-2'>Importar Alunos (CSV)</label>
            <input
              type='file'
              accept='.csv'
              onChange={(e) => alert(`Importando arquivo: ${e.target.files[0]?.name}`)}
              className='w-full border p-2 rounded-lg bg-white shadow-sm cursor-pointer'
            />
          </div>
          <button
            onClick={novaTurma}
            className='mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700'
          >
            {mostrarFormulario ? 'Cancelar' : '+ Nova Turma'}
          </button>
          {mostrarFormulario && (
            <div className='mt-4 bg-white p-4 rounded-xl shadow space-y-4'>
              <input
                type='text'
                placeholder='Nome da turma'
                value={nomeTurma}
                onChange={(e) => setNomeTurma(e.target.value)}
                className='w-full border p-2 rounded-lg'
              />
              <input
                type='text'
                placeholder='Série/Ano'
                value={serie}
                onChange={(e) => setSerie(e.target.value)}
                className='w-full border p-2 rounded-lg'
              />
              <button
                onClick={salvarTurma}
                className='w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700'
              >
                Salvar Turma
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
