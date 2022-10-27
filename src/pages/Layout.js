import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { Outlet, Link } from 'react-router-dom';
import Bottom from '../Bottom';
import './Layout.css';
  
function Layout() {
    return (
        <>
            <div>
                <Outlet/>
            </div>
        </>
    );
}
  
export default Layout;
