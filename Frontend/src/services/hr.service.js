import axios from "axios";
import authHeader from "./auth-header";

const API_URL_EMP = "http://localhost:8081/api/employees";
const API_URL_TYPE = "http://localhost:8081/api/leave-types";
const API_URL_REQ = "http://localhost:8081/api/leave-requests";
const API_URL_BAL = "http://localhost:8081/api/leave-balances";

class HrService {

getAllEmployees() {
  return axios.get(API_URL_EMP, { headers: authHeader() });
}

getAllLeaveTypes() {
  return axios.get(API_URL_TYPE, { headers: authHeader() });
}

getAllLeaveRequest() {
  return axios.get(API_URL_REQ, { headers: authHeader() });
}

getAllLeaveBalances() {
  return axios.get(API_URL_BAL, { headers: authHeader() });
}

}

export default new HrService();
