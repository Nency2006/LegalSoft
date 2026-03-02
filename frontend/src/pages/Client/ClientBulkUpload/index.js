import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
const ClientBulkUpload = ({ onClose, fetchClients }) => {
  const [bulkFile, setBulkFile] = useState(null);

  const handleSubmit = () => {
    if (!bulkFile) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", bulkFile);

    axios.post("http://127.0.0.1:8000/api/client/bulk_upload/", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(res => {
        swal({
          title: "Success",
          text: "Bulk Upload Successful",
          icon: "success",
          button: "Ok",
        });

        onClose();
        fetchClients();
      })
      .catch(err => console.error(err));
    swal({
      title: "Error!",
      text: "Somthing wents worng",
      type: "error",
      confirmButtonText: "Cool"
    });
  };

  return (
    <div className="modal-form-grid">
      <label>Upload Excel File</label>
      <input type="file" accept=".xlsx,.xls" onChange={(e) => setBulkFile(e.target.files[0])} />

      <div className="modal-actions full-width">
        <button type="button" className="save-btn" onClick={handleSubmit}>Upload</button>
        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ClientBulkUpload;