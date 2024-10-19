import React, { useState } from "react";
import "./VendorList.css";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVendor, setCurrentVendor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false); // New state for evaluation
  const [evaluations, setEvaluations] = useState({}); // Store evaluations for vendors

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    service: "",
    contact: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Evaluation form data
  const [evaluationData, setEvaluationData] = useState({
    onDelivery: 50,
    quality: 90,
    costEfficiency: 20,
    compliance: 75,
    responsiveness: 15,
    riskManagement: 80,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addOrEditVendor = () => {
    if (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.service &&
      formData.contact
    ) {
      if (isEditMode) {
        const updatedVendors = vendors.map((vendor) =>
          vendor === currentVendor ? formData : vendor
        );
        setVendors(updatedVendors);
      } else {
        setVendors([...vendors, formData]);
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        service: "",
        contact: "",
      });
      setIsPopupOpen(false);
      setIsEditMode(false);
    }
  };

  const removeVendor = (index) => {
    const updatedVendors = vendors.filter((_, i) => i !== index);
    setVendors(updatedVendors);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setFormData({
      name: "",
      email: "",
      password: "",
      service: "",
      contact: "",
    });
    setIsEditMode(false);
  };

  const openModal = (vendor) => {
    setCurrentVendor(vendor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVendor(null);
  };

  const editVendor = (vendor) => {
    setFormData(vendor);
    setIsEditMode(true);
    setIsPopupOpen(true);
    setIsModalOpen(false);
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open Evaluation form
  const openEvaluationForm = (vendor) => {
    setCurrentVendor(vendor);
    setIsEvaluationOpen(true);
  };

  // Handle slider change
  const handleEvaluationChange = (e) => {
    const { name, value } = e.target;
    setEvaluationData({ ...evaluationData, [name]: Number(value) });
  };

  // Submit evaluation
  const submitEvaluation = () => {
    const updatedEvaluations = { ...evaluations };
    if (!updatedEvaluations[currentVendor.name]) {
      updatedEvaluations[currentVendor.name] = [];
    }
    updatedEvaluations[currentVendor.name].push(evaluationData);
    setEvaluations(updatedEvaluations);
    setIsEvaluationOpen(false);
  };

  return (
    <div className="container">
      <div className="header">
        <input
          type="text"
          placeholder="Search by vendor name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button onClick={togglePopup} className="add-btn">
          {isEditMode ? "Edit Vendor" : "Add Vendor"}
        </button>
      </div>

      <div className="vendor-list">
        {filteredVendors.length > 0 ? (
          filteredVendors.map((vendor, index) => (
            <div className="vendor" key={index}>
              <span>
                {index + 1}. {vendor.name}
              </span>
              <div className="button-group">
                <button className="view-btn" onClick={() => openModal(vendor)}>
                  View
                </button>
                <button
                  className="evaluate-btn"
                  onClick={() => openEvaluationForm(vendor)}
                >
                  Evaluate
                </button>
                <button
                  className="delete-btn"
                  onClick={() => removeVendor(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-vendor-found">No vendors found</p>
        )}
      </div>

      {isPopupOpen && (
        <div className="popup-form" onClick={togglePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{isEditMode ? "Edit Vendor" : "Add Vendor"}</h2>
            <input
              type="text"
              name="name"
              placeholder="Vendor Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="service"
              placeholder="Service Provided"
              value={formData.service}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleInputChange}
            />
            <button onClick={addOrEditVendor}>
              {isEditMode ? "Save Changes" : "Add Vendor"}
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Vendor Details</h3>
            <p>Name: {currentVendor?.name}</p>
            <p>Email: {currentVendor?.email}</p>
            <p>Service Provided: {currentVendor?.service}</p>
            <p>Contact Number: {currentVendor?.contact}</p>
            <button onClick={() => editVendor(currentVendor)}>Edit</button>
            {evaluations[currentVendor?.name] && (
              <div>
                <h4>Evaluations:</h4>
                {evaluations[currentVendor.name].map((evaluation, idx) => (
                  <div key={idx}>
                    <p>Evaluation {idx + 1}</p>
                    <p>On Delivery: {evaluation.onDelivery}%</p>
                    <p>Quality: {evaluation.quality}%</p>
                    <p>Cost Efficiency: {evaluation.costEfficiency}%</p>
                    <p>Compliance: {evaluation.compliance}%</p>
                    <p>Responsiveness: {evaluation.responsiveness}%</p>
                    <p>Risk Management: {evaluation.riskManagement}%</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {isEvaluationOpen && (
        <div className="modal" onClick={() => setIsEvaluationOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Evaluate {currentVendor?.name}</h3>
            <div>
              <label>On Delivery:</label>
              <input
                type="range"
                name="onDelivery"
                min="0"
                max="100"
                value={evaluationData.onDelivery}
                onChange={handleEvaluationChange}
              />
              <span>{evaluationData.onDelivery}%</span>
            </div>
            <div>
              <label>Quality:</label>
              <input
                type="range"
                name="quality"
                min="0"
                max="100"
                value={evaluationData.quality}
                onChange={handleEvaluationChange}
              />
              <span>{evaluationData.quality}%</span>
            </div>
            <div>
              <label>Cost Efficiency:</label>
              <input
                type="range"
                name="costEfficiency"
                min="0"
                max="100"
                value={evaluationData.costEfficiency}
                onChange={handleEvaluationChange}
              />
              <span>{evaluationData.costEfficiency}%</span>
            </div>
            <div>
              <label>Compliance:</label>
              <input
                type="range"
                name="compliance"
                min="0"
                max="100"
                value={evaluationData.compliance}
                onChange={handleEvaluationChange}
              />
              <span>{evaluationData.compliance}%</span>
            </div>
            <div>
              <label>Responsiveness:</label>
              <input
                type="range"
                name="responsiveness"
                min="0"
                max="100"
                value={evaluationData.responsiveness}
                onChange={handleEvaluationChange}
              />
              <span>{evaluationData.responsiveness}%</span>
            </div>
            <div>
              <label>Risk Management:</label>
              <input
                type="range"
                name="riskManagement"
                min="0"
                max="100"
                value={evaluationData.riskManagement}
                onChange={handleEvaluationChange}
              />
              <span>{evaluationData.riskManagement}%</span>
            </div>
            <button onClick={submitEvaluation}>Submit Evaluation</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorList;
