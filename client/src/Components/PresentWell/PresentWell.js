import React, { Component } from "react";
import API from "../../Utils/api";

class PresentWell extends Component {
  state = {
    appointments: []
  };

  componentWillMount() {
    API.getUserAppointments(this.props.user._id)
      .then(res => {
        console.log('res', res);
      })
      .catch(err => console.error(err));
  }

  render() {
    // const { upcomingAppts } = this.state;
    return (
      <div>
        PresentWell
        <div className="panel panel-default" id="panel">
          {/* {upcomingAppts.map(res =>
            <div className="panel-body" key={res.title}>
              <h5>{res.apptName}</h5>
              <h5>{res.apptNotificationNumber}</h5>
              <h5>{res.apptDate}</h5>
              <h5>{res.apptTime}</h5>
              <h5>{res.Notification}</h5>
              <button className="btn btn-default">Update</button>
              <button className="btn btn-default">Delete</button>
            </div>
          )} */}
        </div>
      </div>
    );
  }
}

export default PresentWell;
