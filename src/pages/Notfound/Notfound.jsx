import React from 'react';
import './Notfound.css'
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';

const Notfound = () => {
  return (
    <div className='notFound' >
     <span><BrowserNotSupportedIcon fontSize='large'/>Page Not Found 404</span> 
    </div>
  );
}

export default Notfound;
