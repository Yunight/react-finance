import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { News, Home, Search } from "./components/Pages";
import Header from "./components/Header";

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/news" element={<News />} />
    </Routes>
  </Router>
);

export default App;
