
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout"
import Register from "./pages/Register";
import MyAccounts from "./pages/MyAccounts"
import Profile from "./pages/Profile";
import Transfer from "./pages/Transfer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from './components/UserContext';
import { useState, useContext, createContext } from 'react';
import AccountDetail from "./pages/AccountDetail";
import CreatAccount from "./pages/CreatAccount";
import Transactions from "./pages/Transactions";
import ShowList from "./pages/ShowList";
import Global from "./components/Global";

const ExpiredContext = createContext(false);

const App = () => {

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [loginname, setLoginname] = useState("");
  const [expired, setExpired] = useState(false);
  Global.expired = false;

  return (
    <div>
      <Router>
        <ExpiredContext.Provider value={expired}>

          <Topbar />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/accounts" element={<MyAccounts />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/create" element={<CreatAccount />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/transaction/:accountId" element={<Transactions />} />
            <Route path="/accountDetail/:accountId" element={<AccountDetail />} />
            <Route path="/showlist" element={ShowList} />

          </Routes>
        </ExpiredContext.Provider>

      </Router>

    </div>
  );
}

export default App;
