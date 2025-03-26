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

const calculateHistogram = (data: number[]) => {
  const min = 0;
  const max = 10;
  const binCount = max - min;

  const histogram = Array.from({ length: binCount }, (_, i) => ({
    range: `${i} - ${i + 1}`,
    count: 0,
  }));

  data.forEach((value) => {
    let index = Math.floor(value);
    if (index >= min && index < max) {
      histogram[index].count += 1;
    }
  });

  return histogram;
};

const StatsChart = ({ data, stats }: { data: any; stats: any }) => {
  const [histogram, setHistogram] = useState<any>([]);

  useEffect(() => {
    if (!data || data.length === 0) {
      setHistogram([]);
      return;
    }

    const histogramData = calculateHistogram(
      data.map((item: any) => item.Rating)
    );
    setHistogram(histogramData);
  }, [data]);

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={histogram}>
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
