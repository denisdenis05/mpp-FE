import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";

export const useStatsSocket = (isOnline: boolean | null) => {
  const [histogramData, setHistogramData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  const [topWriters, setTopWriters] = useState<any[]>([]);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5249/movieStatsHub")
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveHistogramData", (data) => {
      console.log("Received Histogram Data:", data);
      setHistogramData(data);
    });
    connection.on("ReceivePieChartData", (data) => {
      console.log("Received Pie Chart Data:", data);
      setPieData(data);
    });
    connection.on("ReceiveTopWritersData", (data) => {
      console.log("Received Top Writers Data:", data);
      setTopWriters(data);
    });

    connection
      .start()
      .then(() => {
        console.log("WebSocket connection established!");
      })
      .catch((err) => {
        console.error("Error while starting WebSocket connection:", err);
      });

    return () => {
      console.log("Closing WebSocket connection...");
      connection.stop();
    };
  }, [isOnline]);

  return { histogramData, pieData, topWriters };
};
