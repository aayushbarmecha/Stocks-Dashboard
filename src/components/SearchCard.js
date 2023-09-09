import '../css/SearchCard.css';
import {FaSearch} from 'react-icons/fa';

function SearchCard  (){
    return(
        <div className="card card-container search">
            <div className="card-body">
                <h2 className="h6 mb-0">SEARCH STOCK CODE</h2>
                <input type="text" className="form-control stock-code_value" placeholder="Stock Code Eg:AMZN" onKeyUp={ (e) => this.validateBtn(e.target.value) }></input>
                <button className="btn btn-secondary w-100 btn-search" onClick={ () => this.sendSearchResult(true, '') } disabled={ this.loading_api }>Search Results<FaSearch /></button>
            </div>
        </div>
    )
};

export default SearchCard;