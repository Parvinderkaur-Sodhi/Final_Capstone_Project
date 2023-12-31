import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import HrService from "../../../services/hr.service";
import { TextField, Button, Box, Card, CardContent, CardActions, CardHeader } from "@mui/material";
import { Done } from '@mui/icons-material';
import HrNavbar from "../../DashBoardComponents/HrNavbar";
import {toast} from 'react-toastify';


function AddLeaveType(props) {
    const [newLeaveType, setNewLeaveType] = useState('');
    const [newLeaveTypeAllowedCount, setNewLeaveTypeAllowedCount] = useState(0);
    const [redirectToList, setRedirectToList] = useState(false);
    const { user: currentUser } = props;

    const handleAddLeaveType = () => {
        const typedata = {
            typeName: newLeaveType,
            countAllowed: newLeaveTypeAllowedCount,
        };

        HrService.saveLeaveType(typedata)
            .then((response) => {
                setRedirectToList(true);
                toast.success("Leave Type added successfully!!");
            })
            .catch((error) => {
                console.log("Error adding leave type:", error);
                toast.error("Error Adding Leave Type!!");
            });
    };

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    if (redirectToList) {
        return <Redirect to="/leave-types" />;
    }

    return (
        <div>
            <HrNavbar />
            <Card style={{ height: "70vh"}}>
                <br></br>
                <CardHeader className="title" title="Add New Leave Type" />
                <hr></hr>
                <br></br>
                <CardContent>
                    <Box textAlign='center' margin={1}>
                        <TextField
                            label="Leave Type Name"
                            variant="outlined"
                            value={newLeaveType}
                            onChange={(e) => setNewLeaveType(e.target.value)}
                        />
                        &nbsp;&nbsp;
                        <TextField
                            label="Allowed Count"
                            type="number"
                            variant="outlined"
                            value={newLeaveTypeAllowedCount}
                            onChange={(e) => setNewLeaveTypeAllowedCount(e.target.value)}
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Box display="flex" justifyContent="center" width="100%">
                        <Button
                            variant="outlined"
                            color="success"
                            style={{ backgroundColor: '#98144d', color: "white" }}
                            startIcon={<Done />}
                            onClick={handleAddLeaveType}>
                            Add Leave Type
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </div >
    );
}

export default AddLeaveType;
