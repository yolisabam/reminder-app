import React from "react";


const PresentWell = props => {
  return (
    <div>
      <div className="panel panel-default" id="panel">
        {props.upcomingAppts.map(res =>
          <div className="panel-body" key={res.title}>
            <h5>{res.apptName}</h5>
            <h5>{res.apptNotificationNumber}</h5>
            <h5>{res.apptDate}</h5>
            <h5>{res.apptTime}</h5>
            <h5>{res.Notification}</h5>
            <button className="btn btn-default">Update</button>
            <button className="btn btn-default">Delete</button>
          </div>
        )}

      </div>
    </div>
  )
}


export default PresentWell;