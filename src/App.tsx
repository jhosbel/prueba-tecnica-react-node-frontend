import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import SpecialPrices from "./components/SpecialPrices";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/special-prices" element={<SpecialPrices />} />
      </Routes>
    </Router>
  );
}

export default App;
