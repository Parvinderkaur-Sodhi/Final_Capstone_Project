import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import hrService from '../../../services/hr.service';
import { Stack, Typography } from '@mui/material';

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  const [value, setValue] = React.useState([1,15]);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    const min=newValue[0]*100000;
    const max=newValue[1]*100000;
    hrService.getJobBySalary(min,max).then((response)=>{
      console.log(response.data);
                  props.setJob(response.data)

    })
  };

  return (
    <Box sx={{ width: 200 ,margin:"30px 22px 20px"}}>
                      <Typography>Salary</Typography>

      <Slider
        getAriaLabel={() => 'temperate Range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
       min={1} max={15}
       sx={{color:"#98144d"}}
      />
      {console.log(value[1])}
      <Stack direction="row" marginTop={-2}>
              <Typography>{value[0]}L</Typography>
              <Typography ml={20}>{value[1]}L</Typography>

      </Stack>
    </Box>
  );
}


