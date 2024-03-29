import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import CreateLoan from "./pages/CreateLoan";
import MyLoans from "./pages/MyLoans";
import BalanceSheet from "./pages/BalanceSheet";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login/:type" element={<Login />} />
          <Route exact path="/signup/:type" element={<Signup />} />
          <Route exact path="/dashboard/admin" element={<AdminDashboard />} />
          <Route exact path="/dashboard/user" element={<UserDashboard />} />
          <Route exact path="/create-loan" element={<CreateLoan />} />
          <Route exact path="/my-loans" element={<MyLoans />} />
          <Route exact path="/balance-sheet/:loanId" element={<BalanceSheet />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
