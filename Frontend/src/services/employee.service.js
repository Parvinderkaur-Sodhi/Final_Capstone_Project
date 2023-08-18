import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";
const API_URL_REQ = "http://localhost:8080/api/leave-requests";
const API_URL_TYPE = "http://localhost:8080/api/leave-types";
const API_URL_BAL = "http://localhost:8080/api/leave-balances";

class EmployeeService {

  getAllEmployeeById(id) {
    return axios.get(`${API_URL}employees/${id}`, { headers: authHeader() });
  }

  getAllJobs(token) {
    console.log("dfdsf");
    return axios.get(API_URL + 'Jobs/viewJob', { headers: { "Authorization": `Bearer ${token}` } });
  }

  //Leave Requests
  getLeaveRequestByEmployeeId(employeeId) {
    return axios.get(`${API_URL_REQ}/leaves/${employeeId}`, { headers: authHeader() });
  }

  getLeaveRequestById(requestId) {
    return axios.get(`${API_URL_REQ}/${requestId}`, { headers: authHeader() });
  }

  saveLeaveRequest(request) {
    return axios.post(API_URL_REQ, request, {headers: authHeader() });
  }

  updateLeaveRequest(requestId, requestData) {
    const url = `${API_URL_REQ}/${requestId}`;
  return axios.put(url, requestData, { headers: authHeader() });
  }

  deleteLeaveRequest(requestId) {
    return axios.delete(`${API_URL_REQ}/${requestId}`, { headers: authHeader() });
  }

  //Leave types
  getAllLeaveTypes() {
    return axios.get(API_URL_TYPE, { headers: authHeader() });
  }

  //Leave Balance
  getLeaveBalancesByEmpId(employeeId) {
    return axios.get(`${API_URL_BAL}/balance/${employeeId}`, { headers: authHeader() });
  }

}

export default new EmployeeService();
