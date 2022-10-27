import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

function Top() {
  return (
    <div>
        <Box >
            <AppBar position="static" sx={{bgcolor: "black" }}>
                <Toolbar>
                    <Link to='/' style={{textDecoration: 'none', color:'white'}} > 
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} >
                            <HomeIcon/>
                        </IconButton>
                    </Link>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                    <Button color="inherit" href='/about'>About</Button>
                    <Button color="inherit" href='/projects'>Projects</Button>
                    <Button color="inherit" href='/resume'>Resume</Button>
                    <Button color="inherit" href='/contact'>Contact</Button>
                </Toolbar>
            </AppBar>
        </Box>
    </div>
  )
}

export default Top

