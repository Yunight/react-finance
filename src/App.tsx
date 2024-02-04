import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { News, Daily, Search } from "./components/Pages";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => (
  <Router>
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="mb-auto">
        <Routes>
          <Route path="/" element={<Daily />} />
          <Route path="/search" element={<Search />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
