import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import RedeemIcon from "@mui/icons-material/Redeem";
import { useLocation, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Container from "@mui/material/Container";
import { Stack, useTheme } from "@mui/material";
import UseAuth from "../custom-hooks/UseAuth";
import { auth } from "../Firebase/config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { blueGrey, grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",

  width: "100%",

  border: "1.5px Solid #8585857e ",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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
  const adminNav = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Add Products", path: "/dashboard/add-products" },
    { title: "All Products", path: "/dashboard/all-products" },
    { title: "Users", path: "/dashboard/users" },
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

  return (
    <>
      <AppBar
        className={scrolled ? "addShadwo" : null}
        position="sticky"
        color="background"
        elevation={0}
        sx={{
          zIndex: "5",
          display: "flex",
          minHeight: { navHighit },
          backgroundColor: blueGrey[800],
          color: theme.palette.getContrastText(blueGrey[800]),
        }}
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
                flexGrow: { xs: "3", md: "1" },
                mr: "8px",
                overflow: "visible",
              }}
            >
              <RedeemIcon
                fontSize="large"
                sx={{
                  color: theme.palette.getContrastText(blueGrey[800]),
                  mr: "10px",
                }}
              />
              <Typography sx={{ fontSize: "20px" }}>ShairMart</Typography>
            </Typography>
            <Box
              sx={{
                flexGrow: "2",
                display: { xs: "none", md: "flex" },
              }}
            >
              <Search
                sx={{
                  width: "80%",
                  backgroundColor: theme.palette.getContrastText(blueGrey[800]),
                  color: grey[700],
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>

            <Box
              sx={{
                display: { xs: "flex", md: "flex", alignItems: "center" },
                flexGrow: { xs: "1", md: "0" },
              }}
            >
              <NotificationsIcon sx={{ fontSize: "15px", mx: "15px" }} />
              <SettingsIcon sx={{ fontSize: "15px" }} />
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
          width: "250px",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: "250px" },
          display: { xs: showDrawer, md: "none" },
        }}
        open={true}
        onClose={() => {
          setActionDrawer("permanent");
          setShowDrawer("none");
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            mt: "30px",
          }}
        >
          <Search
            sx={{
              width: "100%",
              backgroundColor: theme.palette.getContrastText(blueGrey[800]),
              color: grey[700],
              mx: "3px",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>
        <Box>
          <List sx={{ my: "auto", textAlign: "center", alignSelf: "center" }}>
            {adminNav.map((item) => {
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
        </Box>
      </Drawer>
      <Box sx={{height:"50px",  justifyContent: "center" ,alignItems:'center',display:{xs:"none",md:"flex"}, backgroundColor:"#e3f2fd"}}>
        <Container>
          <Stack
            direction={"row"}
            spacing={8}
            sx={{ justifyContent: "center" }}
          >
            {adminNav.map((item) => {
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

                        backgroundColor:location.pathname === item.path
                        ? grey[50]
                        : null,
                    cursor: "pointer",
                    p:"5px",
                    borderRadius:"2px",
                    "&:hover": {
                      color: theme.palette.newColor.hoverr,
                    },
                  }}
                >
                  {item.title}
                </Typography>
              );
            })}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
