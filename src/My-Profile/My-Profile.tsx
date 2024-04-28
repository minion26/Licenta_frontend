import Header from "../Header-teacher/Header";
import UpperHeader from "../Upper-Header/Upper-Header";
// import styles from "./My-Profile.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function MyProfile() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Header />

      <UpperHeader
        title="My Profile"
        subtitle="date"
        buttons={[{ key: "Logout", label: "Logout" }]}
      />

      <Box
        sx={{
          display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          marginLeft: isSmallScreen ? "0px" : "125px",
          marginTop: "20px",
          width: "75%",
        }}
      >
        <Box>
          <TextField
            label="First Name"
            id="outlined-start-adornment-firstname"
            sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
          />
          <TextField
            label="Last Name"
            id="outlined-start-adornment-lastname"
            sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
          />

          <TextField
            sx={{ m: 1, marginBottom: "20px" }}
            fullWidth
            label="Email"
            id="fullWidth"
          />
          <TextField
            id="outlined-old-password-input"
            label="Old Password"
            type="password"
            sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
            autoComplete="current-password"
          />
          <TextField
            id="outlined-new-password-input"
            label="New Password"
            type="password"
            sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
            autoComplete="current-password"
          />

          <Button
            sx={{ m: 1, marginTop: isSmallScreen ? "0px" : "20px" }}
            variant="contained"
          >
            Confirm Password
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "20px",
              m: 1,
            }}
          >
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained">Save</Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default MyProfile;
