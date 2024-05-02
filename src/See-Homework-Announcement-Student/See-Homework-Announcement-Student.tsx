import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import {Link} from "react-router-dom";

function Buttons(){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return ( <Card sx={{ display: 'flex',
            width: isSmallScreen ? '100%' : '250px',
            height: isSmallScreen ? '50%' : '100px',
            backgroundColor: "#FAFAF5",
            borderRadius: '24px',
            alignSelf: 'center',
            justifyContent: 'center',

        }}>
            <Box sx={{ display: 'flex', }}>
                <CardContent sx={{ flex: '1 0 auto',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Button
                        variant="contained"
                        endIcon={<CreateOutlinedIcon />}
                        sx={{
                            width: '150px',
                            height: '50px',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '20px',
                            color: 'rgba(0,0,0,0.75)',
                            fontFamily: 'Inter',
                            fontSize: '12px',
                            fontWeight: 'semi-bold',
                            alignSelf: 'flex-end',
                            marginLeft: 'auto',
                            marginRight: '20px',
                            marginBottom: '10px',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        component={Link}
                        to="/add-homework-student"
                    > Add Homework
                    </Button>

                </CardContent>
            </Box>
        </Card>
    );
}



function SeeHomeworkAnnouncementStudent() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div>
            <Header />
            <UpperHeader title={"Homework Announcement"} subtitle={"date"}/>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
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
                        value={"titlu tema 1"}
                    />


                    <TextField
                        sx={{ m: 1, marginBottom: "20px" }}
                        fullWidth
                        label="Description"
                        id="description"
                        value={"descriere tema 1"}
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

                        value={"100"}

                    />

                </Box>
<Buttons/>
            </Box>

        </div>
    );
}

export default SeeHomeworkAnnouncementStudent;