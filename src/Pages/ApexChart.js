import React, { useState, useEffect, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { AppContext } from "../context";

const ApexChart = () => {
  const { totalappointment } = useContext(AppContext);

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Count",
        data: Array(8).fill(0),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      stroke: {
        width: 1,
        colors: ["#C4DEA7"],
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "20%",
          backgroundColor: "green",
        },
      },
      xaxis: {
        categories: ["Total Appointments"],
        labels: {
          rotate: -45,
        },
      },
      fill: {
        opacity: 1,
      },
      colors: ["#C4DEA7"],
      yaxis: {
        labels: {
          formatter: (val) => val.toFixed(0),
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
    },
  });

  useEffect(() => {
    if (totalappointment) {
      setChartData((prevData) => ({
        ...prevData,
        series: [
          {
            name: "Count",
            data: [totalappointment ? totalappointment : 0],
          },
        ],
      }));
    }
  }, [totalappointment]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default ApexChart;
