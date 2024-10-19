import React, { useState } from "react";
import "./VendorList.css"; // Ensure you import the CSS file

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEvaluationCardOpen, setIsEvaluationCardOpen] = useState(false);
  const [currentVendor, setCurrentVendor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    service: "",
    contact: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [evaluationResponses, setEvaluationResponses] = useState({}); // State for evaluation responses

  // Handle the form inputs change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Add or Edit Vendor
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
        setVendors([...vendors, { ...formData, evaluations: [] }]);
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      service: "",
      contact: "",
    });
    setIsPopupOpen(false); // Close the popup after adding or editing
    setIsEditMode(false); // Reset edit mode
  };

  // Remove a vendor
  const removeVendor = (index) => {
    const updatedVendors = vendors.filter((_, i) => i !== index);
    setVendors(updatedVendors);
  };

  // Toggle the form popup
  const togglePopup = () => {
    resetForm();
    setIsPopupOpen(!isPopupOpen);
  };

  // Open vendor details modal
  const openModal = (vendor) => {
    setCurrentVendor(vendor);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVendor(null);
  };

  // Edit vendor details
  const editVendor = (vendor) => {
    setFormData(vendor);
    setIsEditMode(true);
    setIsPopupOpen(true); // Open form popup for editing
    setIsModalOpen(false); // Close the modal when editing
  };

  // Open evaluation card
  const openEvaluationCard = (vendor) => {
    setCurrentVendor(vendor);
    setIsEvaluationCardOpen(true);
  };

  // Handle evaluation submission
  const submitEvaluation = (e) => {
    e.preventDefault();
    const evaluation = {
      onDelivery: e.target.onDelivery.checked ? 100 : 0,
      quality: e.target.quality.checked ? 100 : 0,
      costEfficient: e.target.costEfficient.checked ? 100 : 0,
      responsiveness: e.target.responsiveness.checked ? 100 : 0,
      riskManagement: e.target.riskManagement.checked ? 100 : 0,
      compliance: e.target.compliance.value,
      feedback: e.target.feedback.value,
    };

    // Add evaluation to current vendor
    const updatedVendors = vendors.map((vendor) => {
      if (vendor === currentVendor) {
        return { ...vendor, evaluations: [...vendor.evaluations, evaluation] };
      }
      return vendor;
    });
    setVendors(updatedVendors);
    setEvaluationResponses((prev) => ({
      ...prev,
      [currentVendor.name]: evaluation,
    }));

    setIsEvaluationCardOpen(false);
  };

  // Filter vendors based on search term
  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {/* Header with Search bar and Add button */}
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

      {/* Vendor List */}
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
                  onClick={() => openEvaluationCard(vendor)}
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

      {/* Popup Form */}
      {isPopupOpen && (
        <div className="popup-form" onClick={togglePopup}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside form
          >
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

      {/* Evaluation Card */}
      {isEvaluationCardOpen && (
        <div
          className="evaluation-card"
          onClick={() => setIsEvaluationCardOpen(false)}
        >
          <div
            className="evaluation-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Evaluate {currentVendor?.name}</h2>
            <form onSubmit={submitEvaluation}>
              <label>
                <input type="checkbox" name="onDelivery" />
                On Delivery (100%)
              </label>
              <label>
                <input type="checkbox" name="quality" />
                Quality (100%)
              </label>
              <label>
                <input type="checkbox" name="costEfficient" />
                Cost Efficient (100%)
              </label>
              <label>
                <input type="checkbox" name="responsiveness" />
                Responsiveness (100%)
              </label>
              <label>
                <input type="checkbox" name="riskManagement" />
                Risk Management (100%)
              </label>
              <input
                type="text"
                name="compliance"
                placeholder="Compliance"
                required
              />
              <textarea
                name="feedback"
                placeholder="Feedback"
                required
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Viewing Vendor Details */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Vendor Details</h3>
            <p>Name: {currentVendor?.name}</p>
            <p>Email: {currentVendor?.email}</p>
            <p>Service: {currentVendor?.service}</p>
            <p>Contact: {currentVendor?.contact}</p>
            <h4>Evaluations:</h4>
            {currentVendor?.evaluations.length > 0 ? (
              currentVendor.evaluations.map((evaluation, idx) => (
                <div key={idx} className="evaluation-detail">
                  <p>On Delivery: {evaluation.onDelivery}%</p>
                  <p>Quality: {evaluation.quality}%</p>
                  <p>Cost Efficient: {evaluation.costEfficient}%</p>
                  <p>Responsiveness: {evaluation.responsiveness}%</p>
                  <p>Risk Management: {evaluation.riskManagement}%</p>
                  <p>Compliance: {evaluation.compliance}</p>
                  <p>Feedback: {evaluation.feedback}</p>
                </div>
              ))
            ) : (
              <p>No evaluations submitted yet.</p>
            )}
            <button onClick={() => editVendor(currentVendor)}>Edit</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorList;
