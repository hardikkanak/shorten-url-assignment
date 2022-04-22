import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CheckOutRoute from "./CheckOutRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:code" element={<CheckOutRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
