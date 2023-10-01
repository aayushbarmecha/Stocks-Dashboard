// import '../css/FilterCard.css';
// import { FaChartBar } from 'react-icons/fa';
// import stock from '../apis/stocks';
// import { useEffect, useState } from 'react';

// export default function FilterCard({props}) {
//     const[validate_start,setValidateStart]=useState('');
//     const[validate_end,setValidateEnd]=useState('');

//     useEffect(()=>{
//         if(props.showFilterDOM){
//             document.querySelector(".btn-filter").disabled=true;
//         }
//     },[props.showFilterDOM]);

//     const startDateValidator = (val) => {
//         let current_date = new Date();

//         setValidateStart(val);

//         if (
//             Date.parse(validate_start) < Date.parse(validate_end) &&
//             Date.parse(validate_start) < current_date &&
//             Date.parse(validate_end) < current_date
//         ) {
//             document.querySelector(".btn-filter").disabled = false;
//         } else {
//             document.querySelector(".btn-filter").disabled = true;
//         }
//     };

//     const endDateValidator = (val) => {
//         let current_date = new Date();

//         setValidateEnd(val);

//         if (
//             Date.parse(validate_start) < Date.parse(validate_end) &&
//             Date.parse(validate_end) < current_date
//         ) {
//             document.querySelector(".btn-filter").disabled = false;
//         } else {
//             document.querySelector(".btn-filter").disabled = true;
//         }
//     };

//     const filterMyChart = async () => {
//         let stockValue = document.querySelector(".filter-select").value;
//         let startDate = new Date(document.querySelector("input.start-date").value) / 1000;
//         let endDate = new Date(document.querySelector("input.end-date").value) / 1000;

//         const graph_response = await stock.get('/stock/candle', {
//             params: {
//                 symbol: stockValue,
//                 resolution: 5,
//                 from: startDate,
//                 to: endDate,
//                 token: 'bqhq9i7rh5rbubolrqd0'
//             }
//         });

//         props.getFilteredData([startDate, endDate], { stockValue: stockValue, response: graph_response.data });
//         document.querySelector("input.start-date").value = '';
//         document.querySelector("input.end-date").value = '';
//     };

//     let optionSelectDOM = '';

//     optionSelectDOM = props.showGraphData.map((graphData, index) => (
//         <option
//             value={graphData.stockValue}
//             key={index}
//             selected={props.showGraphData[props.showGraphData.length - 1] === graphData ? "selected" : ""}
//         >
//             {graphData.stockValue}
//         </option>
//     ));

//     return (
//         <div className="card card-container filter">
//             <div className="card-body">
//                 <h2 className='h6 mb-2'>Filter by Stock Code:</h2>{
//                     props.showFilterDOM?
//                     <div>
//                         <select className="custom-select filter-select">
//                             { optionSelectDOM }
//                         </select>
//                         <div className="d-flex filter-card-date mt-2">
//                             <div className="filter-card-date-div">
//                                 <label className="mb-0">Start Date:</label>
//                                 <input className="form-control start-date" type="date" onChange={ (e) => startDateValidator(e.target.value) }></input>
//                             </div>
//                             <div className="filter-card-date-div">
//                                 <label className="mb-0">End Date:</label>
//                                 <input className="form-control end-date" type="date" onChange={ (e) => endDateValidator(e.target.value) }></input>
//                             </div>
//                         </div>
//                         <button className="btn btn-secondary w-100 mt-3 btn-filter" onClick={ filterMyChart }>Filter<FaChartBar/></button>
//                     </div>
//                     :
//                     <p mb-0 no-filter-message>No Stock Code to Filter. Please search stock code for more details</p>
//                 }
//             </div>
//         </div>
//     );
// }
import '../css/FilterCard.css';
import { FaChartBar } from 'react-icons/fa';
import stock from '../apis/stocks';
import { useEffect, useState } from 'react';

const FilterCard = (props) => {
    const [validatorStartDate, setValidatorStartDate] = useState('');
    const [validatorEndDate, setValidatorEndDate] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        if (props.showFilterDOM) {
            setIsButtonDisabled(true);
        }
    }, [props.showFilterDOM]);

    const startDateValidator = (val) => {
        let current_date = new Date();

        setValidatorStartDate(val);

        if (
            Date.parse(validatorStartDate) < Date.parse(validatorEndDate) &&
            Date.parse(validatorStartDate) < current_date &&
            Date.parse(validatorEndDate) < current_date
        ) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };

    const endDateValidator = (val) => {
        let current_date = new Date();

        setValidatorEndDate(val);

        if (
            Date.parse(validatorStartDate) < Date.parse(validatorEndDate) &&
            Date.parse(validatorEndDate) < current_date
        ) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };

    const filterMyChart = async () => {
        let stockValue = document.querySelector(".filter-select").value;
        let startDate = new Date(document.querySelector("input.start-date").value) / 1000;
        let endDate = new Date(document.querySelector("input.end-date").value) / 1000;

        const graph_response = await stock.get('/stock/candle', {
            params: {
                symbol: stockValue,
                resolution: 5,
                from: startDate,
                to: endDate,
                token: 'bqhq9i7rh5rbubolrqd0'
            }
        });

        props.getFilteredData([startDate, endDate], { stockValue: stockValue, response: graph_response.data });
        document.querySelector("input.start-date").value = '';
        document.querySelector("input.end-date").value = '';
    };

        let optionSelectDOM = '';

    optionSelectDOM = props.showGraphData.map((graphData, index) => (
        <option
            value={graphData.stockValue}
            key={index}
            selected={props.showGraphData[props.showGraphData.length - 1] === graphData ? "selected" : ""}
        >
            {graphData.stockValue}
        </option>
    ));
    return (
        <div className="card card-container filter">
            <div className="card-body">
                <h2 className="h6 mb-2">Filter by Stock Code:</h2>
                {props.showFilterDOM ? (
                    <div>
                        <select className="custom-select filter-select">
                            {optionSelectDOM}
                        </select>
                        <div className="d-flex filter-card-date mt-2">
                            <div className="filter-card-date-div">
                                <label className="mb-0">Start Date:</label>
                                <input
                                    className="form-control start-date"
                                    type="date"
                                    onChange={(e) => startDateValidator(e.target.value)}
                                ></input>
                            </div>
                            <div className="filter-card-date-div">
                                <label className="mb-0">End Date:</label>
                                <input
                                    className="form-control end-date"
                                    type="date"
                                    onChange={(e) => endDateValidator(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        <button
                            className="btn btn-secondary w-100 mt-3 btn-filter"
                            onClick={filterMyChart}
                            disabled={isButtonDisabled}
                        >
                            Filter<FaChartBar />
                        </button>
                    </div>
                ) : (
                    <p className="mb-0 no-filter-message">
                        No Stock Code to Filter. Please search stock code for more details
                    </p>
                )}
            </div>
        </div>
    );
};

export default FilterCard;
