import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DataContext, DataProvider } from '../../contextApi/context';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({width,label,section}) {

    const {setMessDetails,messDetails,uploadImage,setLoader} = React.useContext(DataContext)
    const handleUploadImage = async(e)=>{
        // console.log(e);
        const file = e.target.files[0]
        // console.log(e.target.files[0]);
        setLoader(true)
        const uploadCloudinary = await uploadImage(file)

        console.log(uploadCloudinary.url);

        if(section){
            setMessDetails({
                ...messDetails,
                [section]:{
                    ...messDetails[section],
                    licenseImage : uploadCloudinary.url
                }
            })
        }else{
            setMessDetails(prevState => ({
                ...prevState,
                messImages: [...prevState.messImages, uploadCloudinary.url] // Add new URL to the array
              }));
        }

        setLoader(false)
    }

  return (
    <Button
    sx={{width:`${width}`}}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      onChange={handleUploadImage}
    >
      {label}
      <VisuallyHiddenInput
        type="file"
       
        multiple
      />
    </Button>
  );
}