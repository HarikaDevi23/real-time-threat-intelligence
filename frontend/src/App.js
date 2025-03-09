import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ThreatDashboard from "./components/ThreatDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<ThreatDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;


