import { useEffect, useState } from "react";
import axios from "axios";
import swal from 'sweetalert';

const ClientEdit = ({ clientId, onClose, fetchClients }) => {
    const [formData, setFormData] = useState({
        c_name: "",
        gender: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        identity_proof: null,
        case_type: "",
        opposite_party: "",
        case_description: ""
    });

    // Load client data
    useEffect(() => {
        if (!clientId) return;
        axios.get(`http://127.0.0.1:8000/api/client/${clientId}/`)
            .then(res => {
                setFormData({
                    ...res.data,
                    identity_proof: null  // reset file input
                });
            })
            .catch(err => console.error(err));
    }, [clientId]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    // Submit updated client
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null) data.append(key, formData[key]);
        });

        try {
            await axios.put(`http://127.0.0.1:8000/api/client/${clientId}/`, data);
            swal({
                title: "Success",
                text: "Client Updated Successfully",
                icon: "success",
                button: "Ok",
            });
            onClose();
            fetchClients();  // reload table
        } catch (err) {
            console.error(err.response?.data || err);
            swal({
                title: "Error!",
                text: "Somthing wents worng",
                type: "error",
                confirmButtonText: "Cool"
            });
        }
    };

    return (
        <>

            <form className="modal-form-grid" onSubmit={handleSubmit}>
                <div>
                    <label>Full Name</label>
                    <input type="text" name="c_name" value={formData.c_name} onChange={handleChange} required />

                    <label>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <label>Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

                    <label>Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>

                <div>
                    <label>Address</label>
                    <textarea name="address" rows="2" value={formData.address} onChange={handleChange}></textarea>

                    <label>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} />

                    <label>State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} />

                    <label>Pincode</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />

                    <label>Identity Proof</label>
                    <input type="file" name="identity_proof" onChange={handleChange} />
                </div>

                <div className="full-width">
                    <label>Case Type</label>
                    <select name="case_type" value={formData.case_type} onChange={handleChange}>
                        <option value="">Select Case Type</option>
                        <option value="Civil">Civil</option>
                        <option value="Criminal">Criminal</option>
                        <option value="Family">Family</option>
                        <option value="Corporate">Corporate</option>
                    </select>

                    <label>Opposite Party Name</label>
                    <input type="text" name="opposite_party" value={formData.opposite_party} onChange={handleChange} />

                    <label>Case Description</label>
                    <textarea name="case_description" rows="3" value={formData.case_description} onChange={handleChange}></textarea>
                </div>

                <div className="modal-actions full-width">
                    <button type="submit" className="save-btn">Update Client</button>
                    <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </>
    );
};

export default ClientEdit;