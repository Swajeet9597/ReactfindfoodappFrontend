import React, { useEffect } from 'react';
import './Welcome.css'
import handshake from '../../assets/handshake.png'
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    // const navigate = useNavigate()

  return (
    <div className='welPg' >
      <div className="welBox">
        <img src={handshake}  />
        <span>Welcome</span>
      </div>
    </div>
  );
}

export default Welcome; 
