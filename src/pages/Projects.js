import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import DC from '../DC-Metro.png';
import Movie from '../Movie.png';
import Top from '../Top';
import Twitter from '../Twitter-logo.png';
import './Projects.css';

function Projects() {
  return (
    <>
        <Top/>
        <div className='proj-back'>
            <br/><br/>
            <h1>
                <center>
                    <p className='proj-title'><b>PROJECTS</b></p>
                    <br/><br/>
                    <Box >
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Card sx={{ ml:2, mr: 10 ,maxWidth: 345}} style={{ border: "5px ridge black", width: "345px", height: "300px"}}>
                            <CardActionArea target="_blank" href='https://github.com/johann017/Twitter-Sentiment'>
                                <CardMedia
                                component="img"
                                image={Twitter}
                                height='140vh'
                                alt="green iguana"
                                style={{
                                    width: "auto",
                                    maxHeight:'auto'
                                }}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Twitter Sentiment Analysis
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" target="_blank" href='https://github.com/johann017/Twitter-Sentiment'>
                                    <br/><br/>
                                    GitHub
                                </Button>
                            </CardActions>
                        </Card>
                        <Card sx={{ ml:10, mr: 10, maxWidth: 385 }} style={{ border: "5px ridge black", width: "345px", height: "300px" }}>
                            <CardActionArea target="_blank" href='https://github.com/johann017/API_Projects'>
                                <CardMedia
                                component="img"
                                height="140"
                                image={DC}
                                alt="green iguana"
                                style={{
                                    width: "auto",
                                    maxHeight:'auto'
                                }}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    DC Metro Navigator
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" target="_blank" href='https://github.com/johann017/API_Projects'>
                                    <br/><br/>
                                    GitHub
                                </Button>
                            </CardActions>
                        </Card>
                        <Card sx={{ ml:10, mr: 2, maxWidth: 345 }} style={{ border: "5px ridge black", width: "345px", height: "300px" }}>
                            <CardActionArea target="_blank" href='https://johann017.github.io/CMSC320-Final/'>
                                <CardMedia
                                component="img"
                                height="140"
                                image={Movie}
                                alt="green iguana"
                                style={{
                                    width: "auto",
                                    maxHeight:'auto'
                                }}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Predicting Movie Revenue 
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" target="_blank" href='https://johann017.github.io/CMSC320-Final/'>
                                    <br/><br/>
                                    GitHub
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Box>
                </center>
            </h1>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    </>
  )
}

export default Projects;