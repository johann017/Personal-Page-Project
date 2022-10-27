import { Box } from '@mui/system';
import React from 'react'
import Image from "../logo512.png";
import SF from "../State-Farm-Logo.png";
import { Avatar, Button, Divider, Grid, Rating, Typography } from '@mui/material';
import './About.css';
import Top from '../Top';
import ProfilePic from '../PersonalPagePP.jpg';

function AboutMe() {
  return (
    <>
      <Top/>
      <div className="abt-font">
        <br/><br/>
        <h1>
          <center>
            <p className='exp-title'><b>ABOUT ME</b></p>
          </center>
        </h1>
        <Grid>
          <div className="me-des">
            <Grid container >
              <Grid item xs>
                <br/><br/>
                <center>
                  <Avatar alt="Johann Antisseril" src={ProfilePic} sx={{ width: 300, height: 300}} className="about-pfp"/>
                </center> 
              </Grid>
              <Divider/>
              
              <Grid item xs={8} >
              <br/><br/><br/><br/>
                <div className='about-desc'>
                <p>I am Johann Antisseril, a senior pursuing a Computer Science major and a
                    minor in Statistics at the University of Maryland, College Park with an
                    expected graduation in May 2023.</p>
                    <p>Currently, along with my coursework at school, I am working part-time as
                    Software Engineer intern at State Farm. During the summer of 2022, I worked
                    as an Application Developer intern at State Farm.</p>
                    <p>I am from the Bay Area, California. I love the outdoors and believe in staying
                    active. My passion for travel has allowed me to experience new cultures and
                    food which helped me broaden my horizons and make memories.</p>
                </div>
              </Grid>
            </Grid>
            <center>
              <Button style={{ borderRadius: 35,backgroundColor: "black", color:"white"}} href='/resume'>Resume</Button>
            </center>
            <br/><br/>
          </div>
          <div className="me-des">
            <Divider variant="middle" sx={{borderBottomWidth: 4, marginLeft: '7%', marginRight: '7%'}}/>
          
            <div className='me-des'>
              <Box item sx={{marginLeft: '9%', marginTop:'4.5%'}}>
                <h2 className='exp-title'>EXPERIENCE</h2>
              </Box>
              <Grid>
                <Grid item sx={{marginLeft: '33%', marginTop:'-5.5%'}}>
                  <Grid container className='exp-align'>
                      <Avatar alt="State Farm" src={SF} sx={{ width: 100, height: 15}} className="statefarm-img"/>
                      <p>Software Engineer Intern (Aug 2022 - Present) </p>
                  </Grid>
                </Grid>
                <Grid item sx={{marginLeft: '33%', marginTop:'-4%'}}>
                  <Grid container className='exp-align'>
                      <Avatar alt="State Farm" src={SF} sx={{ width: 100, height: 15}} className="statefarm-img"/>
                      <p>Application Developer Intern (May 2022 - Aug 2022) </p>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <br/><br/>
            <Divider variant="middle" sx={{borderBottomWidth: 4, marginLeft: '7%', marginRight: '7%'}}/>
          </div>
          <div className='me-des'>
            <Box sx={{marginLeft: '9%', marginTop:'8.5%'}}>
              <h2 className='exp-title'>PROGRAMMING SKILLS</h2>
            </Box>
            <Grid>
              <Grid item sx={{marginLeft: '36%', marginRight: '45%', marginTop:'-7%'}}>
                <Grid container>
                  <Typography component="legend" sx={{ flexGrow: 1 }}>Python</Typography>
                  <Rating name="read-only" value={5} sx={{"& .MuiRating-iconFilled": {color: "red"}}} readOnly />
                </Grid>
              </Grid>
              <Grid item sx={{marginLeft: '36%', marginRight: '45%'}}>
                <Grid container>
                  <Typography component="legend" sx={{ flexGrow: 1 }}>Java</Typography>
                  <Rating name="read-only" value={4.5} sx={{"& .MuiRating-iconFilled": {color: "red"}}} readOnly />
                </Grid>
              </Grid>
              <Grid item sx={{marginLeft: '36%', marginRight: '45%'}}>
                <Grid container>
                  <Typography component="legend" sx={{ flexGrow: 1 }}>Ruby</Typography>
                  <Rating name="read-only" value={4} sx={{"& .MuiRating-iconFilled": {color: "red"}}} readOnly />
                </Grid>
              </Grid>
              <Grid item sx={{marginLeft: '36%', marginRight: '45%'}}>
                <Grid container>
                  <Typography component="legend" sx={{ flexGrow: 1 }}>OOP</Typography>
                  <Rating name="read-only" value={4} sx={{"& .MuiRating-iconFilled": {color: "red"}}} readOnly />
                </Grid>
              </Grid>
              <Grid item sx={{marginLeft: '36%', marginRight: '45%'}}>
                <Grid container>
                  <Typography component="legend" sx={{ flexGrow: 1 }}>Linux</Typography>
                  <Rating name="read-only" value={4} sx={{"& .MuiRating-iconFilled": {color: "red"}}} readOnly />
                </Grid>
              </Grid>
              <Grid item sx={{marginLeft: '36%', marginRight: '45%'}}>
                <Grid container>
                  <Typography component="legend" sx={{ flexGrow: 1 }}>React</Typography>
                  <Rating name="read-only" value={4} sx={{"& .MuiRating-iconFilled": {color: "red"}}} readOnly />
                </Grid>
              </Grid>
              <Grid item sx={{marginLeft: '36%', marginRight: '45%'}}>
                <Grid container>
                  <Typography component="legend" sx={{ flexGrow: 1 }}>CSS</Typography>
                  <Rating name="read-only" value={4} sx={{"& .MuiRating-iconFilled": {color: "red"}}} readOnly />
                </Grid>
              </Grid>
              <Grid item sx={{marginLeft: '36%', marginRight: '45%'}}>
                <Grid container>
                  <Typography component="legend" sx={{ flexGrow: 1 }}>C</Typography>
                  <Rating name="read-only" value={3} sx={{"& .MuiRating-iconFilled": {color: "red"}}} readOnly />
                </Grid>
              </Grid>
              <Grid item sx={{marginLeft: '36%', marginRight: '45%'}}>
                <Grid container>
                  <Typography component="legend" sx={{ flexGrow: 1 }}>OCaml</Typography>
                  <Rating name="read-only" value={3} sx={{"& .MuiRating-iconFilled": {color: "red"}}} readOnly />
                </Grid>
              </Grid>
            </Grid>
            <br/><br/><br/>
            <Divider variant="middle" sx={{borderBottomWidth: 4, marginLeft: '7%', marginRight: '7%'}}/>
            <br/>
            <Box sx={{marginLeft: '9%', marginTop:'5.5%'}}>
              <h2 className='exp-title'>SOFT SKILLS</h2>
            </Box>
            <Box>
              <Grid item sx={{marginLeft: '36%', marginRight: '45%', marginTop:'-5.5%'}}>
                <Grid container>
                  <Typography component="legend" sx={{ flexGrow: 1 }}>Team Player</Typography>
                  <Rating name="read-only" value={5} sx={{"& .MuiRating-iconFilled": {color: "red"}}} readOnly />
                </Grid>
              </Grid>
              <Grid item sx={{marginLeft: '36%', marginRight: '45%'}}>
                <Grid container>
                  <Typography component="legend" sx={{ flexGrow: 1 }}>Grit</Typography>
                  <Rating name="read-only" value={4.5} sx={{"& .MuiRating-iconFilled": {color: "red"}}} readOnly />
                </Grid>
              </Grid>
              <Grid item sx={{marginLeft: '36%', marginRight: '45%'}}>
                <Grid container>
                  <Typography component="legend" sx={{ flexGrow: 1 }}>Critical Thinking</Typography>
                  <Rating name="read-only" value={5} sx={{"& .MuiRating-iconFilled": {color: "red"}}} readOnly />
                </Grid>
              </Grid>
              <Grid item sx={{marginLeft: '36%', marginRight: '45%'}}>
                <Grid container>
                  <Typography component="legend" sx={{ flexGrow: 1 }}>Adaptability</Typography>
                  <Rating name="read-only" value={5} sx={{"& .MuiRating-iconFilled": {color: "red"}}} readOnly />
                </Grid>
              </Grid>
              <Grid item sx={{marginLeft: '36%', marginRight: '45%'}}>
                <Grid container>
                  <Typography component="legend" sx={{ flexGrow: 1 }}>Time Management</Typography>
                  <Rating name="read-only" value={4} sx={{"& .MuiRating-iconFilled": {color: "red"}}} readOnly />
                </Grid>
              </Grid>
            </Box>
            <br/><br/>
          </div>
        </Grid>
      </div>
    </>
  )
}

export default AboutMe;