import './App.css';
import DeviceList from "./components/DeviceList";
// import DeviceList from "./components/DeviceList/DeviceList";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import SingleDevice from "./components/SingleDevice";
// import {Container, Nav, Navbar} from "react-bootstrap";
import AllDeviceData from "./components/AllDeviceData";
import Footer from "./components/Footer";
import AuthProvider from "./context/AuthProvider";
import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import DeviceReg from "./components/DeviceReg";

function App() {
  return (
      <Router>
          <AuthProvider>
              <div style={{minHeight:"88vh"}}>
                  <NavBar/>
                  <Routes>
                      <Route path="/" element={<LoginPage />} />
                      <Route path="/device-reg" element={<PrivateRoute><DeviceReg /></PrivateRoute>} />
                      <Route path="/home" element={<PrivateRoute><DeviceList /></PrivateRoute>} />
                      <Route path="/all-device-data" element={<PrivateRoute><AllDeviceData /></PrivateRoute>} />
                      <Route path="/:id" element={<PrivateRoute><SingleDevice /></PrivateRoute>} />
                  </Routes>
              </div>
              <Footer />
          </AuthProvider>
      </Router>
  );
}

export default App;
