import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Signup} from './views/Signup';
import { Login } from "./views/Login";
import { AuthProvider } from "./context/AuthContent";
import { PasswordReset } from "./views/PasswordReset";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password-reset" element={<PasswordReset />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
