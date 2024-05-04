import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

function CreateCourseAdmin(){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <div>
            <Header />
            <UpperHeader title={"Create course"} subtitle={"date"}/>
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
                        label="Name"
                        id="outlined-start-adornment-name"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    />
                    <TextField
                        label="Year"
                        id="outlined-start-adornment-year"
                        type="number"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    />

                    <TextField
                        id="outlined-credits"
                        label="Credits"
                        type="number"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: 1,
                            max: 6,
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
                        sx={{ m: 1, marginBottom: "20px" }}
                        fullWidth
                        label="Descprition"
                        id="description"
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
                                    title: "The course has been saved",
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

export default CreateCourseAdmin;