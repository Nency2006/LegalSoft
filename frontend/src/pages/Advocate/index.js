import React, { useState, useEffect } from "react";
import axios from "axios";
import AdvocateAddForm from "./AdvocateAddForm";
import AdvocateView from "./AdvocateView"; // નવું કમ્પોનન્ટ

const Advocate = () => {
    const [advocates, setAdvocates] = useState([]);
    const [search, setSearch] = useState("");
    const [viewAdvocateId, setViewAdvocateId] = useState(null); // આમાં ID હશે તો પ્રોફાઇલ દેખાશે
    const [showModal, setShowModal] = useState(false);

    const fetchAdvocates = () => {
        axios.get("http://127.0.0.1:8000/api/advocate/")
            .then(res => setAdvocates(res.data))
            .catch(err => console.log(err));
    };

    useEffect(() => { fetchAdvocates(); }, []);

    // પ્રોફાઇલ વ્યુમાંથી પાછા લિસ્ટમાં આવવા માટે
    if (viewAdvocateId) {
        const selectedAdvocate = advocates.find(a => a.id === viewAdvocateId);
        return <AdvocateView
            advocate={selectedAdvocate}
            onBack={() => setViewAdvocateId(null)}
        />;
    }

    const filteredAdvocates = advocates.filter(a =>
        a.name?.toLowerCase().includes(search.toLowerCase())
    );

    const getInitial = (name) => {
        if (!name) return "";
        const cleanName = name.replace(/^(adv\.|advocate|adv)\s+/i, "").trim();
        return cleanName.charAt(0).toUpperCase();
    };

    return (
        <div className="right-content w-100">
            {/* Header / Breadcrumb */}
            <div className="mc-card mb-4">
                <div className="mc-breadcrumb d-flex justify-content-between align-items-center">
                    <h3 className="mc-breadcrumb-title">Advocate Details</h3>
                    <ul className="mc-breadcrumb-list d-flex gap-2 list-unstyled mb-0">
                        <li className="mc-breadcrumb-item"><a href="/">Home</a> /</li>
                        <li className="mc-breadcrumb-item">Dashboard /</li>
                        <li className="mc-breadcrumb-item active text-primary">Advocate</li>
                    </ul>
                </div>
            </div>

            <div className="advocate-main-container p-3">
                {/* Search & Add Section */}
                <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">
                    <div className="search-wrapper position-relative" style={{ width: '300px' }}>
                        <i className="bi bi-search position-absolute" style={{ left: '15px', top: '50%', transform: 'translateY(-50%)' }}></i>
                        <input
                            type="text"
                            className="form-control rounded-pill ps-5"
                            placeholder="Search advocate..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <button className="add-advocate-btn" onClick={() => setShowModal(true)}>
                        Add Advocate
                    </button>

                </div>

                {/* Cards Grid */}
                <div className="row g-4">
                    {filteredAdvocates.map((advocate) => (
                        <div className="col-12 col-md-6 col-lg-4" key={advocate.id}>
                            <div className="card border-0 shadow-sm p-3 rounded-4 h-100">
                                <div className="d-flex gap-3">
                                    <div className="avatar-circle-custom d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#a2d2ff', color: '#007bff', fontSize: '24px', fontWeight: 'bold' }}>
                                        {getInitial(advocate.name)}
                                    </div>
                                    <div className="flex-grow-1 min-width-0">
                                        <h6 className="mb-0 text-truncate">{advocate.name}</h6>
                                        <p className="text-muted small mb-3 text-truncate">{advocate.email}</p>
                                        <div className="small mb-3">
                                            <p className="mb-1"><strong>Phone:</strong> {advocate.phone}</p>
                                            <p className="mb-1"><strong>City:</strong> {advocate.city}</p>
                                            <p className="mb-0"><strong>State:</strong> {advocate.state}</p>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-outline-primary btn-sm flex-grow-1 rounded-3" onClick={() => setViewAdvocateId(advocate.id)}>
                                                <i className="bi bi-eye"></i> View Details
                                            </button>
                                            <button className="btn btn-light border btn-sm flex-grow-1 rounded-3">
                                                Open Cases: {advocate.caseCount || 0}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Modal Logic Here */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box large p-4 bg-white rounded-4">
                        <div className="modal-header border-0 d-flex justify-content-between">
                            <h2>Add New Advocate</h2>
                            <button className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <AdvocateAddForm onClose={() => setShowModal(false)} fetchAdvocates={fetchAdvocates} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Advocate;