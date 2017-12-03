import React from "react";


const PresentWell = props => {
  return (
    <div>
      <div className="panel panel-default" id="panel">
        {props.results.map(res =>
          <div className="panel-body" key={res.title}>
            <h5>{res.appointmentName}</h5>
            <h5>{res.date}</h5>
            <h5>{res.time}</h5>
            <h5>{res.notification}</h5>
            <button className="btn btn-default">Update</button>
            <button className="btn btn-default">Delete</button>
          </div>
        )}

      </div>
    </div>
  )
}


export default PresentWell;