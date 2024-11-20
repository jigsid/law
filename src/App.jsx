import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null); // State to store API response
  const [error, setError] = useState(null); // State to store errors
  const [loading, setLoading] = useState(false); // State for loading indicator

  // API endpoints for each button
  const apiEndpoints = {
    "District Court": "https://phoenix.akshit.me/district-court/states",
    "High Court": "https://phoenix.akshit.me/district-court/states",
    "Delhi High Court": "https://phoenix.akshit.me/delhi-high-court/case-types",
    "Consumer Forum":
      "https://phoenix.akshit.me/consumer-forum/state-commission/states",
    NCLT: "https://phoenix.akshit.me/nclt/states",
  };

  // Function to handle button clicks
  const handleClick = async (courtType) => {
    setLoading(true);
    setError(null); // Reset error state
    setData(null); // Reset data state

    const apiUrl = apiEndpoints[courtType]; // Get API URL for the court type

    try {
      const response = await axios.post(apiUrl); // Fetch data from the API
      setData(response.data); // Set API response data
    } catch (err) {
      setError(err.message || "An error occurred"); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Legal Court Information</h1>
      <p>Click a button to fetch court details:</p>

      {/* Buttons */}
      <div style={{ marginBottom: "20px" }}>
        {Object.keys(apiEndpoints).map((court) => (
          <button
            key={court}
            onClick={() => handleClick(court)}
            style={{
              margin: "5px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          >
            {court}
          </button>
        ))}
      </div>

      {/* Display Loading State */}
      {loading && <p>Loading...</p>}

      {/* Display Error State */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display API Data */}
      {data && (
        <div style={{ marginTop: "20px" }}>
          <h2>Response:</h2>
          <pre
            style={{
              background: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
              overflow: "auto",
              maxHeight: "300px",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
