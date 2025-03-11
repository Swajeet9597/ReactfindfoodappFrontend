import { createContext, useState } from "react";

export const DataContext = createContext()

export const DataProvider = ({children})=>{
    const [activeStep, setActiveStep] = useState(0)
    const [loader,setLoader] = useState(false)
    const [userId, setUserId] =useState("")
    const [popup,setPopup] =  useState(false)
    const [urlDel,setUrlDl] = useState("")
    const [messArray,setMessArray] = useState("")
    const [messDetails, setMessDetails] = useState(
    {
        userId:"",
        messName : "",
        address : {
            shopNumber:"",
            area:"",
            city:"",
            pincode:"",
            landmark:""
        },
        contact:{
            mobileNumber:"",
            email:""
        },
        license:{
            licenseNumber:"",
            licenseImage:""
        },
        foodType:"",
        messImages:[]
    }
    )

    const [menuDetails, setMenuDetails] = useState({
        userId:"",
        morning:{},
        evening:{}

    })

    const [priceDetails, setPriceDetails] = useState({
        userId:"",
        monthlyCharges:"",
        singleDayCharges:"",
        specialDayVegCharges:"",
        specialDaynonVegCharges:""
    })

    const [timeDetails, setTimeDetails] = useState({
        userId:"",
        morning:{
            from:"",
            to:""
        },
        evening:{
            from:"",
            to:""
        },
        holiday:{
            day:"",
            period:""
        }
    })

    const url = "https://api.cloudinary.com/v1_1/de2f8n9jm/image/upload"

    const uploadImage = async(image)=>{
        try {
            console.log("Imageee",image);
            const formData = new FormData()
            formData.append("file",image)
            formData.append("upload_preset","mess-app")

            const dataResponse = await fetch(url,{
                method:"POST",
                body:formData,
                mode: "cors"
            })

            return dataResponse.json()

        } catch (error) {
            console.log("error in fetching",error);
        }
    }

    const[update,setUpdate] = useState(false)

    // const [menuOptions, setMenuOptions] = useState(["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"]);
    const [menuOptions, setMenuOptions] = useState({
        evening:{

            Monday: ["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"],
            Tuesday: ["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"],
            Wednesday: ["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"],
            Thursday: ["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"],
            Friday: ["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"],
            Saturday: ["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"],
            Sunday: ["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"],
        },
        morning:{

            Monday: ["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"],
            Tuesday: ["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"],
            Wednesday: ["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"],
            Thursday: ["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"],
            Friday: ["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"],
            Saturday: ["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"],
            Sunday: ["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"],
        },

});


const [ratingDetails,setRatingDetails] = useState({
    messUserId:"",
    customerUserId:"",
    rating:"",
    feedback:""
})


const [messDetailsArray,setMessDetaislArray] = useState([])
const [menuDetailsArray,setMenuDetaislArray] = useState([])
const [priceDetailsArray,setPriceDetaislArray] = useState([])
const [timeDetailsArray,setTimeDetaislArray] = useState([])
const [ratingArray,setRatingArray] = useState([])

const [val,setVal] = useState("any")

const [valType,setValType] = useState("any")



const[openMenu,setOpenMenu] = useState(false)

const[messMenu,setMessMenu]= useState({})

const[loc,setLoc] = useState("location")
   return <DataContext.Provider value={{ratingDetails,setRatingDetails,messMenu,setMessMenu,openMenu,setOpenMenu,ratingArray,setRatingArray,loc,setLoc,valType,setValType,val,setVal,timeDetailsArray,setTimeDetaislArray,priceDetailsArray,setPriceDetaislArray,menuDetailsArray,setMenuDetaislArray,messDetailsArray,setMessDetaislArray,menuOptions, setMenuOptions,messArray,setMessArray,update,setUpdate,urlDel,setUrlDl,userId, setUserId,activeStep,setActiveStep,messDetails,setMessDetails,uploadImage,setLoader,loader,menuDetails, setMenuDetails,priceDetails, setPriceDetails,timeDetails, setTimeDetails,popup,setPopup}}>
        {children}
    </DataContext.Provider>
}

// return <DataContext.Provider values = {{}}>

                // {children}
        
        // </DataContext.Provider>