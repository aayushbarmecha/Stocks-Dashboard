import '../css/FilterCard.css';
import { FaChartBar } from 'react-icons/fa';
import stock from '../apis/stocks';

export default function FilterCard({props}) {
    return (
        <div className="card card-container filter">
            <div className="card-body">
                <h2 className='h6 mb-2'>Filter by Stock Code:</h2>{
                    this.props.showFilterDOM?
                    <div>
                        <select className="custom-select filter-select">
                            { optionSelectDOM }
                        </select>
                        <div className="d-flex filter-card-date mt-2">
                            <div className="filter-card-date-div">
                                <label className="mb-0">Start Date:</label>
                                <input className="form-control start-date" type="date" onChange={ (e) => this.start_dateValidator(e.target.value) }></input>
                            </div>
                            <div className="filter-card-date-div">
                                <label className="mb-0">End Date:</label>
                                <input className="form-control end-date" type="date" onChange={ (e) => this.end_dateValidator(e.target.value) }></input>
                            </div>
                        </div>
                        <button className="btn btn-secondary w-100 mt-3 btn-filter" onClick={ this.filterMyChart }>Filter<FaChartBar/></button>
                    </div>
                    :
                    <p mb-0 no-filter-message>No Stock Code to Filter. Please search stock code for more details</p>
                }
            </div>
        </div>
    );
}
