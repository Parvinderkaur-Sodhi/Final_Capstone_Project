import axios from "axios";
import authHeader from "./auth-header";
const API_URL="http://localhost:8080/api/";
const API_URL_EMP = "http://localhost:8081/api/employees";
const API_URL_TYPE = "http://localhost:8081/api/leave-types";
const API_URL_REQ = "http://localhost:8081/api/leave-requests";
const API_URL_BAL = "http://localhost:8081/api/leave-balances";
const API_URL_ANTD="http://localhost:8080/api/attendance/"
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

 getAllJobs(){
  console.log("fcdx");
     return axios.get(API_URL+'Jobs/viewJob',{headers:authHeader() });
  }

   getJobByprofile(profile){
     return axios.get(API_URL+'Jobs/viewJobProfile/'+profile,{headers:authHeader()});
  }
  
   getJobBytype(type){
     return axios.get(API_URL+'Jobs/viewByJobType/'+type,{headers:authHeader()});
  }

   getJobBycategory(category){
     return axios.get(API_URL+'Jobs/viewByJobCategory/'+category,{headers:authHeader()});
  }

   getJobBySalary(min,max){
     return axios.get(API_URL+'Jobs/Salary/'+min+'/'+max,{headers:authHeader()});
  }

  postJob(job){
    return axios.post(API_URL+'/postJob',job,{headers:{"Authorization":authHeader()}});
  }

  updateJob(id){
        return axios.put(API_URL+'/update'+id,{headers:{"Authorization":authHeader()}});

  }

  deleteJob(id){
        return axios.delete(API_URL+'/delete'+id,{headers:{"Authorization":authHeader()}});
  }

  viewAppliedJobs(){
     return axios.get(API_URL+'AppliedJobs/view',{headers:{"Authorization":authHeader()}});

  }

  searchByProfile(profile){
     return axios.get(API_URL+'AppliedJobs/searchByprofile/'+profile,{headers:{"Authorization":authHeader()}});

  }

   searchByStatus(status){
     return axios.get(API_URL+'AppliedJobs/searchByStatus/'+status,{headers:{"Authorization":authHeader()}});
  }

  updateStatus(id,status){
    return axios.put(API_URL+'AppliedJobs/updateStatus'+id+status,{headers:{"Authorization":authHeader()}});
  }

markAttendance(employeeId){
   return axios.post(`${API_URL_ANTD}addattendance/${employeeId}`, {headers: authHeader()});
}

}

export default new HrService();
