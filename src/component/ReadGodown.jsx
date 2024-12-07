import React, { useState, useEffect } from "react";
import { Dropbox } from "dropbox"; // Import Dropbox SDK
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import './ReadGodown.css'; // Assuming you have a CSS file for styles

const ReadGodown = () => {
  const [loading, setLoading] = useState(true);
  const [godownData, setGodownData] = useState(null);
  const [error, setError] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialize Dropbox client
        const dbx = new Dropbox({
          accessToken: import.meta.env.VITE_DROPBOX_ACCESS_TOKEN, // Ensure access token is set in the environment
        });

        // Fetch the file from Dropbox
        const fileName = "godown_data.json"; // Ensure the file name is correct
        const response = await dbx.filesDownload({
          path: `/SjjGodown/${fileName}`,
        });

        // // Log the raw response to debug the issue
        // console.log("Dropbox response:", response);

        // Check if the response contains file binary data (as Blob)
        const fileBlob = response.result.fileBlob;
        if (!fileBlob) {
          throw new Error("No file data returned from Dropbox");
        }

        // Convert the Blob into text (JSON content)
        const text = await fileBlob.text();
        // console.log("Downloaded file content:", text); // Debugging line

        // Check if the content is empty
        if (!text) {
          throw new Error("File content is empty");
        }

        // Parse the JSON content
        const parsedData = JSON.parse(text);
        setGodownData(parsedData); // Store the parsed data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from Dropbox:", error);
        setError(error.message || "Failed to load data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update current date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(
        now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <Link to="/edit" style={{ textDecoration: "none" }}>
          <label
            htmlFor=""
            style={{
              fontSize: "10px",
              marginTop: 1,
              textAlign: "center",
              fontWeight: "bold",
              display: "block",
            }}
          >
            Welcome To
          </label>
        </Link>
        <div className="card-body">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h5 className="text-primary fw-bold heading" >
              SRI JAYAJOTHI AND COMPANY PRIVATE LIMITED
            </h5>
            <img
              src="/images/sjjmlogo.jpg"
              alt=""
              style={{ height: "60px", width: "60px" }}
            />
          </div>
          <h5 className="text-center text-primary fw-bold mt-2 godwnhead">
            GODOWN DETAILS
          </h5>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th className="text-center bg-primary text-white">LABEL</th>
                <th className="text-center bg-primary text-white">VALUE</th>
              </tr>
            </thead>
            <tbody className="fw-bold">
              <tr>
                <td>GODOWN NAME</td>
                <td className="text-primary">{godownData.godownName}</td>
              </tr>
              <tr>
                <td>LOT NO</td>
                <td className="text-primary">{godownData.lotNumber}</td>
              </tr>
              <tr>
                <td>INWARD DATE</td>
                <td className="text-primary">{godownData.inwardDate}</td>
              </tr>
              <tr>
                <td>GINNING</td>
                <td className="text-primary">{godownData.ginning}</td>
              </tr>
              <tr>
                <td>NO OF BALE</td>
                <td className="text-primary">{godownData.noOfBales}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <label
          htmlFor=""
          style={{
            fontSize: "10px",
            marginBottom: 3,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Thank You for Visit !
        </label>
      </div>
      <div className="text-center mt-3">
        <p
          className="text-primary"
          style={{
            fontSize: "10px",
            marginBottom: 3,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {currentDateTime}
        </p>
      </div>
    </div>
  );
};

export default ReadGodown;
