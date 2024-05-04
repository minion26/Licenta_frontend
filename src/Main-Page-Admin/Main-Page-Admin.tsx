import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import styles from "./Main-Page-Admin.module.css";
// import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AddIcon from "@mui/icons-material/Add";
import {Link} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Swal from "sweetalert2";

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
          <p className={styles.title}>Students</p>
            <Tooltip title={"Create a new student account"}>
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
                component={Link}
                to="/create-students-admin"
              >
                {" "}
                Create
              </Button>
            </Tooltip>

            <Tooltip title={"Upload a file of students"}>
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
                component={Link}
                to="/upload-students-admin"
              >
                {" "}
                Upload
              </Button>
            </Tooltip>

            <Tooltip title={"See all students"}>
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
                component={Link}
                to="/see-students-admin"
              >
                {" "}
                See
              </Button>
            </Tooltip>

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
          <p className={styles.title}>Teachers</p>
            <Tooltip title={"Create a new teacher account"}>
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
                component={Link}
                to="/create-teachers-admin"
              >
                {" "}
                Create
              </Button>
            </Tooltip>

            <Tooltip title={"Upload a file of teachers"}>
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
                component={Link}
                to="/upload-teachers-admin"
              >
                {" "}
                Upload
              </Button>
            </Tooltip>

            <Tooltip title={"See all teachers"}>
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
                component={Link}
                to="/see-teachers-admin"
              >
                {" "}
                See
              </Button>
            </Tooltip>


        </CardContent>
      </Box>
    </Card>
  );
}

function AdminsButtons() {
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
                    <p className={styles.title}>Admins</p>
                    <Tooltip title={"Create a new admin account"}>
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
                            component={Link}
                            to="/create-admins"
                        >
                            {" "}
                            Create
                        </Button>
                    </Tooltip>

                    {/*<Button*/}
                    {/*    variant="contained"*/}
                    {/*    endIcon={<DeleteIcon />}*/}
                    {/*    sx={{*/}
                    {/*        width: "150px",*/}
                    {/*        height: "50px",*/}
                    {/*        backgroundColor: "#F5F5F5",*/}
                    {/*        borderRadius: "20px",*/}
                    {/*        color: "rgba(0,0,0,0.75)",*/}
                    {/*        fontFamily: "Inter",*/}
                    {/*        fontSize: "12px",*/}
                    {/*        fontWeight: "semi-bold",*/}
                    {/*        alignSelf: "flex-end",*/}
                    {/*        marginLeft: "auto",*/}
                    {/*        marginRight: "20px",*/}
                    {/*        marginBottom: "10px",*/}
                    {/*        border: "none",*/}
                    {/*        textTransform: "none",*/}
                    {/*    }}*/}
                    {/*    // component={Link}*/}
                    {/*    // to="/homeworks-per-lecture"*/}

                    {/*    onClick={() => {*/}
                    {/*        Swal.fire({*/}
                    {/*            title: "Are you sure?",*/}
                    {/*            text: "You won't be able to revert this!",*/}
                    {/*            icon: "warning",*/}
                    {/*            showCancelButton: true,*/}
                    {/*            confirmButtonColor: "#3085d6",*/}
                    {/*            cancelButtonColor: "#d33",*/}
                    {/*            confirmButtonText: "Yes, delete it!"*/}
                    {/*        }).then((result) => {*/}
                    {/*            if (result.isConfirmed) {*/}
                    {/*                Swal.fire({*/}
                    {/*                    title: "Deleted!",*/}
                    {/*                    text: "The account has been deleted.",*/}
                    {/*                    icon: "success"*/}
                    {/*                });*/}
                    {/*                // Here you can add the code to actually delete the student*/}
                    {/*            }*/}
                    {/*        });*/}
                    {/*    }}*/}

                    {/*>*/}
                    {/*    Delete your account*/}
                    {/*</Button>*/}

                </CardContent>
            </Box>
        </Card>
    );
}


function CoursesButtons() {
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
                    <p className={styles.title}>Courses</p>
                    <Tooltip title={"Create a new course"}>
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
                            component={Link}
                            to="/create-course"
                        >
                            {" "}
                            Create
                        </Button>
                    </Tooltip>

                    <Tooltip title={"Upload a file of courses"}>
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
                            component={Link}
                            to="/upload-courses"
                        >
                            {" "}
                            Upload
                        </Button>
                    </Tooltip>

                    <Tooltip title={"Add a teacher to a course"}>
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
                            component={Link}
                            to="/add-teacher-to-course"
                        >
                            {" "}
                            Add
                        </Button>
                    </Tooltip>

                    <Tooltip title={"See all courses"}>
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
                            component={Link}
                            to="/see-courses"
                        >
                            {" "}
                            See
                        </Button>
                    </Tooltip>

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
{/*TODO: make it responsive*/}
      <div className={styles.main}>
        <div className={styles.buttons}>
          <StudentsButtons />
          <TeachersButtons />
            <AdminsButtons />
            <CoursesButtons />
        </div>
        {/*<div className={styles.calendarContainer}>*/}
        {/*  <div className={styles.calendar}>*/}
        {/*    <MyCalendar />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

export default MainPageAdmin;
