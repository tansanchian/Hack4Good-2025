import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import LoginPage from "./components/login/LoginPage";
import SignupPage from "./components/signup/SignupPage";
import Dashboard from "./Dashboard";
import Home from "./components/pages/home";
import Transactions from "./components/pages/transactions";
import Vouchers from "./components/pages/vouchers";
import Users from "./components/pages/users";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<LoginPage />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="vouchers" element={<Vouchers />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
