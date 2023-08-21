import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";
const API_URL_ATND="http://localhost:8080/api/attendance";
const API_URL_REQ = "http://localhost:8080/api/leave-requests";


class EmployeeService {
  
  getAllEmployeeById(id) {
    return axios.get(`${API_URL}employees/${id}`, { headers: authHeader() });
  }

  getAllJobs(token){
    console.log("dfdsf");
     return axios.get(API_URL+'Jobs/viewJob',{headers:{"Authorization":`Bearer ${token}`}});
  }


  getAttendanceByEmployeeId(employeeId){
    console.log("Emmployee service is calling..")
    const url=`${API_URL_ATND}/${employeeId}`;
    return axios.get(url, {headers: authHeader()} );
 }
  //Leave Requests
  /*getLeaveRequestByEmployeeId() {
    return axios.get(`${API_URL_REQ}/employee/${employeeIdd}`, { headers: authHeader() });
  }*/


  markAttendance(employeeId, attendanceData)  {
    const url = `${API_URL_ATND}/addattendance/${employeeId}`;
    return axios.post(url, attendanceData, { headers: authHeader() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }
  

  updateAbsenceReason(attendanceId, updatedReason) {
    const url = `${API_URL_ATND}/${attendanceId}/update-absence-reason`;
    const updatedAttendance = { absenceReason: updatedReason };
    return axios.put(url, updatedAttendance, { headers: authHeader() });
  }
  
}

export default new EmployeeService();
