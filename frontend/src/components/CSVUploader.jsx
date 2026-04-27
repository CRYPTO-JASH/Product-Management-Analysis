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
        setData(results.data); // send data to parent
      },
    });
  };

  return (
    <div className="p-4 border rounded-lg">
      <input 
        type="file" 
        accept=".csv" 
        onChange={handleFileUpload} 
      />
    </div>
  );
}