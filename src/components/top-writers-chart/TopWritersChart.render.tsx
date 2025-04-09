import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TopWritersChart = ({ data }: { data: any[] }) => {
  if (!data || data.length === 0) return null;

  return (
    <div>
      <h3>Top 5 Writers</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 50, right: 20 }}
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="writer" width={100} />
          <Tooltip />
          <Bar dataKey="count" fill="#9a8282" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopWritersChart;
