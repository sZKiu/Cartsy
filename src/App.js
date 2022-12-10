import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Search from "./pages/Search";
import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/wishlist" element={<Wishlist/>}  />
      <Route path="/search/:name" element={<Search/>}  />
    </Routes>
  );
}

export default App;
