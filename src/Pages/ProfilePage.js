import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, Divider, Typography, Paper, IconButton   } from '@mui/material';
import ImageCircle from '../Module/ImageCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { styled } from '@mui/material/styles';

import '../css/ProfilePage.css';

const DemoPaper = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  ...theme.typography.body2,
}));

const educationSchema = {
  degree:"",major:"",university:"",graduationYear:""
}

function ProfilePage({ userInfo, displaySuccess }) {

  const [profileData, setProfileData] = useState({});
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(()=>{
    setProfileData({
      firstName: userInfo?.user.firstName,
      lastName: userInfo?.user.lastName,
      email: userInfo?.user.email,
      mobileNo: userInfo?.user.mobileNo,
      address: userInfo?.user.address,
      education: userInfo?.user.education
    });
    setPhotoUrl(userInfo?.user.photoUrl);
  },[userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value
      }
    }));
  };

  const handleChangeEducation = (e, index, field) => {
    const { value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      education: prevData.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = {
      'Authorization': `Bearer ${userInfo?.accessToken}`,
      'Content-Type': 'application/json' // Set content type as JSON
    };

    axios.put(`http://localhost:3000/api/user`,{...profileData,photoUrl: photoUrl},{headers})
    .then((response)=>{
      let userDetails = {
        ...userInfo,
        user:{...userInfo?.user,...profileData, photoUrl: photoUrl}
      }
      
      sessionStorage.setItem('user',JSON.stringify(userDetails));
      displaySuccess("Profile Updated");
    }).catch((err)=>{
      console.log(err)
    })
   
  };

  const RemoveEducation =(e,index) =>{
    e.preventDefault();
    setProfileData(prevData => ({
      ...prevData,
      education: prevData.education.splice(index)
    }));
  }

  const handleAddEducation = (e) =>{
    e.preventDefault();
    setProfileData(prevData => ({
      ...prevData,
      education: [...prevData.education,{degree:"",major:"",university:"",graduationYear:""}]
    }));
  }

  if (!userInfo?.user) {
     return (
      <React.Fragment>
        <p>Loading...</p>
      </React.Fragment>
     )
  }

  return (
    <React.Fragment>
     <Container maxWidth="lg">
      <h2>Profile</h2>
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <form onSubmit={handleSubmit} className="profile-update-form">
        <div>
          {/* <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={profileData.firstName} onChange={handleChange} /> */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField
              label="First Name"
              name='firstName'
              id="outlined-size-small"
              size="small"
              value={profileData?.firstName}
              onChange={handleChange}
              margin='normal'
              fullWidth
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              label="Last Name"
              name='lastName'
              id="outlined-size-small"
              size="small"
              value={profileData?.lastName}
              onChange={handleChange}
              margin='normal'
              fullWidth
            />
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField
              label="Email"
              name='email'
              id="outlined-size-small"
              size="small"
              value={profileData?.email}
              onChange={handleChange}
              margin='normal'
              fullWidth
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              label="Mobile No"
              name='mobileNo'
              id="outlined-size-small"
              size="small"
              value={profileData?.mobileNo}
              onChange={handleChange}
              margin='normal'
              fullWidth
            />
            </Grid>
          </Grid>
        </div>
        
        <Typography gutterBottom variant="h6">
          Address
        </Typography>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
              label="Street"
              name='street'
              id="outlined-size-small"
              size="small"
              value={profileData?.address?.street}
              onChange={handleAddressChange}
              margin='normal'
              fullWidth
            />
            </Grid>
          </Grid>
        </div>
        <div>
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField
              label="City"
              name='city'
              id="outlined-size-small"
              size="small"
              value={profileData?.address?.city}
              onChange={handleAddressChange}
              margin='normal'
              fullWidth
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              label="State"
              name='state'
              id="outlined-size-small"
              size="small"
              value={profileData?.address?.state}
              onChange={handleAddressChange}
              margin='normal'
              fullWidth
            />
            </Grid>
          </Grid>
        </div>
        <div>
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField
              label="Zip"
              name='zip'
              id="outlined-size-small"
              size="small"
              value={profileData?.address?.zip}
              onChange={handleAddressChange}
              margin='normal'
              fullWidth
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              label="Country"
              name='country'
              id="outlined-size-small"
              size="small"
              value={profileData?.address?.country}
              onChange={handleAddressChange}
              margin='normal'
              fullWidth
            />
            </Grid>
          </Grid>
        </div>
        <div>
         <div style={{display:"flex",alignItems:"center"}}>
         <Typography gutterBottom variant="h6" style={{flexGrow:1}}>
          Education Details
        </Typography>
        <div className='AddIcon' onClick={(e)=>handleAddEducation(e)}>
          <AddCircleOutlineIcon fontSize="small" />
        </div>
         </div>
          {profileData?.education?.map((edu, index) => (
            <DemoPaper  key={index}  elevation={0} >
              <div style={{display:"flex"}}>
               <Typography style={{ flexGrow:1}}>Education {index + 1}</Typography>
               {profileData?.education.length > 1 && <div className='deleteIcon' onClick={(e)=>RemoveEducation(e,index)}><DeleteIcon fontSize="small" /></div>}
              </div>
              <Grid container spacing={2}>
              <Grid item xs={6}>
              <TextField
                label={`Degree`}
                name={`degree${index}`}
                id="outlined-size-small"
                size="small"
                value={edu.degree}
                onChange={(e) => handleChangeEducation(e, index, 'degree')}
                margin='normal'
                fullWidth
              />
              </Grid>
              <Grid item xs={6}>
              <TextField
                label={`Major`}
                name={`major${index}`}
                id="outlined-size-small"
                size="small"
                value={edu.major}
                onChange={(e) => handleChangeEducation(e, index, 'major')}
                margin='normal'
                fullWidth
              />
              </Grid>
              </Grid>
              <Grid container spacing={2}>
              <Grid item xs={6}>
              <TextField
                label={`University`}
                name={`university${index}`}
                id="outlined-size-small"
                size="small"
                value={edu.university}
                onChange={(e) => handleChangeEducation(e, index, 'university')}
                margin='normal'
                fullWidth
              />
              </Grid>
              <Grid item xs={6}>
              <TextField
                label={`Graduation Year`}
                name={`graduationYear${index}`}
                id="outlined-size-small"
                size="small"
                value={edu.graduationYear}
                onChange={(e) => handleChangeEducation(e, index, 'graduationYear')}
                margin='normal'
                fullWidth
              />
              </Grid>
              </Grid>
            </DemoPaper>
          ))}
        </div>
        <button type="submit">Save Changes</button>
      </form>
        </Grid>
        <Grid item xs={4} style={{display:"flex", justifyContent:"center"}}>
        <ImageCircle imageUrl={photoUrl} setPhotoUrl={setPhotoUrl}/>
        </Grid>
      </Grid>
    </Container>
    </React.Fragment>
  );
}

export default ProfilePage;
