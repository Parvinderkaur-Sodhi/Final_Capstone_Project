import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
// import HrService from "../../services/hr.service";
import {
    Card, CardContent, CardHeader,  Button, Grid, Box,Modal, FormControl, InputLabel, Select, Typography, Dialog, Snackbar, Alert,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { DatePicker } from '@mui/lab/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import hrService from "../../../services/hr.service";
import { MenuItem, TextField } from "@material-ui/core";
import HrNavbar from "../../DashBoardComponents/HrNavbar";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

function Postjob(props) {
    const [job, setJob] = useState({});
    const [addSuccess, setAddSuccess] = useState(false);
    const [dateWarning,setDateWarning]=useState(false);
 const {id} = useParams();
const history=useHistory();

         useEffect(() => {

        hrService.getJobById(id).then((response) =>{
            console.log(response.data);
            setJob(response.data);
         
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const handleFieldChange = (fieldName, value) => {
        if(fieldName=="lastdate"){
const date=new Date();
const givendate=new Date(value);
console.log(date);
if(givendate.getTime()<date.getTime()){
    toast.warning("Date should not have past values!");
}

     else{
        const v=`"${fieldName}"`;
        setJob((prevjob) => ({
            ...prevjob,
           [fieldName]: value,
        }));
        }   

    }
      else{
        const v=`"${fieldName}"`;
        setJob((prevjob) => ({
            ...prevjob,
           [fieldName]: value,
        }));
        }
    };

    const handleAdd = (e) => {
        e.preventDefault();
if(id){
    console.log(job);
hrService.updateJob(id,job).then((response) => {
                console.log(response.data);
                toast.success("Successfully Updated");
                history.push(`/AppliedJobs/${response.data["jobProfile"]}`);
    }).catch(error => {
                toast.error(error);
            })

        }
        
else{
        hrService.postJob(job)
            .then((response) => {
                console.log(response.data);
                toast.success("Successfully Added");
            })
            .catch((error) => {
                toast.error("Error adding job:", error);
            });
        }
    };

  
  

    return (
        <>
        <HrNavbar/>
        <div>
            <Card style={{ maxHeight: "84vh", overflowY: "auto", paddingRight: "17px"}}>
                <CardHeader className="title" title="Add New job" />
                <CardContent>
                    <form onSubmit={handleAdd}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                            required={true}
                                label="job Profile"
                                value={job.jobProfile || ""}
                                onChange={(e) => handleFieldChange("jobProfile", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                 <FormControl fullWidth variant="outlined" required>
                                <InputLabel>category</InputLabel>
                                <Select
                                    label="category"
                                    value={job.category || ""}
                                    onChange={(e) => handleFieldChange("category", e.target.value)}
                                >
                                    <MenuItem value="Design">Design</MenuItem>
                                    <MenuItem value="Development">Development</MenuItem>
                                    <MenuItem value="Testing">Testing</MenuItem>
                                    <MenuItem value="Sales">Banking</MenuItem>
                                <MenuItem value="Sales">Marketing</MenuItem>


                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                            multiline={true}
                                label="description"
                                required={true}
                                value={job.description || ""}
                                onChange={(e) => handleFieldChange("description", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined" required>
                                <InputLabel>job Type</InputLabel>
                                <Select
                                    value={job.jobType || ""}
                                    onChange={(e) => handleFieldChange("jobType", e.target.value)}
                                >
                                    <MenuItem value="Part time">Part time</MenuItem>
                                    <MenuItem value="Full time">Full time</MenuItem>
                                    <MenuItem value="Remote">Remote</MenuItem>
                                <MenuItem value="Internship">Internship</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined" required>
                                <InputLabel>Position</InputLabel>
                                <Select
                                    value={job.position || ""}
                                    onChange={(e) => handleFieldChange("position", e.target.value)}
                                >
                                    <MenuItem value="Senior">Senior</MenuItem>
                                    <MenuItem value="junior">Junior</MenuItem>
                                    

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                            required={true}
                                label="specialization"
                                value={job.specialization || ""}
                                onChange={(e) => handleFieldChange("specialization", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                            required={true}
                                label="Experience"
                                type="number"

                                value={job.experience || ""}
                                onChange={(e) => handleFieldChange("experience", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                            required={true}
                              InputLabelProps={{
                                        shrink: true,
                                    }}
                                label="Last date"
                                type="date"
                                value={job.lastdate || ""}
                                onChange={(e) => handleFieldChange("lastdate", e.target.value)}
                                fullWidth
                                variant="outlined"
                                minDate={new Date(Date.now())}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Salary"
                                type="number"
                                 required={true}
                                value={job.salary|| ""}
                                onChange={(e) => handleFieldChange("salary", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                            required={true}
                                label="Vacancy"
                                type="number"
                                value={job.vacancy || ""}
                                onChange={(e) => handleFieldChange("vacancy", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        
                         <Box display="flex" justifyContent="flex-end">
                            <Button variant="outlined"  type="submit" startIcon={<Add />}
style={{width:150,height:40,backgroundColor:"#98144d",margin:"20px 30px",color:"white"}}>
  <Typography style={{fontSize:15,fontWeight:'bolder'}}> {
            id?"'UPDATE Job":"Post Job"
           } </Typography></Button>  
                      
                    </Box>
                 </Grid>

                    </form>
                </CardContent>
            </Card>
         
             <Snackbar open={dateWarning}
            anchorOrigin={{vertical:"bottom",horizontal:"center"}}
            onclose={()=>setAddSuccess(false)}
            sx={{width:400,marginTop:20}}
            autoHideDuration={5000}
            >
                <Alert severity="warning" variant="filled" onClose={()=>setDateWarning(false)}>
                    Date should not have past values !!
                </Alert>
            </Snackbar>
        </div>
        </>
    );
}

export default Postjob;
