import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosHome } from "react-icons/io";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ClientAddForm from "./ClientAddForm";
import ClientBulkUpload from "./ClientBulkUpload";
import ClientEdit from "./ClientEdit";
import swal from 'sweetalert';

const Client = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [editClientId, setEditClientId] = useState(null);

  const fetchClients = () => {
    axios.get("http://127.0.0.1:8000/api/client/")
      .then(res => setClients(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => { fetchClients(); }, []);

  const filteredData = clients.filter(client =>
    client.c_name?.toLowerCase().includes(search.toLowerCase())
  );



  // 🔥 DELETE CLIENT
  const deleteClient = (id) => {
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this client!",
    icon: "warning",
    buttons: ["Cancel", "Yes, delete it!"],
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios.delete(`http://127.0.0.1:8000/api/client/${id}/`)
        .then(() => {
          fetchClients(); // refresh table
          swal("Deleted!", "Client has been deleted.", "success");
        })
        .catch((err) => {
          console.error(err);
          swal("Error!", "Something went wrong.", "error");
        });
    } else {
      swal("Cancelled", "Client is safe.", "info");
    }
  });
};

  return (
    <>
      <div className="right-content w-100">
        <div className="col-xl-12">
          <div className="mc-card">
            <div className="mc-breadcrumb">
              <h3 className="mc-breadcrumb-title">Client Details</h3>
              <ul className="mc-breadcrumb-list">

                <li className="mc-breadcrumb-item">
                  <a className="mc-breadcrumb-link" href="/"><IoIosHome />Home</a>
                </li>
                <li className="mc-breadcrumb-item">Client</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="client-container">

          {/* Search + Buttons */}
          <div className="top-bar">

            <input
              type="text"
              placeholder="Search client..."
              className="search-box"
              onChange={(e) => setSearch(e.target.value)}
            />


            <button className="add-btn" onClick={() => { setShowModal(true); setShowBulkUpload(false); }} >+</button>
            <button className="bulk-btn" onClick={() => {
              setShowModal(true);       // open modal
              setShowBulkUpload(true);  // only show file input
            }}>Bulk Upload</button>
          </div>

          {/* Table */}
          <table className="client-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Client Profile</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((client, index) => (
                <tr key={client.id}>
                  <td>{index + 1}</td>

                  <td className="profile-cell">
                    <div className="avatar">{client.c_name[0]}</div>
                    <div>
                      <div className="name">{client.c_name}</div>
                      <div className="email">{client.email}</div>
                    </div>
                  </td>

                  <td>{client.phone}</td>
                  <td>{client.address}</td>

                  <td className="action-cell">
                    <div className="action-buttons">
                      <button className="btn view"
                        onClick={() => navigate(`/clients/view/${client.id}`)}
                      >
                        <FaEye /></button>

                      <button
                        className="btn edit"
                        onClick={() => setEditClientId(client.id)}
                      >
                        <FaEdit />
                      </button>
                      {editClientId && (
                        <ClientEdit
                          clientId={editClientId}

                          onClose={() => setEditClientId(null)}
                          fetchClients={fetchClients}
                        />
                      )}

                      <button
                        className="btn delete"
                        onClick={() => deleteClient(client.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-box large">
                <div className="modal-header">
                  <h2>{showBulkUpload ? "Bulk Upload Clients" : "Add New Client"}</h2>
                  <button className="close-btn" onClick={() => { setShowModal(false); setShowBulkUpload(false); }}>✕</button>
                </div>

                {showBulkUpload ?
                  <ClientBulkUpload onClose={() => setShowModal(false)} fetchClients={fetchClients} />
                  :
                  <ClientAddForm onClose={() => setShowModal(false)} fetchClients={fetchClients} />
                }
              </div>
            </div>
          )}

          {editClientId && (
            <div className="modal-overlay blur-bg">
              <div className="modal-box large">
                <div className="modal-header">
                  <h2>Edit Client</h2>
                  <button className="close-btn" onClick={() => setEditClientId(null)}>✕</button>
                </div>

                <ClientEdit
                  clientId={editClientId}
                  onClose={() => setEditClientId(null)}
                  fetchClients={fetchClients}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default Client;