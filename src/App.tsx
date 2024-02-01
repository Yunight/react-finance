import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Calendar, Home, Reports, Search } from "./components/Pages";
import Header from "./components/Header";

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/dashboard" element={<Home />} />
      <Route path="/" element={<Search />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  </Router>
);

export default App;
