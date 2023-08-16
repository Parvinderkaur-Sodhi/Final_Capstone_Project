import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";
const API_URL_ATND="http://localhost:8080/api/attendance";

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
  
}

export default new EmployeeService();
