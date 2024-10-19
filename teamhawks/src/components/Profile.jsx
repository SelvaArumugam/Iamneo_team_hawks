import React, { useState } from "react";
import defaultProfilePic from "../images/profile.jpg"; // Default profile picture
import "./Profile.css"; // Import the CSS file for styling

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main St, Springfield",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel turpis ac velit dapibus gravida.",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(user);
  const [profilePic, setProfilePic] = useState(defaultProfilePic); // State for profile picture

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Set the new profile picture
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setUser(formData); // Update user data on save
    } else {
      setFormData(user); // Reset form data to current user data
    }
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-header">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        {isEditMode && (
          <input type="file" accept="image/*" onChange={handleImageChange} className="image-upload" />
        )}
      </div>
      <div className="profile-details">
        <div className="detail">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="detail">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="detail">
          <strong>Phone:</strong> {user.phone}
        </div>
        <div className="detail">
          <strong>Address:</strong> {user.address}
        </div>
        <div className="detail">
          <strong>About:</strong> {user.about}
        </div>
      </div>
      <button onClick={toggleEditMode} className="edit-btn">
        {isEditMode ? "Save Changes" : "Edit Profile"}
      </button>

      {isEditMode && (
        <div className="edit-form">
          <h2>Edit Profile</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </label>
          <label>
            About:
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default Profile;
