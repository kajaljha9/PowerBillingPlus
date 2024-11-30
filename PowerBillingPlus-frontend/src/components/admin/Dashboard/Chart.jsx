import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ArcElement,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ArcElement
);

const Chart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from your API (adjust URL accordingly)
    fetch("http://localhost:3000/admin/dashboard")
      .then((response) => response.json())
      .then((data) => {
        setChartData(data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  // If data is still loading, show a loading message
  if (!chartData) {
    return <div>Loading...</div>;
  }

  const pieChartData = {
    labels: ["Total Amount", "Paid Amount", "Pending Amount"],
    datasets: [
      {
        data: [
          chartData.totalFare,
          chartData.totalPaidAmount,
          chartData.totalPending,
        ],
        backgroundColor: ["#36A2EB", "green", "yellow"],
        hoverOffset: 4,
      },
    ],
  };

  const pieChartData2 = {
    labels: ["Total Bills", "Paid Bill", "Pending Bill"],
    datasets: [
      {
        data: [
          chartData.totalBills,
          chartData.paidBillsCount,
          chartData.totalPendingBills,
        ],
        backgroundColor: ["#36A2EB", "green", "yellow"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ margin: "50px auto", width: "90%" }}>
      

      {/* Bar Chart Container */}
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
        <div
          style={{
            width: "45%",
            height: "300px",
            marginBottom: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Bill Payment Breakdown (Bills)</h3>
          <Pie data={pieChartData2} options={{ responsive: true }} />
        </div>

        {/* Pie Chart Container */}
        <div
          style={{
            width: "45%",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Bill Payment Breakdown (Amount)</h3>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
