import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './components/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/layout/dashboardLayout';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/profile" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
