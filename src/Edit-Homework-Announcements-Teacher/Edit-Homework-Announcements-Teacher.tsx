import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function EditHomeworkAnnouncementsTeacher() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <div>
            <Header/>
            <UpperHeader title={"Edit Homework Announcemet"} subtitle={"date"}/>
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
                        label="Title"
                        id="outlined-start-adornment-title"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    />
                    {/*<TextField*/}
                    {/*    label="Last Name"*/}
                    {/*    id="outlined-start-adornment-lastname"*/}
                    {/*    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}*/}
                    {/*/>*/}

                    <TextField
                        sx={{ m: 1, marginBottom: "20px" }}
                        fullWidth
                        label="Description"
                        id="description"
                    />




                    <TextField
                        id="outlined-score"
                        label="Score"
                        type="number"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: 1,
                            max: 100,
                        }}

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
                                    title: "The announcement has been saved",
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

export default EditHomeworkAnnouncementsTeacher;