import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Index from './Components/Index';
import Register from './Components/Register';
import Logo from './Components/Logo';
import Layout from './pages/Layout';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import { AuthProvider, useAuth } from "./Auth/AuthContext";
import ErrorComponent from './Components/ErrorComponent';
import UserProfile from './Components/UserProfile';

function App() {
  return (
    <AuthProvider>
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
              <Register />
              <Logo />
            </Layout>
          } />
          <Route path="/home" element={ 
            <Layout>
              <AuthenticaHome />
              <Logo />
            </Layout>
          } />
          <Route path="/profile" element={ 
            <Layout>
              <Sidebar />.
      <UserProfile />
              <Logo />
            </Layout>
          } />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

function AuthenticaHome() {
  const { state } = useAuth();
  return (
    <div>
      {/* {state.isAuthenticated ? <Sidebar /> : null}
      {state.isAuthenticated ? <Home /> : <ErrorComponent/>}  */}
      <Sidebar />.
      <Home />
    </div>
  );
}

export default App;
