import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./admin/Home";
import Layout from "./admin/Layout";
import Customers from "./admin/Customers";
import Transaction from "./admin/Transaction";
import ProfileCard from "./admin/ProfileCard";
import Money from "./admin/Money";

const App = () => {
  return (
    <Router>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/profile" element={<ProfileCard />} />
        <Route path="/money" element={<Money />} />
      </Routes>
    </Router>
  );
};

export default App;
