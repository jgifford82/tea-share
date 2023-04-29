import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/user";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// component property contains link so the button knows to act like a link (per mui.com third-party routing library). to= tells it where to go. This way we don't need event listeners. Link allows us to navigate without a page refresh.

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  // console.log(user);

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      setUser(null);
      navigate("/");
    });
    // console.log("logout clicked");
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "left" }}
        >
          TeaShare
        </Typography>
        {/* tea button displays in navbar only if a user is logged in */}
        {user && (
          <Button color="inherit" to="/teas" component={Link}>
            Teas
          </Button>
        )}
        {/* My Reviews button displays in navbar only if a user is logged in */}
        {user && (
          <Button color="inherit" to="/my-reviews" component={Link}>
            My Reviews
          </Button>
        )}
        {/* logout button displays in navbar only if a user is logged in */}
        {user && (
          <Button color="inherit" component={Link} onClick={handleLogout}>
            Log out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
