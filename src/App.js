import Home from "./page/Home"
import Map from "./page/Map"
import Login from "./page/Login"
import Register from "./page/Register"
import Table from "./page/Table"
import Pay from "./page/Pay"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Stall from "./component/Stall";
import History from "./component/History";
import Doubt from "./component/Doubt";
import Info from "./component/Info";

import Navbar from "./component/Navbar"
import './App.css';

function App() {
  const navbar = <Navbar />;
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={[navbar, <Home />]} />
        <Route exact path="/map" element={[navbar, <Map />]} />
        <Route exact path="/login" element={[navbar, <Login />]} />
        <Route exact path="/register" element={[navbar, <Register />]} />
        <Route exact path="/pay" element={[navbar, <Pay />]} />
        <Route exact path="/table" element={[navbar, <Table />]}>
          <Route path="stall" element={<Stall />} />
          <Route path="history" element={<History />} />
          <Route path="doubt" element={<Doubt />} />
          <Route path="info" element={<Info />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
