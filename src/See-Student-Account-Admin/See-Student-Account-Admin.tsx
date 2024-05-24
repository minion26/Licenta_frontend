import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Card from "@mui/material/Card";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

function SeeStudentAccountAdmin(){
    const {idUsers} = useParams();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/students/${idUsers}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                    console.log(data);
            })
            .catch(error => console.error('An error occured!', error));

    }, [idUsers]);

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
                    value={"Jitca"}
                />
                <TextField
                    label="Last Name"
                    id="outlined-start-adornment-lastname"
                    sx={{ m: 1,width: "25ch" , marginBottom: "20px" }}
                    InputLabelProps={{ shrink: true }}
                    value={"Diana"}
                />
                <TextField
                    sx={{ m: 1, marginBottom: "20px", width: "40ch" }}
                    fullWidth
                    label="Faculty Email"
                    id="fullWidth-faculty-email"
                    InputLabelProps={{ shrink: true }}
                    value={"jtc.didi@uaic.ro"}
                />
                <TextField
                    sx={{ m: 1, marginBottom: "20px", width: "40ch" }}
                    fullWidth
                    label="Personal Email"
                    id="fullWidth-personal-email"
                    InputLabelProps={{ shrink: true }}
                    value={"jtc.didi@personal.com"}
                />

                <TextField
                    label="Number Matricol"
                    id="outlined-start-adornment-nr-matricol"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    value={"123456"}
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
                    value={"3"}
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
                    value={"2"}
                />

                <TextField
                    label="Group"
                    id="outlined-start-adornment-group"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    InputLabelProps={{ shrink: true }}
                    value={"A4"}
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

export default SeeStudentAccountAdmin;