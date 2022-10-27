import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import './Home.css';




function Home() {
  return (
    <div className='backdrop'>
      <div>
        <br/><br/><br/><br/><br/> <br/><br/><br/>
        <center>
            <h1 className="name">
              <p>JOHANN ANTISSERIL</p>
            </h1>
            <br/><br/><br/>
        </center>
      </div>
      <div>
        <Box>
            <AppBar position="static" sx={{ bgcolor: "black", color: 'rgb(201, 225, 201)', alignItems: 'center' }}>
                <Toolbar>
                    <Button color="inherit" href='/about' labelStyle={{ fontSize: '20px'}}>About</Button>
                    <Button color="inherit" href='/projects' size='small'>Projects</Button>
                    <Button color="inherit" href='/resume' size='small'>Resume</Button>
                    <Button color="inherit" href='/contact' size='small'>Contact</Button>
                </Toolbar>
            </AppBar>
        </Box>
      </div>
      <center>
          <br/><br/><br/><br/>
          <h3 className='major'>
            Computer Science Major | Statistics Minor
          </h3>
      </center>
      <br/><br/><br/><br/><br/> <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
    
  )
}

export default Home