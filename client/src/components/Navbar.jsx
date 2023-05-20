import React, { useState } from 'react';
import { 
    LightModeOutlined, 
    DarkModeOutlined, 
    Menu as MenuIcon, 
    Search, 
    SettingsOutlined, 
    ArrowDropDownOutlined,
    Scale,
    Brightness1Sharp,
    LanguageOutlined,
    NotificationsOutlined,
} from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from 'state';
import profileImage from "assets/Gaurank.jpeg";
import { 
    AppBar,
    Button, 
    Toolbar, 
    useTheme, 
    IconButton, 
    InputBase, 
    MenuItem, 
    Box,
    Typography,
    Menu,

} from '@mui/material';

const Navbar = ({isSidebarOpen, setIsSidebarOpen, user}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null)


  const mode = useSelector((state) => state.global.mode); 
   
  return <AppBar
    sx={{
        position: "static",
        background: "none",
        boxShadow: mode==="dark" ? "0px 2px 5px #ebecf7" : "",
    }}
  >
    <Toolbar sx={{ justifyContent: "space-between"}}>
        
        <FlexBetween>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <MenuIcon />
            </IconButton>
            <FlexBetween
                backgroundColor={theme.palette.background.alt}
                borderRadius="9px"
                gap="3rem"
                p="0.1rem 1.5rem"
            >
                <InputBase placeholder="Search"/>
                <IconButton>
                    <Search/>
                </IconButton>
            </FlexBetween>
        </FlexBetween>


        <FlexBetween gap="1.5rem">

            {/* <IconButton>
                <LanguageOutlined sx={{fontSize: "25px" }}/>
            </IconButton> */}
            {/* <IconButton>
                <NotificationsOutlined sx={{fontSize: "25px" }}/>
            </IconButton> */}
            
            <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlined sx={{fontSize: "25px", color: '#96afe3', boxShadow: '1px 1px 2px white, 0 0 2em #5252d8, 0 0px 1em #7c81e4fa', borderRadius: '50%', backgroundColor: 'blue'}}/>   
                ) : (
                    <LightModeOutlined sx={{fontSize: "25px", color: '#053699', boxShadow: '1px 1px 2px black, 0 0 2em #edcb07, 0 0 1em #edcb07', borderRadius: '50%' , backgroundColor: '#f2dc61'}}/>
                )}
            </IconButton>
            <IconButton>
                <SettingsOutlined sx={{fontSize: "25px" }}/>
            </IconButton>
            
            <FlexBetween>
                <Button onClick={handleClick} sx={{display: "flex", justifyContent: "space-between", alignItems: "center", textTransform: "none", gap:"1rem"}}>
                    <Box
                        component="img"
                        alt="profile"
                        src={profileImage}
                        height="32px"
                        width="32px"
                        borderRadius="50%"
                        sx={{objectFit : "cover"}}
                    />
                    <Box textAlign="left">
                            <Typography fontWeight="bold" fontSize="0.85rem" sx={{ color: theme.palette.secondary[100]}}>
                                {user.name}
                            </Typography>
                            <Typography fontSize="0.75rem" sx={{ color: theme.palette.secondary[200]}}>
                                {user.occupation}
                            </Typography>
                    </Box>
                    <ArrowDropDownOutlined 
                        sx={{ color: theme.palette.secondary[300], fontSize: '25px'}}
                    />
                    
                </Button>
                <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center"}}>
                    <MenuItem onClick={handleClose}>Log Out</MenuItem>
                </Menu>
            </FlexBetween>

        </FlexBetween>
    </Toolbar>
  </AppBar>
}

export default Navbar