import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import styles from "./Main-Page-Admin.module.css";
import MyCalendar from "../Calendar/Calendar.tsx";
// import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function StudentsButtons() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        display: "flex",
        width: isSmallScreen ? "100%" : "250px",
        height: isSmallScreen ? "50%" : "300px",
        backgroundColor: "#FAFAF5",
        borderRadius: "24px",
        alignSelf: "center",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CardContent
          sx={{
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p>Students</p>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            sx={{
              width: "150px",
              height: "50px",
              backgroundColor: "#F5F5F5",
              borderRadius: "20px",
              color: "rgba(0,0,0,0.75)",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: "semi-bold",
              alignSelf: "flex-end",
              marginLeft: "auto",
              marginRight: "20px",
              marginBottom: "10px",
              border: "none",
              textTransform: "none",
            }}
            // component={Link}
            // to="/materials-per-lecture"
          >
            {" "}
            Create
          </Button>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            sx={{
              width: "150px",
              height: "50px",
              backgroundColor: "#F5F5F5",
              borderRadius: "20px",
              color: "rgba(0,0,0,0.75)",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: "semi-bold",
              alignSelf: "flex-end",
              marginLeft: "auto",
              marginRight: "20px",
              marginBottom: "10px",
              border: "none",
              textTransform: "none",
            }}
            // component={Link}
            // to="/materials-per-lecture"
          >
            {" "}
            Upload
          </Button>
          <Button
            variant="contained"
            endIcon={<RemoveRedEyeOutlinedIcon />}
            sx={{
              width: "150px",
              height: "50px",
              backgroundColor: "#F5F5F5",
              borderRadius: "20px",
              color: "rgba(0,0,0,0.75)",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: "semi-bold",
              alignSelf: "flex-end",
              marginLeft: "auto",
              marginRight: "20px",
              marginBottom: "10px",
              border: "none",
              textTransform: "none",
            }}
            // component={Link}
            // to="/homeworks-per-lecture"
          >
            {" "}
            See
          </Button>

          <Button
            variant="contained"
            endIcon={<DeleteIcon />}
            sx={{
              width: "150px",
              height: "50px",
              backgroundColor: "#F5F5F5",
              borderRadius: "20px",
              color: "rgba(0,0,0,0.75)",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: "semi-bold",
              alignSelf: "flex-end",
              marginLeft: "auto",
              marginRight: "20px",
              marginBottom: "10px",
              border: "none",
              textTransform: "none",
            }}
            // component={Link}
            // to="/homeworks-per-lecture"
          >
            {" "}
            Delete
          </Button>
          <Button
            variant="contained"
            endIcon={<CreateOutlinedIcon />}
            sx={{
              width: "150px",
              height: "50px",
              backgroundColor: "#F5F5F5",
              borderRadius: "20px",
              color: "rgba(0,0,0,0.75)",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: "semi-bold",
              alignSelf: "flex-end",
              marginLeft: "auto",
              marginRight: "20px",
              marginBottom: "10px",
              border: "none",
              textTransform: "none",
            }}
            // component={Link}
            // to="/homeworks-per-lecture"
          >
            {" "}
            Edit
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
}

function TeachersButtons() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        display: "flex",
        width: isSmallScreen ? "100%" : "250px",
        height: isSmallScreen ? "50%" : "300px",
        backgroundColor: "#FAFAF5",
        borderRadius: "24px",
        alignSelf: "center",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CardContent
          sx={{
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p>Teachers</p>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            sx={{
              width: "150px",
              height: "50px",
              backgroundColor: "#F5F5F5",
              borderRadius: "20px",
              color: "rgba(0,0,0,0.75)",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: "semi-bold",
              alignSelf: "flex-end",
              marginLeft: "auto",
              marginRight: "20px",
              marginBottom: "10px",
              border: "none",
              textTransform: "none",
            }}
            // component={Link}
            // to="/materials-per-lecture"
          >
            {" "}
            Create
          </Button>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            sx={{
              width: "150px",
              height: "50px",
              backgroundColor: "#F5F5F5",
              borderRadius: "20px",
              color: "rgba(0,0,0,0.75)",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: "semi-bold",
              alignSelf: "flex-end",
              marginLeft: "auto",
              marginRight: "20px",
              marginBottom: "10px",
              border: "none",
              textTransform: "none",
            }}
            // component={Link}
            // to="/materials-per-lecture"
          >
            {" "}
            Upload
          </Button>
          <Button
            variant="contained"
            endIcon={<RemoveRedEyeOutlinedIcon />}
            sx={{
              width: "150px",
              height: "50px",
              backgroundColor: "#F5F5F5",
              borderRadius: "20px",
              color: "rgba(0,0,0,0.75)",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: "semi-bold",
              alignSelf: "flex-end",
              marginLeft: "auto",
              marginRight: "20px",
              marginBottom: "10px",
              border: "none",
              textTransform: "none",
            }}
            // component={Link}
            // to="/homeworks-per-lecture"
          >
            {" "}
            See
          </Button>

          <Button
            variant="contained"
            endIcon={<DeleteIcon />}
            sx={{
              width: "150px",
              height: "50px",
              backgroundColor: "#F5F5F5",
              borderRadius: "20px",
              color: "rgba(0,0,0,0.75)",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: "semi-bold",
              alignSelf: "flex-end",
              marginLeft: "auto",
              marginRight: "20px",
              marginBottom: "10px",
              border: "none",
              textTransform: "none",
            }}
            // component={Link}
            // to="/homeworks-per-lecture"
          >
            {" "}
            Delete
          </Button>
          <Button
            variant="contained"
            endIcon={<CreateOutlinedIcon />}
            sx={{
              width: "150px",
              height: "50px",
              backgroundColor: "#F5F5F5",
              borderRadius: "20px",
              color: "rgba(0,0,0,0.75)",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: "semi-bold",
              alignSelf: "flex-end",
              marginLeft: "auto",
              marginRight: "20px",
              marginBottom: "10px",
              border: "none",
              textTransform: "none",
            }}
            // component={Link}
            // to="/homeworks-per-lecture"
          >
            {" "}
            Edit
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
}

function MainPageAdmin() {
  return (
    <div>
      <Header />
      <UpperHeader title="Admin" subtitle="date" />

      <div className={styles.main}>
        <div className={styles.buttons}>
          <StudentsButtons />
          <TeachersButtons />
        </div>
        <div className={styles.calendarContainer}>
          <div className={styles.calendar}>
            <MyCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPageAdmin;
