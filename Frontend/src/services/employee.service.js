import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class EmployeeService {
  
  getAllEmployeeById(id) {
    return axios.get(`${API_URL}employees/${id}`, { headers: authHeader() });
  }

 applyforJob(empId,jobId,obj){
  return axios.post(`${API_URL}AppliedJobs/apply/${empId}/${jobId}`,obj,{ headers: authHeader() });
 }

 getAppliedJobforEmp(empId){
    return axios.get(`${API_URL}AppliedJobs/viewByEmp/${empId}`,{ headers: authHeader() });

 }
}

export default new EmployeeService();
