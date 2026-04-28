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

        const parsedData = results.data.map((row) => {

          // 🔥 TRIM ALL KEYS (THIS FIXES YOUR ISSUE)
          const cleanRow = {};
          Object.keys(row).forEach(key => {
            cleanRow[key.trim().toLowerCase()] = row[key];
          });

          return {
            name: cleanRow.name || "Unknown",
            value: Number(cleanRow.value) || 0,
            category: cleanRow.category || "-",
            trend: cleanRow.trend || "-",
            hex: cleanRow.hex || "#ccc"
          };
        });

        console.log("FINAL DATA:", parsedData);
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