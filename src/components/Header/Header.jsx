import React, { useEffect, useState } from "react";
import "./header.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RedeemIcon from "@mui/icons-material/Redeem";
import { useLocation, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import UseAuth from "../../custom-hooks/UseAuth";
import { auth } from "../../Firebase/config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser } = UseAuth();
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      component="div"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ width: "220px" }}
    >
      {currentUser ? (
        <Box>
          <MenuItem
            sx={{
              width: "220px",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={handleMenuClose}
          >
            {currentUser.displayName}
          </MenuItem>
          <MenuItem
            component="span"
            sx={{
              width: "220px",
              mt: "0",
              pt: "0",
              fontSize: "11px",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={handleMenuClose}
          >
            {currentUser.email}
          </MenuItem>

          <MenuItem
            onClick={() => {
              signOut(auth)
                .then(() => {
                  // Sign-out successful.
                  toast.success("Logged Out Successfully");
                  navigate("/home");
                })
                .catch((error) => {
                  toast.error("somthing error");
                });
            }}
            sx={{ width: "220px", textAlign: "center" }}
          
          >
          
              LogOut
          
          </MenuItem>
        </Box>
      ) : (
        <Box>
          <MenuItem
            sx={{ width: "220px", textAlign: "center" }}
            onClick={() => {
              navigate("/signup");
            }}
          >
          
              
          
              SignUp
          
          </MenuItem>
          <MenuItem
            sx={{ width: "220px", textAlign: "center" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            LogIn
          </MenuItem>
        </Box>
      )}
    </Menu>
  );
  const navHighit = 64;
  const [showDrawer, setShowDrawer] = useState("none");
  const [actionDrawer, setActionDrawer] = useState("permanent");
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const myLists = [
    { title: "Home", path: "/home" },
    { title: "Cart", path: "/cart" },
    { title: "Shop", path: "/shop" },
  ];
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  }, []);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <>
      <AppBar
        className={scrolled ? "addShadwo" : null}
        position="sticky"
        color="background"
        elevation={0}
        sx={{ zIndex: "5", display: "flex", minHeight: { navHighit } }}
      >
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: { xs: "3", md: "0" },
              }}
            >
              <RedeemIcon
              onClick={()=>{
                navigate('/')
              }}
                fontSize="large"
                sx={{  mr: "10px" ,cursor:"pointer"}}
              />
              <Typography   onClick={()=>{
                navigate('/')
              }} sx={{ fontSize: "20px" ,cursor:"pointer"}}>ShairMart</Typography>
            </Typography>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                ml: "auto",
                gap: "30px",
                mr: "auto",
              }}
            >
              {myLists.map((item) => {
                return (
                  <Typography
                    key={item.title}
                    onClick={() => {
                      navigate(item.path);
                    }}
                    sx={{
                      color:
                        location.pathname === item.path
                          ? theme.palette.newColor.navv
                          : theme.palette.newColor.main,
                      cursor: "pointer",
                      "&:hover": {
                        color: theme.palette.newColor.hoverr,
                      },
                    }}
                  >
                    {item.title}
                  </Typography>
                );
              })}
            </Box>

            <Box
              sx={{
                display: { xs: "flex", md: "flex" },
                flexGrow: { xs: "1", md: "0" },
              }}
            >
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <StyledBadge
                  badgeContent={totalQuantity}
                  sx={{ fontSize: "12px" }}
                  color="success"
                >
                  <ShoppingCartIcon
                    sx={{
                    
                      display: "flex",
                      fontSize:"22px"
                    }}
                    onClick={() => {
                      navigate("/cart");
                    }}
                  />
                </StyledBadge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Avatar
                  src={currentUser ? currentUser.photoURL : null}
                  sx={{ width: "25px", height: "25px", display: "flex" }}
                />
              </IconButton>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
                onClick={() => {
                  setShowDrawer("block");
                  setActionDrawer("primary");
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>

          {renderMenu}
        </Container>
      </AppBar>
      <Drawer
        variant={actionDrawer}
        anchor="right"
        sx={{
          width: "240px",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: "240px" },
          display: { xs: showDrawer, md: "none" },
        }}
        open={true}
        onClose={() => {
          setActionDrawer("permanent");
          setShowDrawer("none");
        }}
      >
        <List sx={{ my: "auto", textAlign: "center", alignSelf: "center" }}>
          {myLists.map((item) => {
            return (
              <ListItem
                key={item.title}
                onClick={() => {
                  navigate(item.path);
                }}
                sx={{
                  color:
                    location.pathname === item.path
                      ? theme.palette.newColor.navv
                      : theme.palette.newColor.main,
                  cursor: "pointer",
                  "&:hover": {
                    color: theme.palette.newColor.hoverr,
                  },
                }}
              >
                <Typography>{item.title}</Typography>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
