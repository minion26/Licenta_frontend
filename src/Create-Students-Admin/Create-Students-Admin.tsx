import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header-admin/Header-admin";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
// import styles from "./Create-Students-Admin.module.css";


function CreateStudentsAdmin(){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <div>
            <Header />
            <UpperHeader title={"Create accounts"} subtitle={"Students"}/>
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
                    label="Faculty Email"
                    id="fullWidth"
                />

                <TextField
                    sx={{ m: 1, marginBottom: "20px" }}
                    fullWidth
                    label="Personal Email"
                    id="fullWidth"
                />


                <TextField
                    label="Number Matricol"
                    id="outlined-start-adornment-nr-matricol"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                />

                <TextField
                    id="outlined-number"
                    label="Year of study"
                    type="number"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 1,
                        max: 3,
                    }}
                />

                <TextField
                    id="outlined-number-semester"
                    label="Semester"
                    type="number"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 1,
                        max: 2,
                    }}
                />

                <TextField
                    label="Group"
                    id="outlined-start-adornment-group"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                />


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
                    <Button
                        variant="contained"
                        onClick={() => {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "The account has been saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
            </Box>
        </div>
    );
}

export default CreateStudentsAdmin;