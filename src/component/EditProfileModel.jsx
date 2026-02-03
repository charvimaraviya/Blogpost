import { useEffect, useState } from "react";
import "./EditProfileModel.css";
import { toast } from "react-toastify";

export default function EditProfile({ onClose,userId }) {

  console.log("Edit profile userId:", userId);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    mobileNumber: "",
    role: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userId) {
      fetchUserById();
    }
  }, [userId]);

  const fetchUserById = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://696b4b79624d7ddccaa0bd60.mockapi.io/user/${userId}`
      );
      const data = await response.json();
      setForm({
        name: data?.name || "",
        mobileNumber: data?.mobileNumber || "",
        role: data?.role || "",
        otp: data?.otp,});
    } catch (error) {
      console.error("Fetch user error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const handleSave = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
  
      const response = await fetch(
        `https://696b4b79624d7ddccaa0bd60.mockapi.io/user/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: form.name,
            mobileNumber: form.mobileNumber
          })
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
  
      const updateData = await response.json();
      console.log("Profile Updated:", updateData);
  
      toast.success("Profile Updated Successfully!");
      onClose();
  
    } catch (error) {
      console.error("Update Error:", error.message);
      console.error("Update Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <form className="profile-form" onSubmit={handleSave}>
        <h1>Edit Profile</h1>

        <input
          type="text"
          className="Profile-input"
          placeholder="Full name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <input
          type="text"
          className="Profile-input"
          placeholder="Mobile number"
          value={form.mobileNumber}
          onChange={(e) => handleChange("mobileNumber", e.target.value)}
        />

        <select
          className="Profile-input"
          value={form.role}
          onChange={(e) => handleChange("role", e.target.value)}
          disabled 
        >
          <option value="">Select a Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <input
          type="text"
          placeholder="Enter OTP"
          className="Profile-input"
          maxLength={4}
          value={form.otp}
          onChange={(e) => handleChange("otp", e.target.value)}
          disabled 
        />

        <div className="post-btn">
          <button
            type="button"
            className="btn-post-cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn-post"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}