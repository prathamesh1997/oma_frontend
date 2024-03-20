import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios  from "axios";
import { Snackbar, Alert } from '@mui/material';

import LoginPage from './LoginPage';
import ProfilePage from './Pages/ProfilePage';
import Header from './Layout/Header';

import './App.css';

const requestBody = {
}



function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [authToken,setAuthToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [message,setMessage] = useState();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setAuthenticated(true);
      setUserInfo(JSON.parse(storedUser));
    }else{
      setAuthenticated(false);
      setUserInfo(null);
    }
  }, [authenticated]);

  const headers = {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json' // Set content type as JSON
  };

  const handleSuccess =  (successMessage)=> {
    setOpen(true);
    setMessage(successMessage);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const handleLogout =  (event) => {
   
       axios.post('http://localhost:3000/api/user/logout', requestBody, { headers })
       .then((response )=>{

         setAuthenticated(false);
        sessionStorage.removeItem('user');
       }).catch (error=> {
        console.error('Logout failed:', error);
      });
  };

  return (
    <Router>
      <div>
      {authenticated && <Header onLogout={handleLogout} setAuthenticated={setAuthenticated} />}
        <Routes>
          <Route path="/" element={ <LoginPage setAuthenticated={setAuthenticated} setAuthToken={setAuthToken}/>}/>
          <Route path="/profile" element={ <ProfilePage userInfo={userInfo}  displaySuccess={handleSuccess}/>}/>
        </Routes>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Router>
  );
}

export default App;
