import { useState } from "react";
import DashboardBox from "./components/DashboardBox";
import DashboardAdds from "./components/DashboardAdds";
import { VscFiles } from "react-icons/vsc";
import { MdOutlineFileOpen } from "react-icons/md";
import { AiOutlineFileSearch } from "react-icons/ai";
import { CiFileOff } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { IoIosHome } from "react-icons/io";
import ClientAddForm from "../Client/ClientAddForm";
// import "./Dashboard.css"; // ensure modal CSS load thay

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={`right-content w-100 ${showModal ? "blurred" : ""}`}>
        {/* Breadcrumb */}
        <div className="col-xl-12">
          <div className="mc-card">
            <div className="mc-breadcrumb">
              <h3 className="mc-breadcrumb-title">Dashboard</h3>
              <ul className="mc-breadcrumb-list">
                <li className="mc-breadcrumb-item">
                  <a className="mc-breadcrumb-link" href="/"><IoIosHome />Home</a>
                </li>
                <li className="mc-breadcrumb-item">Dashboard</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dashboard Boxes */}
        <div className="row dashboardBoxWrapperRow">
          <div className="col-md-12">
            <div className="dashboardBoxWrapper d-flex">
              <DashboardBox color={["#1da256", "#48d483"]} icon={<VscFiles />} grow={true} title={"Total Case"} />
              <DashboardBox color={["#c012e2", "#eb64fe"]} icon={<MdOutlineFileOpen />} title={"Open Case"} />
              <DashboardBox color={["#2678e5", "#60aff5"]} icon={<CiFileOff />} grow={true} title={"Closed Case"} />
              <DashboardBox color={["#e1950e", "#f3cd29"]} icon={<AiOutlineFileSearch />} title={"Pendding Case"} />
            </div>
          </div>
        </div>

        {/* Add Buttons */}
        <div className="row dashboardBoxWrapperRow">
          <div className="col-md-12">
            <div className="dashboardGrid">
              <DashboardAdds icon={<IoPerson />} title="Add Client" onClick={() => setShowModal(true)} />
              <DashboardAdds icon={<FaUserTie />} title="Add Advocate" to={'/add-advocate'} />
              <DashboardAdds icon={<FaUsers />} title="Add User" to={'/add-user'} />
              <DashboardAdds icon={<AppRegistrationIcon />} title="Create New Case" to={'/add-case'} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box large">
            <div className="modal-header">
              <h2>Add New Client</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <ClientAddForm 
              onClose={() => setShowModal(false)} 
              fetchClients={() => {}}  
            />
          </div>
        </div>
      )}
      
    </>
  );
}

export default Dashboard;