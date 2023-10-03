import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../css/GraphCard.css";

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);
const options = {
  responsive: true,
  tooltips: {
    enabled: true,
    mode: "point",
  },
  scales: {
    x: {
      ticks: {
        display: false,
      },
      grid: {
        display: false, // Set to false to hide x-axis grid lines
      }
    },
    y: {
      ticks: {
        display: true,
        stepSize: 5,
      },
      grid: {
        display: false, // Set to false to hide y-axis grid lines
      }
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
};

export default function GraphCard(props) {
  const [data, setData] = useState();
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (
      !props.showGraphData ||
      !props.graphData.x_axis ||
      !props.graphData.y_axis
    )
      return;

    const LowOrHighColor =
      props.graphData.y_axis[0] <
      props.graphData.y_axis[props.graphData.y_axis.length - 1]
        ? "#81b737"
        : "#d54f4f";

    setData({
      labels: props.graphData.x_axis,
      datasets: [
        {
          label: "",
          data: props.graphData.y_axis,
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: LowOrHighColor, // Use the dynamically calculated color
        },
      ],
    });

    setRender(true);
  }, [props.showGraphData, props.graphData.x_axis, props.graphData.y_axis]);
  const convertToDate = (props) => {
    let date = new Date(props),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);

    return [date.getFullYear(), mnth, day].join("-");
  };
  return render ? (
    <div className="main__chart" id={"myChart-" + props.graphData.stockValue}>
      <div>
        <h2 className="h5 mb-3 stockValue">
          {props.graphData.stockValue}
          {props.graphData.date_data ? (
            <div className="ml-2 d-inline">
              <span>
                ({convertToDate(props.graphData.date_data.filteredStartDate)}
                &nbsp;to&nbsp;
                {convertToDate(props.graphData.date_data.filteredEndDate)})
              </span>
            </div>
          ) : (
            <div className="ml-2 d-inline">(Last 72 Hours)</div>
          )}
        </h2>
        <Line className="myChart" options={options} data={data} />
      </div>
    </div>
  ) : null;
}
