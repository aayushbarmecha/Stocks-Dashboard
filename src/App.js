import React from 'react';
import SearchCard from '../src/components/SearchCard';
import FilterCard from '../src/components/FilterCard';
import Tabledata from '../src/components/Tabledata';
import GraphCard from '../src/components/GraphCard';
import './App.css';

export default function App(){
  return (
    <div className="row app-container__row">
      <div className='col-12 app-container__container'>
        <div className='app-container__left'>
          <SearchCard> SearchCard</SearchCard>
          <FilterCard> FilterCard</FilterCard>
        </div>
        <div className='app-container__right'>
          <div className='card card-container graph'>
            <div className='card-body'>
              {/* {
                this.state.showGraphData
                ?
                <div>
                  <select className="custom-select main__chart-select" onChange={ (e) => this.checkStockCode(e.target.value) }>
                    { optionSelectDOM }
                  </select>
                  { graphCardDOM }
                </div>
                :
                <p no-graph-data-message>No current stock found. Please go to the first box and search for a stock.</p>
              } */}
              <GraphCard>GraphCard</GraphCard>
            </div>
          </div>
          
        </div>
        <div className="row table-data-row">
          <div className="col-12 table-data-col">
            <Tabledata>TabledataCard</Tabledata>
            </div>
          </div>
      </div>
    </div>
  );
}
