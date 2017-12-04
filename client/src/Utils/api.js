import axios from "axios";

export default {
  //gets the user document from User Collection
  getUser : function(loginData) {
    //console.log("I hit the api call function!");
    return axios.post("/api/login", loginData);
  },
  //saves a new user into the database
  saveUser : function(userData) {
    console.log(userData);
    return axios.post("/api/signup", userData);
  },
  //gets all appointments for the current user
  getUserAppointments : function(userId) {
    return axios.get(`/api/user/${userId}/appt`);
  },
  //save an appointment for the current user
  saveUserAppointment : function(userId, apptData) {
    return axios.post(`/api/user/${userId}/appt`, apptData);
  },
  // update appointment
  updateUserAppointment: function (userId, apptId, apptData) {
    return axios.put(`/api/user/${userId}/appt/${apptId}`, apptData);
  },
  //delete an appointment for the current user
  deleteUserAppointment : function(userId, apptId) {
    return axios.delete(`/api/user/${userId}/appt/${apptId}`);
  }
};
