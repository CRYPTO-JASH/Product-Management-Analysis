import React, { useState } from "react";
import Papa from "papaparse";

export default function CSVUploader({ setData }) {
  const [error, setError] = useState("");

  const REQUIRED_COLUMNS = ["name", "value", "category", "trend"];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError("");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rows = results.data;

        if (!rows || rows.length === 0) {
          setError("CSV is empty.");
          return;
        }

        const headers = Object.keys(rows[0]).map(h => h.toLowerCase());

        // 🔥 VALIDATION
        const missing = REQUIRED_COLUMNS.filter(col => !headers.includes(col));

        if (missing.length > 0) {
          setError(
            `Invalid CSV. Missing columns: ${missing.join(", ")}`
          );
          return;
        }

        // ✅ CLEAN DATA
        const parsedData = rows
          .filter(row => row.name && row.name.trim() !== "")
          .map(row => ({
            name: row.name,
            value: Number(row.value) || 0,
            category: row.category || "-",
            trend: row.trend || "-",
            hex: row.hex || ""
          }));

        setData(parsedData);
      },
      error: function () {
        setError("Error reading CSV file.");
      }
    });
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {/* 🔥 ERROR DISPLAY */}
      {error && (
        <div style={{
          marginTop: "10px",
          color: "red",
          fontSize: "14px"
        }}>
          {error}
        </div>
      )}
    </div>
  );
}