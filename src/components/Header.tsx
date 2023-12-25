import { AppBar, Toolbar } from "@mui/material"
import Logo from "./shared/Logo"
import { useAuth } from "../context/AuthContext"
import NavigationLink from "./shared/NavigationLink";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const auth = useAuth();
  // const navigate = useNavigate();

  const handleLogout = () => {
    // navigate("/");
    auth?.logout();
  }

  return (
      <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {
            auth?.isLoggedIn ?
              (
                <>
                  <NavigationLink to="/chat" bg="#00fffc" text="Go to chat" textColor="black"/>
                  <NavigationLink to="/" bg="#51538f" text="Logout" textColor="white" onClick={auth?.logout}/>
                </>
              ) : (
                <>
                  <NavigationLink to="/login" bg="#00fffc" text="Login" textColor="black" onClick={auth?.login}/>
                  <NavigationLink to="/register" bg="#51538f" text="Sign Up" textColor="white" onClick={auth?.signup}/>
                </>
              )
          }
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header