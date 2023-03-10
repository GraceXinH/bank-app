
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout"
import Register from "./pages/Register";
import MyAccounts from "./pages/MyAccounts"
import Profile from "./pages/Profile";
import Transfer from "./pages/Transfer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AccountDetail from "./pages/AccountDetail";
import CreatAccount from "./pages/CreatAccount";
import Transactions from "./pages/Transactions";
import Global from "./components/Global";


const App = () => {

  Global.expired = false;

  return (
    <div>
      <Router>

          <Topbar expired={Global.expired} />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/accounts" element={<MyAccounts />}/>
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/create" element={<CreatAccount />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/transaction/:accountId/:currentPage" element={<Transactions />} />
            <Route path="/accountDetail/:accountId" element={<AccountDetail />} />

          </Routes>

      </Router>

    </div>
  );
}

export default App;
