import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Charts({ data }) {
  const keys = Object.keys(data[0] || {});

  const [xKey, setXKey] = useState(keys[0]);
  const [yKey, setYKey] = useState(keys[1]);

  return (
    <div>
      {/* Dropdowns */}
      <div style={{ marginBottom: "20px" }}>
        <label>X Axis: </label>
        <select onChange={(e) => setXKey(e.target.value)} value={xKey}>
          {keys.map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>

        <label style={{ marginLeft: "20px" }}>Y Axis: </label>
        <select onChange={(e) => setYKey(e.target.value)} value={yKey}>
          {keys.map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={yKey} fill="#8884d8" />
      </BarChart>
    </div>
  );
}