import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "./Chart.style";

const StatsChart = ({ data }: { data: any[] }) => {
  if (!data || data.length === 0) return null;

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#9a8282" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default StatsChart;
