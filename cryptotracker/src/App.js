import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from './pages/home';
import Dashboard from './pages/dashboard';
import Coin from './pages/coin';
import Compare from './pages/compare';
import Login from './pages/login';
import Register from './pages/register';
import Chatbot from './components/Common/Chatbot';
// import Watchlist from './pages/watchlist';

function RequireAuth({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } />
          <Route path="/coin/:id" element={<Coin />} />
          <Route path="/compare" element={
            <RequireAuth>
              <Compare />
            </RequireAuth>
          } />
          {/* <Route path="/watchlist" element={<Watchlist />} /> */}
        </Routes>
      </BrowserRouter>
      <Chatbot />
    </>
  );
}

export default App;
 