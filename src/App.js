import React, { useState, useEffect } from 'react';
import SearchCard from '../src/components/SearchCard';
import FilterCard from '../src/components/FilterCard';
import TableDataCard from '../src/components/TableDataCard';
import GraphCard from '../src/components/GraphCard';
import './App.css';

const App = () => {
    const [tableData, setTableData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [activeStockValue, setActiveStockValue] = useState('');
    const [showFilterDOM, setShowFilterDOM] = useState(false);
    // eslint-disable-next-line
    const [showFilterData, setShowFilterData] = useState(false);
    const [showTableData, setShowTableData] = useState(false);
    const [showGraphData, setShowGraphData] = useState(false);
    const [lsArray, setLsArray] = useState([]);

    useEffect(() => {
      graphData.forEach((graphData, index) => {
            console.log(graphData);
          const element = document.querySelector(`#myChart-${graphData.stockValue}`);
          if (element) {
              element.style.display = "none";
              if (index === graphData.length - 1) {
                  element.style.display = "block";
              }
          }
      });
  }, [graphData]);

    const sendSearchResult = (data) => {
        if(data !== "Symbol not supported"){
            setTableData([...tableData, data]);
            setShowFilterDOM(true);
            setShowTableData(true);
        }
    };

    const getFilteredData = (date, response_data) => {
        let abc = [...graphData];
        let converted_array = [];
        
        for(let i = 0; i < abc.length; i++){
            let obj = abc[i];

            if(response_data.stockValue.indexOf(obj.stockValue) !== -1){
                converted_array = [];
                for(let i = 0; i < response_data.response.t.length; i++){
                    converted_array.push(new Date(response_data.response.t[i] * 1000))
                }
                abc.splice(i, 1);
                abc.push({
                    stockValue: response_data.stockValue,
                    x_axis: converted_array,
                    y_axis: response_data.response.c,
                    date_data: {
                        filteredStartDate: new Date(date[0]*1000),
                        filteredEndDate: new Date(date[1]*1000)
                    }
                });
                setGraphData([...abc]);
                setActiveStockValue(response_data.stockValue);
                setShowGraphData(true);
            }
        }
    };

    const sendSearchGraphResult = (codeExist, graph_array) => {
        if(codeExist !== "no_data"){
            let converted_array = [];
        
            setLsArray([...lsArray, graph_array.stockValue]);
            localStorage.setItem('historyStockArray', JSON.stringify(lsArray));
            if(graph_array.response.s !== "no_data"){

                for(let i = 0; i < graph_array.response.t.length; i++){
                    converted_array.push(new Date(graph_array.response.t[i] * 1000))
                }
                setGraphData([...graphData, {
                    stockValue: graph_array.stockValue,
                    x_axis: converted_array,
                    y_axis: graph_array.response.c,
                }]);
                setActiveStockValue(graph_array.stockValue);
                setShowGraphData(true);
            }else{
                setGraphData([...graphData, {
                    stockValue: graph_array.stockValue, 
                    response: "no_data",
                }]);
                setShowGraphData(true);
            }
        }else{
            alert("Stock Code does not exist within the Database.");
            window.location.reload(true);
        }
    };

    const checkStockCode = (stockValue) => {
        graphData.forEach((graphData, index) => {
            document.querySelector('#myChart-' + graphData.stockValue).style.display = "none";
            if(index === graphData.length - 1){
                document.querySelector('#myChart-' + stockValue).style.display = "block";
            }
        }); 
    };

    let graphCardDOM = '';
    let optionSelectDOM = '';

    if(showGraphData){
        console.log('Graph');
        graphCardDOM = graphData.map((graphData, index) => {
            // console.log(graphData.response);
            if(graphData.response !== "no_data"){
                return (
                    // <div>hello</div>
                    <GraphCard
                        key = { index }
                        tableData = { tableData }
                        showGraphData = { showGraphData }
                        showActiveStockCode = { activeStockValue }
                        graphData = { graphData }
                        filteredData = { showFilterData }
                        showFilterData = { showFilterData }>
                    </GraphCard>
                );
            }else{
                return(
                    <p key={ index } 
                       className="no-graph-data-message">
                        No Data Currently Available. Markets are closed during weekends 
                        and public holidays. Please filter by previous date.
                    </p>
                )
            }
        });
    }

    optionSelectDOM = graphData.map((graphData, index) => (
        <option
            value={graphData.stockValue}
            key={index}
            selected={graphData === graphData[graphData.length - 1] ? "selected" : ""}
        >
            {graphData.stockValue}
        </option>
    ));

    return (
        <div className={ showGraphData ? "container-fluid app-container" : "container-fluid app-container height-100" }>
            <div className="row app-container__row">
                <div className="col-12 app-container__container">
                    <div className="app-container__left">
                        <SearchCard 
                            sendSearchResult = { sendSearchResult }
                            sendSearchGraphResult = { sendSearchGraphResult }>
                        </SearchCard>
                        <FilterCard
                            showFilterDOM = { showFilterDOM }
                            showGraphData = { graphData }
                            showActiveStockCode = { activeStockValue }
                            getFilteredData = { getFilteredData }>
                        </FilterCard>
                    </div>
                    <div className="app-container__right">
                        <div className="card card-container graph">
                            <div className="card-body">
                                { 
                                    showGraphData 
                                    ? 
                                    <div>
                                        <select className="custom-select main__chart-select" onChange={ (e) => checkStockCode(e.target.value) }>
                                            { optionSelectDOM }
                                        </select>
                                        { graphCardDOM }
                                    </div>
                                    : 
                                    <p className="no-graph-data-message">
                                        No current stock found. Please go to the first box and search for a stock.
                                    </p> 
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row table-data-row">
                <div className="col-12 table-data-col">
                    <TableDataCard 
                        showTableData = { showTableData }
                        tableData = { tableData }
                        graphData = { graphData }>
                    </TableDataCard>
                </div>
            </div>
        </div>
    );
};

export default App;
