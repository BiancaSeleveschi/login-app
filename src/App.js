import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./views/Signup";
import { Login } from "./views/Login";
import { PasswordReset } from "./views/PasswordReset";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
