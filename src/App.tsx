import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { News, Daily, Search } from "./components/Pages";
import Header from "./components/Header";

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Daily />} />
      <Route path="/search" element={<Search />} />
      <Route path="/news" element={<News />} />
    </Routes>
  </Router>
);

export default App;
