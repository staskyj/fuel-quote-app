import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Profile from './components/Profile.jsx';
import Quote from './components/Quote.jsx';
import  History from './components/History.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navigation />
        <div className='page'>
          <Routes>
            <Route path='/' element={<h1>Home Page</h1>} />
            <Route path='/quote' element={<Quote />} />
            <Route path='/history' element={<History />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App