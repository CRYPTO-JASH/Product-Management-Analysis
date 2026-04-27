import React from "react";
import Papa from "papaparse";

export default function CSVUploader({ setData }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log("Parsed Data:", results.data);
        setData(results.data);
      },
    });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
}