// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import StepContent from '@mui/material/StepContent';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';

// const steps = [
//     {
//       label: 'Mess details'
//     },
//     {
//       label: 'Menu',
//     },
//     {
//       label: 'Price'
//     },
//     {
//       label:'Time'
//     }
//   ];

// export default function VerticalLinearStepper() {
//   const [activeStep, setActiveStep] = React.useState(0);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <Box sx={{ background:"aliceblue",borderRadius:"12px", marginLeft:"2rem", marginTop:"2rem" }}>
//       <Stepper activeStep={activeStep} orientation="vertical">
//         {steps.map((step, index) => (
//           <Step key={step.label}>
//             <StepLabel   sx={{
//     "& .MuiStepLabel-label": {
//       color: "black", // Corrected spelling
//       fontSize: "1.5rem",
//     },
//     "& .Mui-active .MuiStepLabel-label": { color: "blue" }, // Active Step Color
//     "& .Mui-completed .MuiStepLabel-label": { color: "green" }, // Completed Step Color
//   }}
//               optional={
//                 index === steps.length - 1 ? (
//                   <Typography variant="caption"></Typography>
//                 ) : null
//               }
//             >
//               {step.label}
//             </StepLabel>
//             <StepContent>
//               <Typography>{step.description}</Typography>
//               <Box sx={{ mb: 2 }}>
//                 <Button
//                   variant="contained"
//                   onClick={handleNext}
//                   sx={{ mt: 1, mr: 1 }}
//                 >
//                   {index === steps.length - 1 ? 'Finish' : 'Continue'}
//                 </Button>
//                 <Button
//                   disabled={index === 0}
//                   onClick={handleBack}
//                   sx={{ mt: 1, mr: 1 }}
//                 >
//                   Back
//                 </Button>
//               </Box>
//             </StepContent>
//           </Step>
//         ))}
//       </Stepper>
//       {/* {activeStep === steps.length && (
//         <Paper square elevation={0} sx={{ p: 3 }}>
//           <Typography>All steps completed - you&apos;re finished</Typography>
//           <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
//             Reset
//           </Button>
//         </Paper>
//       )} */}
//     </Box>
//   );
// }


import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Import Material-UI Icons
import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { DataContext } from "../../contextApi/context";

const steps = [
  { label: "Mess details", icon: <HomeIcon /> },
  { label: "Menu", icon: <RestaurantMenuIcon /> },
  { label: "Price", icon: <MonetizationOnIcon /> },
  { label: "Time", icon: <AccessTimeIcon /> }
];

// Function to render custom icons
const StepIconComponent = (props) => {
  const { active, completed, icon } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
        borderRadius: "50%",
        backgroundColor: active ? "blue" : completed ? "green" : "gray",
        color: "white",
        padding: "5px"
      }}
    >
      {steps[icon - 1].icon} {/* Display custom icon */}
    </Box>
  );
};

export default function VerticalLinearStepper() {
    const {activeStep} = React.useContext(DataContext)

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

  return (
    <Box sx={{ background: "aliceblue", borderRadius: "12px", padding: "1rem", marginLeft: "2rem", marginTop: "2rem" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={StepIconComponent} // Use Custom Icons
              sx={{
                "& .MuiStepLabel-label": { color: "black", fontSize: "1.2rem" },
                "& .Mui-active .MuiStepLabel-label": { color: "blue" },
                "& .Mui-completed .MuiStepLabel-label": { color: "green" }
              }}
            >
              {step.label}
            </StepLabel>
            {/* <StepContent>
              <Box sx={{ mb: 2 }}>
                <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                  {index === steps.length - 1 ? "Finish" : "Continue"}
                </Button>
                <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
              </Box>
            </StepContent> */}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
