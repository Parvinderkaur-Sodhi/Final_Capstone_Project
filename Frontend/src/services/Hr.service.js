import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class HrService {
    getAllEmployees() {
        return axios.get(API_URL + "employees");
      }
  
}

export default new HrService();
