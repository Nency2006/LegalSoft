import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ClientView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/client/${id}/`)
      .then(res => setClient(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!client) return <div className="loading">Loading...</div>;

  return (
    <div className="right-content w-100">
      <div className="mc-card">
        <div className="mc-breadcrumb">
          <h3 className="mc-breadcrumb-title">View Client</h3>
          <ul className="mc-breadcrumb-list">
            <li className="mc-breadcrumb-item">
              <a className="mc-breadcrumb-link" onClick={() => navigate("/clients")}>Clients</a>
            </li>
            <li className="mc-breadcrumb-item">{client.c_name}</li>
          </ul>
        </div>
      </div>

      <div className="client-view-wrapper">
        <div className="client-card">

          {/* Left Column: Profile */}
          <div className="left-col">
            <div className="avatar-view">{client.c_name[0]}</div>
            <h2>{client.c_name}</h2>
            <p><span className="label">Gender:</span> {client.gender}</p>
            <p><span className="label">DOB:</span> {client.dob}</p>
            <p><span className="label">Phone:</span> {client.phone}</p>
            <p><span className="label">Email:</span> {client.email}</p>
            <p><span className="label">Address:</span> {client.address}, {client.city}, {client.state}, {client.pincode}</p>
            {client.identity_proof && (
              <p><span className="label">ID Proof:</span> 
                <a href={client.identity_proof} target="_blank" rel="noreferrer">View Document</a>
              </p>
            )}
          </div>

          {/* Right Column: Case Info */}
          <div className="right-col">
            <h3>Case Details</h3>
            <p><span className="label">Case Type:</span> {client.case_type}</p>
            <p><span className="label">Opposite Party:</span> {client.opposite_party}</p>
            <p><span className="label">Case Description:</span></p>
            <div className="case-desc">{client.case_description}</div>
          </div>

        </div>

        <button className="back-btn" onClick={() => navigate("/client")}>Back to List</button>
      </div>
    </div>
  );
};

export default ClientView;

