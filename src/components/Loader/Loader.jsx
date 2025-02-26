import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import load from '../../assets/Lottie Lego.gif'

export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(true);


  return (
    <div>
      {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        {/* <CircularProgress color="inherit" /> */}
        <img src={load} alt="" />
      </Backdrop>
    </div>
  );
}