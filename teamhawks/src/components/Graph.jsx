import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "./Graph.css"; // We'll add some custom styles

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Title
);

const Graph = () => {
  // State to track evaluation-based responses
  const [responses, setResponses] = useState({
    onDelivery: [5, 6, 4, 7, 8, 3, 5, 9, 6, 5, 7, 6],
    quality: [7, 5, 9, 6, 4, 8, 5, 7, 9, 6, 5, 8],
    costEfficiency: [6, 7, 5, 8, 6, 7, 9, 5, 6, 8, 7, 5],
    compliance: [8, 9, 7, 5, 6, 4, 8, 9, 7, 8, 5, 9],
    responsiveness: [6, 5, 8, 9, 6, 7, 5, 8, 6, 7, 8, 6],
    riskManagement: [9, 8, 6, 7, 5, 9, 8, 5, 7, 6, 9, 5],
  });

  // Chart data, updated dynamically based on responses
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // Example labels
    datasets: [
      {
        label: "On delivery",
        data: responses.onDelivery,
        borderColor: "#FF8C00",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Quality",
        data: responses.quality,
        borderColor: "#228B22",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Cost efficiency",
        data: responses.costEfficiency,
        borderColor: "#9370DB",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Compliance",
        data: responses.compliance,
        borderColor: "#FFFFFF",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Responsiveness",
        data: responses.responsiveness,
        borderColor: "#DC143C",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Risk management",
        data: responses.riskManagement,
        borderColor: "#00CED1",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#FFFFFF",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
      title: {
        display: true,
        text: "Vendor Performance Evaluation",
        color: "#FFFFFF",
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          color: "#444444",
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="centered-chart">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Graph;
