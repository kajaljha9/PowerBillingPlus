import { Chart as ChartJS } from "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";
import sourceData from "./sourceData.json";
import sourceDataPie from "./sourceDataPie.json";
import "./Track.css";
import RecentPayments from "./RecentPayments";

const Track = () => {
  return (
    <div className="Track">
      <div className="chart-container piechart">
        <h2 style={{ textAlign: "center", margin: "1remm 0rem" }}>
          Payments Distribution
        </h2>
        <Pie
          data={{
            labels: sourceDataPie.map((data) => data.label),
            datasets: [
              {
                label: "Payments",
                data: sourceDataPie.map((data) => data.value),
                backgroundColor: ["#4318FF", "#6AD2FF", "#EFF4FB"],
                borderColor: "#ffffff",
                borderWidth: 2
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false
          }}
        />
      </div>
      <div className="chart-container linechart">
        <h2 style={{ textAlign: "center", margin: "1remm 0rem" }}>
          Payments Over Time
        </h2>
        <Line
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: "Payments",
                data: sourceData.map((data) => data.value),
                borderColor: "#4318FF",
                backgroundColor: "rgba(67, 24, 255, 0.2)",
                tension: 0.3
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false
          }}
        />
      </div>

      {/* <div>
        <RecentPayments />
      </div> */}
    </div>
  );
};

export default Track;
