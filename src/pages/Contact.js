import { Avatar, Divider } from '@mui/material';
import React from 'react'
import Top from '../Top';
import './Contact.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


function Login() {
  return (
    <>
      <Top/>
      <div className='contact-back'>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <h1>
            <center>
              GET IN TOUCH
            </center>
          </h1>
          <Divider variant="middle" sx={{borderBottomWidth: 4, marginLeft: '40%', marginRight: '40%'}}/>
          <h3>
            <center>
              jantisseril@gmail.com
            </center>
          </h3>
          <br/><br/><br/><br/><br/><br/>
          <div className='link-git'>
            <Avatar style={{backgroundColor: "white", color:"white"}}>
                <a href="https://github.com/johann017" target="_blank" rel="noreferrer">
                    <GitHubIcon/>
                </a>
            </Avatar>
            <Avatar style={{backgroundColor: "white", color:"white"}}>
                <a href="https://www.linkedin.com/in/johann-antisseril-7498561b3/" target="_blank" rel="noreferrer">
                    <LinkedInIcon/>
                </a>
            </Avatar>
          </div>
          
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </div>
    </>
  )
}

export default Login;