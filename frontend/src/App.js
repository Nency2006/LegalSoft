import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { createContext, useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Staff from "./pages/Staff";
import Client from "./pages/Client";
import ClientAddForm from "./pages/Client/ClientAddForm";
import ClientView from "./pages/Client/ClientView";
import Advocate from "./pages/Advocate";
import AdvocateAddForm from "./pages/Advocate/AdvocateAddForm";
import AdvocateView from "./pages/Advocate/AdvocateView";

const MyContext = createContext();


function App() {
  const [isToggleSidebar, setisToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);

  const values = {
    isToggleSidebar,
    setisToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setIsHideSidebarAndHeader

  }

  useEffect(() => {

  }, [isToggleSidebar])
  return (

    <BrowserRouter>
      <MyContext.Provider value={values}>
        {
          isHideSidebarAndHeader !== true &&
          <Header />
        }
        <div className="main d-flex">
          {
            isHideSidebarAndHeader !== true &&
            <div className={`sidebarWrapper ${isToggleSidebar === true ? 'toggle' : ''}`}>
              <Sidebar />
            </div>
          }


          <div className={`content ${isHideSidebarAndHeader === true && 'full'} ${isToggleSidebar === true ? 'toggle' : ''}`}>
            <Routes>
              <Route path="/" exact={true} element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/staff" element={<Staff />} />

              <Route path="/client" element={<Client />} />
              <Route path="/add-client" element={<ClientAddForm />}/>
              <Route path="/clients/view/:id" element={<ClientView />} />

              <Route path="/advocate" element={<Advocate />}/>
              <Route path="/add-advocate" element={<AdvocateAddForm />}/>
              <Route path="/view-advocate" element={<AdvocateView />}/>

            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>

  );
}

export default App;
export { MyContext }
