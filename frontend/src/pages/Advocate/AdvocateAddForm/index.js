import React, { useState } from "react";
import axios from "axios";

const AdvocateAddForm = ({ onClose, fetchAdvocates }) => {
  const [formData, setFormData] = useState({
    name: "", gender: "", dob: "", photo: null,
    email: "", phone: "", address: "", city: "Surat", state: "Gujarat", pincode: "",
    bar_council_no: "", specialization: "", experience_years: 0, is_active: true
  });

  const handleChange = e => {
    const { name, value, files, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) data.append(key, formData[key]);
    });

    try {
      await axios.post("http://127.0.0.1:8000/api/advocate/", data);
      fetchAdvocates();
      onClose();
      alert("Advocate Added Successfully");
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  return (
    <form className="modal-form-grid" onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Date of Birth</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

        <label>Photo</label>
        <input type="file" name="photo" onChange={handleChange} />
      </div>

      <div>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Address</label>
        <textarea name="address" value={formData.address} onChange={handleChange}></textarea>

        <label>City</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} />

        <label>State</label>
        <input type="text" name="state" value={formData.state} onChange={handleChange} />

        <label>Pincode</label>
        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
      </div>

      <div className="full-width">
        <label>Bar Council No</label>
        <input type="text" name="bar_council_no" value={formData.bar_council_no} onChange={handleChange} required />

        <label>Specialization</label>
        <select name="specialization" value={formData.specialization} onChange={handleChange} required>
          <option value="">Select Specialization</option>
          <option value="Criminal">Criminal</option>
          <option value="Civil">Civil</option>
          <option value="Corporate">Corporate</option>
          <option value="Family">Family</option>
          <option value="IP">Intellectual Property</option>
          <option value="Employment">Employment</option>
          <option value="Cyber">Cyber Law</option>
          <option value="Other">Other</option>
        </select>

        <label>Experience (Years)</label>
        <input type="number" name="experience_years" value={formData.experience_years} onChange={handleChange} />

        <label>Active</label>
        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
      </div>

      <div className="modal-actions full-width">
        <button type="submit" className="save-btn">Save Advocate</button>
        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default AdvocateAddForm;