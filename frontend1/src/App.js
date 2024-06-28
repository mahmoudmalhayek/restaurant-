// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Profile from './pages/Profile';
import MyOrders from './pages/MyOrders';
import { AuthProvider } from './context/AuthContext';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders/:id" element={<MyOrders />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
