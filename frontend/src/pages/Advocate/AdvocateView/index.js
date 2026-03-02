import React from "react";

const AdvocateView = ({ advocate, onBack }) => {
    if (!advocate) return null;

    const getInitial = (name) => {
        if (!name) return "";
        const cleanName = name.replace(/^(adv\.|advocate|adv)\s+/i, "").trim();
        return cleanName.charAt(0).toUpperCase();
    };

    return (
        <div className="right-content w-100">
           
            <div className="mc-card mb-4">
                <div className="mc-breadcrumb d-flex justify-content-between align-items-center">
                    <h3 className="mc-breadcrumb-title">Profile</h3>
                    <ol className="breadcrumb mb-0" style={{ fontSize: "14px" }}>
                            <li className="breadcrumb-item"><a href="/" className="text-decoration-none text-muted"><i className="bi bi-house-door"></i> Home</a></li>
                            <li className="breadcrumb-item text-muted">Dashboard</li>
                            <li className="breadcrumb-item text-muted">Advocate</li>
                            <li className="breadcrumb-item active text-primary fw-bold" aria-current="page">Advocate View</li>
                        </ol>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
                {/* Tabs Header */}
                <div className="px-4 pt-3 border-bottom">
                    <div className="d-flex gap-4">
                        <div className="tab-item active-tab pb-2 cursor-pointer">
                            <i className="bi bi-person-circle me-2"></i>Profile
                        </div>
                        <div className="tab-item text-muted pb-2 cursor-pointer">
                            <i className="bi bi-file-text me-2"></i>Cases
                        </div>
                        <div className="tab-item text-muted pb-2 cursor-pointer">
                            <i className="bi bi-gear me-2"></i>Setting
                        </div>
                        {/* Back button shifted to the right within tabs if needed, or kept in header */}
                        <button className="btn btn-sm btn-link text-decoration-none ms-auto pb-2 text-danger" onClick={onBack}>
                            <i className="bi bi-x-circle me-1"></i> Close
                        </button>
                    </div>
                </div>

                <div className="card-body p-4 bg-light-subtle">
                    <div className="row g-4">
                        {/* Left Column: Avatar & Summary */}
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm p-4 text-center rounded-4 h-100 bg-white">
                                <div className="mx-auto mb-3 d-flex align-items-center justify-content-center shadow-sm avatar-main">
                                    {advocate.photo ? (
                                        <img src={advocate.photo} alt={advocate.name} className="img-fluid rounded-circle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <span className="avatar-text">{getInitial(advocate.name)}</span>
                                    )}
                                </div>
                                <h5 className="fw-bold mb-1">{advocate.name}</h5>
                                <span className="badge bg-primary-subtle text-primary border-0 px-3 py-2 rounded-pill mb-3">
                                    {advocate.specialization} Advocate
                                </span>
                                
                                <hr className="my-3 opacity-25" />
                                
                                <div className="text-start small info-grid">
                                    <p className="mb-2"><span className="text-muted fw-bold">Email:</span> <br/>{advocate.email}</p>
                                    <p className="mb-2"><span className="text-muted fw-bold">Phone:</span> <br/>{advocate.phone}</p>
                                    <p className="mb-0"><span className="text-muted fw-bold">Location:</span> <br/>{advocate.city}, {advocate.state}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Details */}
                        <div className="col-lg-8">
                            {/* About Me / Address */}
                            <div className="card border-0 shadow-sm p-4 rounded-4 mb-4 bg-white">
                                <h6 className="fw-bold border-bottom pb-2 mb-3 text-uppercase" style={{fontSize: '13px', letterSpacing: '1px'}}>About Me</h6>
                                <p className="text-muted small mb-0">
                                    {advocate.address || "Office address not updated."} 
                                    {advocate.pincode ? ` (${advocate.pincode})` : ""}
                                </p>
                            </div>

                            <div className="row g-4">
                                {/* Personal Info */}
                                <div className="col-md-6">
                                    <div className="card border-0 shadow-sm p-4 rounded-4 h-100 bg-white">
                                        <h6 className="fw-bold border-bottom pb-2 mb-3 text-uppercase" style={{fontSize: '13px', letterSpacing: '1px'}}>Personal Details</h6>
                                        <div className="detail-row mb-2">
                                            <label className="text-muted d-block small">Gender</label>
                                            <span className="fw-semibold">{advocate.gender}</span>
                                        </div>
                                        <div className="detail-row mb-2">
                                            <label className="text-muted d-block small">Date of Birth</label>
                                            <span className="fw-semibold">{advocate.dob || "N/A"}</span>
                                        </div>
                                        <div className="detail-row">
                                            <label className="text-muted d-block small">Status</label>
                                            <span className={`badge ${advocate.is_active ? 'bg-success' : 'bg-danger'} rounded-pill`}>
                                                {advocate.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Professional Info */}
                                <div className="col-md-6">
                                    <div className="card border-0 shadow-sm p-4 rounded-4 h-100 bg-white">
                                        <h6 className="fw-bold border-bottom pb-2 mb-3 text-uppercase" style={{fontSize: '13px', letterSpacing: '1px'}}>Professional Details</h6>
                                        <div className="detail-row mb-2">
                                            <label className="text-muted d-block small">Bar Council Number</label>
                                            <span className="fw-semibold text-primary">{advocate.bar_council_no}</span>
                                        </div>
                                        <div className="detail-row mb-2">
                                            <label className="text-muted d-block small">Experience</label>
                                            <span className="fw-semibold">{advocate.experience_years} Years</span>
                                        </div>
                                        <div className="detail-row">
                                            <label className="text-muted d-block small">Joining Date</label>
                                            <span className="fw-semibold">{new Date(advocate.join_date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvocateView;