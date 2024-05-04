import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "./Notifications-Teacher.module.css";
import {Link} from "react-router-dom";

function NotificationsTeacher() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Header />
      <UpperHeader title="Notifications" subtitle="tests" />
      <div className={styles.container}>
        <CardElongated title={"student-0"} cardIndex={1} height={100}>
          <Button
            variant="contained"
            endIcon={<CreateOutlinedIcon />}
            sx={{
              width: isSmallScreen ? "50px" : "75px",
              height: "50px",
              backgroundColor: "#F5F5F5",
              borderRadius: "20px",
              color: "rgba(0,0,0,0.75)",
              fontFamily: "Inter",
              fontSize: isSmallScreen ? "10px" : "12px", // Adjust the font size based on screen size
              fontWeight: "semi-bold",
              alignSelf: "flex-end",
              marginLeft: "auto",
              marginRight: "20px",
              marginBottom: "25px",
              border: "none",
              textTransform: "none",
            }}
            component={Link}
            to="/add-review"
          />
        </CardElongated>

        <CardElongated title={"student-1"} cardIndex={2} height={100}>
          <Button
            variant="contained"
            endIcon={<CreateOutlinedIcon />}
            sx={{
              width: isSmallScreen ? "50px" : "75px",
              height: "50px",
              backgroundColor: "#F5F5F5",
              borderRadius: "20px",
              color: "rgba(0,0,0,0.75)",
              fontFamily: "Inter",
              fontSize: isSmallScreen ? "10px" : "12px", // Adjust the font size based on screen size
              fontWeight: "semi-bold",
              alignSelf: "flex-end",
              marginLeft: "auto",
              marginRight: "20px",
              marginBottom: "25px",
              border: "none",
              textTransform: "none",
            }}
            // component={Link}
            // to="/add-feedback"
          />
        </CardElongated>

        <CardElongated title={"student-2"} cardIndex={3} height={100}>
          <Button
            variant="contained"
            endIcon={<CreateOutlinedIcon />}
            sx={{
              width: isSmallScreen ? "50px" : "75px",
              height: "50px",
              backgroundColor: "#F5F5F5",
              borderRadius: "20px",
              color: "rgba(0,0,0,0.75)",
              fontFamily: "Inter",
              fontSize: isSmallScreen ? "10px" : "12px", // Adjust the font size based on screen size
              fontWeight: "semi-bold",
              alignSelf: "flex-end",
              marginLeft: "auto",
              marginRight: "20px",
              marginBottom: "25px",
              border: "none",
              textTransform: "none",
            }}
            // component={Link}
            // to="/add-feedback"
          />
        </CardElongated>

        <CardElongated title={"student-3"} cardIndex={4} height={100}>
          <Button
            variant="contained"
            endIcon={<CreateOutlinedIcon />}
            sx={{
              width: isSmallScreen ? "50px" : "75px",
              height: "50px",
              backgroundColor: "#F5F5F5",
              borderRadius: "20px",
              color: "rgba(0,0,0,0.75)",
              fontFamily: "Inter",
              fontSize: isSmallScreen ? "10px" : "12px", // Adjust the font size based on screen size
              fontWeight: "semi-bold",
              alignSelf: "flex-end",
              marginLeft: "auto",
              marginRight: "20px",
              marginBottom: "25px",
              border: "none",
              textTransform: "none",
            }}
            // component={Link}
            // to="/add-feedback"
          />
        </CardElongated>
      </div>
    </div>
  );
}

export default NotificationsTeacher;
