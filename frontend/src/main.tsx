import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./components/login/LoginPage";
import SignupPage from "./components/signup/SignupPage";
import Dashboard from "./Dashboard";
import Home from "./components/pages/home";
import Home1 from "./components/pages/home1";
import Home2 from "./components/pages/home2";
import Home3 from "./components/pages/home3";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<LoginPage />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="home1" element={<Home1 />} />
        <Route path="home2" element={<Home2 />} />
        <Route path="home3" element={<Home3 />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
