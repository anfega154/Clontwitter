import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Index from './Components/Index';
import Register from './Components/Register';
import Logo from './Components/Logo';
import Layout from './pages/Layout';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Index />
            <Logo />

          </Layout>

        } />
        <Route path="/register" element={

          <Layout>
            <Register/>
            <Logo />
          </Layout>
        } />
        <Route path="/home" element={

          <Layout>
            <Sidebar/>
            <Home/>
            <Logo />
          </Layout>
        } />
      </Routes>
    </HashRouter>
  );
}

export default App;
