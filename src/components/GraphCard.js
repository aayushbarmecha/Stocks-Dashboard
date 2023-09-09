import { Chart } from "chart.js";
import '../css/GraphCard.css';

export default function GraphCard ({props}) {
    return (
        <div className="card card-container graph">
            <div>
              <h2 className="h5 mb-3 stockValue">
                { this.props.graphData.stockValue }
                  { 
                    this.props.graphData.date_data 
                    ? 
                    <div className="ml-2 d-inline">
                      <span>
                      (
                      { this.convertToDate(this.props.graphData.date_data.filteredStartDate) } 
                      &nbsp;to&nbsp;
                      { this.convertToDate(this.props.graphData.date_data.filteredEndDate) }
                      )
                      </span> 
                    </div>
                    : <div className="ml-2 d-inline">(Last 72 Hours)</div> 
                  }
              </h2>
              <canvas 
                  className="myChart"
                  ref={this.chartRef}
              /> 
            </div>
        </div>
    );
}