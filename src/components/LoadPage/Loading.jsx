import React from "react";
import './Loading.css'; // Import the CSS file

import loadingGif from '../../assets/Lottie Lego.gif'

const LoadingPage = () => {
  return (
    <div className="loading-container">
      {/* <div className="loader"></div> */}
      <img src={loadingGif} width={200} alt="" />
    </div>
  );
};

export default LoadingPage;