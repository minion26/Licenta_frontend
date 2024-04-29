import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
// import {useTheme} from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import styles from "../Courses-Page-Students/Courses-Page-Students.module.css";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';


function SeeTeachersAdmin() {
    // const theme = useTheme();
    // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div>
            <Header/>
            <UpperHeader title={"See accounts"} subtitle={"Teachers"} buttons={[{ key: "Search", label: "Search" }]}/>
            <div className={styles.cardContainer}>
                <CardElongated title={"Alice Johnson"} cardIndex={1} height={100}>
                    <Box sx={{ display: "flex" }}>
                        <CardContent
                            sx={{
                                flex: "1 0 auto",
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <Button
                                variant="contained"
                                endIcon={<DeleteIcon />}
                                sx={{
                                    width: "50px",
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

                                onClick={() => {
                                    Swal.fire({
                                        title: "Are you sure?",
                                        text: "You won't be able to revert this!",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Yes, delete it!"
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            Swal.fire({
                                                title: "Deleted!",
                                                text: "The account has been deleted.",
                                                icon: "success"
                                            });
                                            // Here you can add the code to actually delete the student
                                        }
                                    });
                                }}

                            >
                            </Button>
                            <Button
                                variant="contained"
                                endIcon={<CreateOutlinedIcon />}
                                sx={{
                                    width: "50px",
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
                                to="/see-teacher-account-admin"
                            >
                            </Button>
                        </CardContent>
                    </Box>
                </CardElongated>
            </div>
            {/*<h2>Jitca Diana</h2>*/}
            {/*<p>Faculty Email: jtc.didi@uaic.ro</p>*/}
            {/*<p>Personal Email: jtc.didi@personal.com</p>*/}
            {/*<p>Matriculation Number: 123456</p>*/}
            {/*<p>Year of Study: 3</p>*/}
            {/*<p>Semester: 2</p>*/}
            {/*<p>Group of Study: A4</p>*/}
            {/*<p>Enrollment Date: 2023-09-01T00:00:00</p>*/}

        </div>
    );
}

export default SeeTeachersAdmin;