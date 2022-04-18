import React from "react";


import  { withRouter }  from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';




import Logo from '../../images/logoRemoteLab.png';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1
    }
  },
  headerOptions: {
    display: "flex",
    flexDirection: 'row', 
    justifyContent: 'space-evenly'   
  }
}));

const Header = props => {

  

  
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
 

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  

  const handleClick = pageURL => {

    history.push(pageURL);
  };

  const menuItems = [
    {
      menuTitle: "EXPERIMENTO",
      pageURL: "/"
    },
    {
      menuTitle: "AVANZADO",
      pageURL: "/avanzado"
    }
    ,
    {
      menuTitle: "NOSOTROS",
      pageURL: "/about"
    }
    
  ];

  return (
    <div className={classes.root}>
       <Container maxWidth="xl"> 
      <AppBar position="fixed" style={{ background: '#496cb2'}}>
        <Toolbar >
        
          <Box
              component="img"
              sx={{
              height: 50,
              }}
              alt="Your logo."
              src={Logo}
              />
             

          {isMobile ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="primary"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
               >
                {menuItems.map((menuItem,index) => {
                  const { menuTitle, pageURL } = menuItem;
                  return (                    
                        <MenuItem 
                          key={index}
                          onClick={() => handleClick(pageURL)}>
                          {menuTitle}
                        </MenuItem>                    
                  );
                })}
              </Menu>
            </>
          ) : (
            <div className={classes.headerOptions}>
              {menuItems.map((menuItem,index) => {
                  const { menuTitle, pageURL } = menuItem;
                  return (                    
                        <Button 
                        startIcon={<ArrowDropDownIcon />}
                        color='primary'
                          sx={{ my: 2,}}
                          key={index}
                          onClick={() => handleClick(pageURL)}>
                          {menuTitle}
                        </Button>                    
                  );
                })}            
            </div>
          )} 
            

        </Toolbar>

        
       
      </AppBar>
      </Container>
      
    </div>
  );
};

export default withRouter(Header);
