
import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Card from "@mui/material/Card";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";

function SeeTeacherAccountAdmin(){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div>
            <Header/>
            <UpperHeader title={"See account"} subtitle={"Jitca Diana"}/>
            <Card
                sx={{
                    // marginLeft: isSmallScreen ? "0px" : "200px",
                    // marginTop: "10px",
                    // display: "flex",
                    // flexDirection: "column",
                    // width: isSmallScreen ? "100%" : "50%",
                    // height: isSmallScreen ? "50%" : "auto",
                    // backgroundColor: "#FAFAF5",
                    // borderRadius: "24px",
                    // alignSelf: "center",

                    display: "flex",
                    // flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginLeft: isSmallScreen ? "0px" : "200px",
                    marginTop: "20px",
                    width: "75%",
                }}
            >
                <TextField
                    label="First Name"
                    id="outlined-start-adornment-firstname"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    InputLabelProps={{ shrink: true }}
                    value={"Alice"}
                />
                <TextField
                    label="Last Name"
                    id="outlined-start-adornment-lastname"
                    sx={{ m: 1,width: "25ch" , marginBottom: "20px" }}
                    InputLabelProps={{ shrink: true }}
                    value={"Johnson"}
                />
                <TextField
                    sx={{ m: 1, marginBottom: "20px", width: "40ch" }}
                    fullWidth
                    label="Faculty Email"
                    id="fullWidth-faculty-email"
                    InputLabelProps={{ shrink: true }}
                    value={"alice.johnson@faculty.com"}
                />
                <TextField
                    sx={{ m: 1, marginBottom: "20px", width: "40ch" }}
                    fullWidth
                    label="Personal Email"
                    id="fullWidth-personal-email"
                    InputLabelProps={{ shrink: true }}
                    value={"alice.johnson@gmail.com"}
                />

                <TextField
                    label="Id Teacher"
                    id="outlined-start-adornment-id-teacher"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    value={"1234"}
                />

                <TextField
                    label="Degree"
                    id="outlined-start-adornment-degree"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    value={"profesor de curs"}
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
                                title: "The details have been saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }}
                    >
                        Save
                    </Button>
                </Box>

            </Card>

        </div>
    );
}

export default SeeTeacherAccountAdmin;