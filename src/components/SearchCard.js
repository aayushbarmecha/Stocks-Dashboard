import '../css/SearchCard.css';
import {FaSearch} from 'react-icons/fa';
import stocks from '../apis/stocks';
import React, { useEffect, useState } from 'react';

function SearchCard  (props){

    const [searched_stock,setSearchedStock]=useState([]);
    const [loading_api,setLoadingApi] = useState(false);
    useEffect(() => {
        document.querySelector(".btn-search").disabled = true;

        if(localStorage.getItem("historyStockArray") !== null){
            let lsArray = JSON.parse(localStorage.getItem("historyStockArray"));
            if(window.confirm("You have saved stocks. Would you like to load them?")){
                for(var i = 0; i < lsArray.length; i++){
                    sendSearchResult(false, lsArray[i]);
                }
            }else{
                localStorage.removeItem("historyStockArray");
            };
        };
    }, []);
    useEffect(()=>{
        if(document.querySelector(".btn-search").value === ''){
            document.querySelector(".btn-search").disabled="true";
        }
    },[searched_stock]);

    const sendSearchResult = async(torf,value)=>{
        let stockValue='';
        if(torf){
            stockValue=document.querySelector(".stock-code_value").value.toUpperCase();
        }
        else    
            stockValue=value;
        
        let start=Math.round(new Date().getTime()/1000);
        let end=start-(72*3600);
        let checkForExist=false;

        if(searched_stock.includes(stockValue)){
            alert("Stock already exists");
            document.querySelector(".stock-code_value").value='';
        }
        else
        {
            checkForExist=true;
        }
        
        const table_response = await stocks.get('/quote', {
            params: {
              symbol: stockValue,
              token: 'cju19ehr01qr9581vuc0cju19ehr01qr9581vucg'
            }
        });
        console.log(table_response);
        if(table_response){
            setLoadingApi(true);
        }
        const graph_response = await stocks.get('/stock/candle', {
            params: {
              symbol: stockValue,
              resolution: 5,
              from: end,              
              to: start,
              token: 'cju19ehr01qr9581vuc0cju19ehr01qr9581vucg'
            }
        });
        setSearchedStock(prevArray => prevArray.concat(stockValue));

        if(checkForExist){
            if(table_response.data.c === 0 && table_response.data.h === 0 && table_response.data.l === 0 && table_response.data.o === 0 && table_response.data.pc === 0 && table_response.data.t === 0){
                props.sendSearchGraphResult("no_data", '');
            }else{
                // console.log(graph_response.t);
                props.sendSearchGraphResult(true, {stockValue: stockValue, response: graph_response.data});
                props.sendSearchResult(table_response.data);
                setLoadingApi(false);
            }
            document.querySelector(".stock-code_value").value = '';
        }

    };

    const validateBtn =(val)=>{
        let btnDom=document.querySelector(".btn-search");
        val===''||val.length>4?btnDom.disabled=true:btnDom.disabled=false;
    }
    return(
        <div className="card card-container search">
            <div className="card-body">
                <h2 className="h6 mb-0">SEARCH STOCK CODE:</h2>
                <input type="text" className="form-control stock-code_value" placeholder="Stock Code Eg:AMZN" onKeyUp={ (e) => validateBtn(e.target.value) }></input>
                <button className="btn btn-secondary w-100 btn-search" onClick={ () => sendSearchResult(true, '') } disabled={ loading_api }>Search Results<FaSearch /></button>
                <button className="btn btn-secondary w-100 btn-search" onClick={() => window.open("https://drive.google.com/file/d/1q5t2fdFA_zRIvCYJixQW5OmmunXrVo2A/view?usp=sharing","_blank")}>Search Codes<FaSearch /></button>
            </div>
        </div>
    )
};

export default SearchCard;