import '../css/Tabledata.css';

export default function Tabledata({props}){
    return(
        <div className="card card-container table-data">
            <div className="card-body">
                <h2 className="h6 mb-3">Recent Results:</h2>
                {
                    this.props.showTableData?
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Stock Code</th>
                                <th scope="col">Last Updated Data</th>
                                <th scope="col">Open Price</th>
                                <th scope="col">Low Price</th>
                                <th scope="col">High Price</th>
                                <th scope="col">Previous Close Price</th>
                                <th scope="col">Current Price</th>
                                <th scope="col">% From Yesterday</th>
                            </tr>
                        </thead>
                        <tbody>
                            { tableDataDOM }
                        </tbody>
                    </table>
                    :
                    <p className="mb-0 no-data-message">There are currently no available data. Please search stock code for more details.</p>
                }
            </div>
        </div>
    )
}