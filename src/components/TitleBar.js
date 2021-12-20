import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
// import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SearchIcon from "@material-ui/icons/Search";
// import AccountCircle from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// import { useSession } from "../firebase/UserProvider";
import { auth } from "../firebase/config";
import CustomAlert from "./CustomAlert";
import logo from "../images/logo.png";

const useStyles = makeStyles((theme) => {
  return {
    grow: {
      flexGrow: 1,
    },

    applogo: {
      display: "flex",
      flex: 1,
      cursor: "pointer",
    },

    iconButton: {
      padding: "10px 10px",
      flex: 1,
      margin: "2px",
    },

    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      flex: 2,
      display: "flex",
      alignItems: "center",
      borderRadius: "10px",
      backgroundColor: theme.palette.divider,
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
        boxShadow:
          "0 1px 1px 0 rgba(65,69,73,0.3),0 1px 3px 1px rgba(65,69,73,0.15)",
      },
    },

    searchBar: {
      flex: 10,
      display: "flex",
      alignItems: "center",
      borderRadius: "10px",
      backgroundColor: theme.palette.action.selected,
    },

    mytoolbar: {
      display: "flex",
      minHeight: "70px",
      backgroundColor: theme.palette.background.paper,
    },
    sectionDesktop: {
      flex: 1,
      display: "flex",
      justifyContent: "end",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
      cursor: "pointer",
    },

    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    titleText: {
      color: theme.palette.text.primary,
      paddingTop: "10px",
    },
  };
});

export default function TitleBar({ onSearchChange }) {
  const classes = useStyles();
  const [term, setTerm] = React.useState("");
  // const userObj = useSession();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const matches = useMediaQuery("(min-width:460px)");

  // const isMenuOpen = Boolean(anchorEl);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  const handleSearhClick = () => {
    history.push("/search");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  const handleSearchChange = (e) => {
    setTerm(e.target.value.trim());
    onSearchChange(e.target.value.trim());
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      <CustomAlert type="error" message={error} />;
    }
  };

  // const menuId = "primary-search-account-menu";
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{ vertical: "top", horizontal: "right" }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem>{userObj.user?.displayName}</MenuItem>
  //     <MenuItem onClick={handleLogout}>Log out</MenuItem>
  //   </Menu>
  // );

  return (
    <div className={classes.grow}>
      <AppBar color="transparent">
        <Toolbar className={classes.mytoolbar}>
          {matches && (
            <div
              className={classes.applogo}
              onClick={() => history.push("/home")}
            >
              <img src={logo} alt="keep logo" />

              <Typography variant="h6" className={classes.titleText}>
                Notes
              </Typography>
            </div>
          )}
          <div className={matches ? classes.search : classes.searchBar}>
            {matches && (
              <div style={{ flex: "1" }}>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  className={classes.iconButton}
                  onClick={handleSearhClick}
                >
                  <SearchIcon className={classes.svgIcon} />
                </IconButton>
              </div>
            )}

            <div style={{ flex: "10" }}>
              <form onSubmit={handleFormSubmit}>
                <InputBase
                  placeholder="Search notes…"
                  style={{ width: "100%", paddingLeft: "10px" }}
                  value={term}
                  onClick={handleSearhClick}
                  onChange={handleSearchChange}
                  onBlur={handleFormSubmit}
                  inputProps={{ "aria-label": "search" }}
                />
              </form>
            </div>
            <div style={{ flex: "1" }}>
              <IconButton
                edge="end"
                className={classes.iconButton}
                onClick={() => {
                  history.push("/home");
                }}
              >
                <CloseIcon className={classes.svgIcon} />
              </IconButton>
            </div>
          </div>
          {/* future profile page */}
          {/* <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div> */}

          <div className={classes.sectionDesktop}>
            <ExitToAppIcon onClick={handleLogout} />
          </div>
        </Toolbar>
      </AppBar>
      {/* future profile page */}
      {/* {renderMenu} */}
    </div>
  );
}
