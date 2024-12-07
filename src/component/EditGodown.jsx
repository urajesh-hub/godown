import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dropbox } from "dropbox"; // Import Dropbox SDK
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported



const EditGodown = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    godownName: '',
    lotNumber: '',
    inwardDate: '',
    ginning: '',
    noOfBales: '',
  });
  const navigate = useNavigate();

  // Load existing data from localStorage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('godownData'));
    if (storedData) {
      setFormData(storedData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      // Save updated data to localStorage
      localStorage.setItem('godownData', JSON.stringify(formData));
  
      // Prepare data to save in Dropbox
      const fileContent = JSON.stringify(formData, null, 2);
      const fileName = `godown_data.json`;
  
      // Initialize Dropbox client
      const dbx = new Dropbox({
        accessToken: import.meta.env.VITE_DROPBOX_ACCESS_TOKEN, // Replace with a valid access token
      });
  
     
  
      // Upload file to Dropbox
      const response = await dbx.filesUpload({
        path: `/SjjGodown/${fileName}`,
        contents: fileContent,
        mode: { ".tag": "overwrite" }, // Overwrite if file exists
      });
  
      alert("Data successfully saved to Dropbox!");
  
      // Redirect to ReadGodown page
      navigate("/");
    } catch (error) {
      console.error("Error saving data to Dropbox:", error);
      alert("Failed to save data to Dropbox. Please try again.");
    }finally {
      setLoading(false); // Stop loading
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="card">
        <h1 className="text-center bg-primary text-white">GODOWN FORM</h1>
        <div className="card-body bg-light">
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label className="form-label fw-bold">Godown Name:</label>
              <input
                type="text"
                className="form-control"
                name="godownName"
                value={formData.godownName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Lot Number:</label>
              <input
                type="number"
                className="form-control"
                name="lotNumber"
                value={formData.lotNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Inward Date:</label>
              <input
                type="text"
                className="form-control"
                name="inwardDate"
                value={formData.inwardDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Ginning:</label>
              <input
                type="text"
                className="form-control"
                name="ginning"
                value={formData.ginning}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">No of Bales:</label>
              <input
                type="number"
                className="form-control"
                name="noOfBales"
                value={formData.noOfBales}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditGodown;
