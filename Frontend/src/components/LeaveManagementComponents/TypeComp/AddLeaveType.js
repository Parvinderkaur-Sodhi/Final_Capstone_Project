import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import HrService from "../../../services/hr.service";
import { TextField, Button, Box, Card, CardContent, CardActions, CardHeader } from "@mui/material";
import { Done } from '@mui/icons-material';
import HrNavbar from "../../DashBoardComponents/HrNavbar";

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
            })
            .catch((error) => {
                console.log("Error adding leave type:", error);
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
            <HrNavbar/>
            <Card>
            <CardHeader className="title" title="Add New Leave Type" />
            <hr></hr>
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
