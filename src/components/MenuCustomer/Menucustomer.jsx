import React, { useContext } from 'react';
import './Menucustomer.css'
import close from '../../assets/close.png'
import union from '../../assets/Union.png'
import veg from '../../assets/vegicon.png';
import nonveg from '../../assets/nonveg-icon.png'
import { DataContext } from '../../contextApi/context';

const Menucustomer = () => {

    const{setOpenMenu,messMenu,priceDetailsArray,messDetailsArray} = useContext(DataContext)

    console.log("menumenumenu",priceDetailsArray[0].userId);
    console.log("menumenumenu",messMenu.userId);
    const price = priceDetailsArray.filter((item)=> { return item.userId == messMenu.userId})[0].userId
    console.log("pppppzzzz",price);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const today = new Date().getDay()

  return (
    <div className='openMenuCss' >
        <div className="menuBoxx">
            <img onClick={()=>setOpenMenu(false)} src={close}  alt="" width={50} />
          <div className='tmenu' >Today's Menu</div> 

          <div className='timg' >
          {/* <img src={union} alt="" width={300} /> */}
          <span>meal starts from just {priceDetailsArray.filter((item)=> { return item.userId == messMenu.userId})[0].singleDayCharges}</span>
          </div>

          <div className="menus">

            <div className="morningMenu">
                <h5>Morning menu</h5>
                <div className="fullmeal">
                   <span style={{fontSize:"1.2rem"}} >Full meal</span>
                   {messDetailsArray.filter((item)=> { return item.userId == messMenu.userId})[0].foodType == "veg"
                    ? <img src={veg} width={30} alt="" />
                    : <div style={{position:"relative", marginTop:"0",display:'flex',width:"22%",  gap:"1rem"}} > <img style={{position:"relative"}} src={veg} width={30} alt="" /> <img   src={nonveg} width={30} alt="" /> </div> 
                   }
                    
                </div>
                <div className="menusBoxes">
                {messMenu.morning[days[today]].map((item)=>(
                    
                    <span key={item} style={{fontSize:"1rem", padding:"0.5rem 0.8rem", border:"1px solid black"}}>{item}</span>
                )) }

                </div>




                <div className="priceBox">
                    <span>₹ {priceDetailsArray.filter((item)=> { return item.userId == messMenu.userId})[0].singleDayCharges}</span>
                </div>
            </div>



            <div className="morningMenu">
                <h5>Evening menu</h5>
                <div className="fullmeal">
                   <span style={{fontSize:"1.2rem"}} >Full meal</span>
                   {messDetailsArray.filter((item)=> { return item.userId == messMenu.userId})[0].foodType == "veg"
                    ? <img src={veg} width={30} alt="" />
                    : <div style={{position:"relative", marginTop:"0",display:'flex',width:"22%", gap:"1rem"}} > <img style={{position:"relative"}} src={veg} width={30} alt="" /> <img   src={nonveg} width={30} alt="" /> </div> 
                   }
                </div>
                <div className="menusBoxes">
                {messMenu.evening[days[today]].map((item)=>(
                    
                    <span key={item} style={{fontSize:"1rem", padding:"0.5rem 0.8rem", border:"1px solid black"}}>{item}</span>
                )) }

                </div>
                <div className="priceBox">
                    <span>₹ {priceDetailsArray.filter((item)=> { return item.userId == messMenu.userId})[0].singleDayCharges}</span>
                </div>
            </div>





          </div>
            
        </div>
    </div>
  );
}

export default Menucustomer;
