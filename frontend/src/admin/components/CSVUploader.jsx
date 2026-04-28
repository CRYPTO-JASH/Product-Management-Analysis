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
        let parsedData = results.data;

        // Convert numbers properly
        parsedData = parsedData.map((row) => {
          const newRow = {};
          for (let key in row) {
            const value = row[key];
            newRow[key] = isNaN(value) ? value : Number(value);
          }
          return newRow;
        });

        console.log("FINAL DATA:", parsedData); // 🔥 IMPORTANT
        setData(parsedData);
      },
    });
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
}