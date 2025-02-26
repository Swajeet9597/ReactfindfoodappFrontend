import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GradeIcon from '@mui/icons-material/Grade';
import ratingicon from '../../assets/good-feedback.png'
import foodTypee from '../../assets/cutlery.png'
import close from '../../assets/close.png'
import './Drawer.css'
import { DataContext } from '../../contextApi/context';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

const {valType,setValType,val,setVal} = React.useContext(DataContext)

  function handleRating(e){
      if(e.target.id){
        console.log(e.target.id);
        setVal(e.target.id)
    }
  }

  function handleType(e){
    if(e.target.id){
        console.log(e.target.id);
        setValType(e.target.id)
    }
  }

  function handleReset(){
    setVal("any")
    setValType("any")
  }

  function handleApply(){
    console.log("apply");
    
  }



  return (
    <div>
      <Button sx={{fontSize:"1.2rem"}} onClick={toggleDrawer(true)}>Filter</Button>
      <Drawer  anchor="right" open={open} >
        {/* {DrawerList} */}
        <Box sx={{ width: "30vw", height:"100vh", background:"aliceblue" }} role="presentation" >
        <div style={{display:"flex",border:"1px solid black", borderTop:"none", borderLeft:"none",borderRight:"none",justifyContent:"center",fontSize:"1.5rem",fontWeight:"bold",margin:"1rem 0", position:"relative",paddingBottom:"1rem"}} > <img onClick={toggleDrawer(false)} style={{position:"absolute", left:"3%",cursor:"pointer"}} src={close} width={40}  alt="" /> <span>FILTRES</span></div>
      
        <List  >
          <ListItem  disablePadding>
            <ListItemButton sx={{display:"flex",gap:"1rem", border:"1px solid black", borderTop:"none", borderLeft:"none",borderRight:"none"}}>
              <ListItemIcon>
                <img src={ratingicon} width={50} alt="" />
              </ListItemIcon>
              <ListItemText  primary="Ratings"   primaryTypographyProps={{ fontSize: "1.5rem", fontWeight: "500" }} />
            </ListItemButton>
            
          </ListItem>

          <div onClick={handleRating} className="ratingBox" style={{display:'flex', flexWrap:"wrap", gap: "1.5rem", margin:"1rem 0 0 1rem"}} >
                    <span id='any' className={val == "any" ? 'selectedBgRate' :'boxRate'} >Any</span>
                    <span id='3.5' className={val == "3.5" ? 'selectedBgRate' :'boxRate'}>3.5 +</span>
                    <span id='4.0' className={val == "4.0" ? 'selectedBgRate' :'boxRate'}>4.0 +</span>
                    <span id='4.5' className={val == "4.5" ? 'selectedBgRate' :'boxRate'}>4.5 +</span>
                    <span id='5.0' className={val == "5.0" ? 'selectedBgRate' :'boxRate'}>5.0 </span>
          </div>

      </List>
      <Divider />
      <List>

          <ListItem  disablePadding>
            <ListItemButton sx={{display:"flex",gap:"1rem", border:"1px solid black", borderTop:"none", marginTop:"2rem", borderLeft:"none",borderRight:"none"}}>
              <ListItemIcon>
                <img src={foodTypee} width={50} alt="" />
              </ListItemIcon>
              <ListItemText primary="Food Type"  primaryTypographyProps={{ fontSize: "1.5rem", fontWeight: "500" }}  />
            </ListItemButton>
          </ListItem>

          <div onClick={handleType} className="ratingBox" style={{display:'flex', flexWrap:"wrap", gap: "1.5rem", margin:"1rem 0 0 1rem"}} >

                    <span id='any' className={valType == "any" ? 'selectedBgType' :'boxRateT'} >Any</span>
                    <span id='veg' className={valType == "veg" ? 'selectedBgType' :'boxRateT'} >Only veg</span>
                    <span id='nonveg' className={valType == "nonveg" ? 'selectedBgType' :'boxRateT'}>Veg-nonveg</span>
                    
          </div>

      </List>
      <div className="resetandapply">
            <span onClick={handleReset} >Reset flters</span>
            <span onClick={toggleDrawer(false)}>Apply flters</span>
      </div>
      </Box>
      </Drawer>
    </div>
  );
}