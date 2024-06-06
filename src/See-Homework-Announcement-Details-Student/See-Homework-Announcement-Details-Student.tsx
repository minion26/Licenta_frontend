import {Link, useParams} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {HomeworkAnnouncements} from "../types.ts";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Buttons({idHomeworkAnnouncement}: {idHomeworkAnnouncement: string | undefined}){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (<div>
            <Card sx={{
                display: 'flex',
                width: isSmallScreen ? '100%' : '220px',
                height: isSmallScreen ? '50%' : '170px',
                backgroundColor: "#FAFAF5",
                borderRadius: '24px',
                alignSelf: 'center',
                flexDirection: 'center',
                justifyContent: 'center', // Centrare pe axa orizontală
                alignItems: 'center' // Centrare pe axa verticală

            }}>
                <Box sx={{
                    display: 'flex',
                    // flexWrap:'wrap'
                    justifyContent: 'center', // Centrare pe axa orizontală
                    alignItems: 'center' // Centrare pe axa verticală
                }}
                >
                    <CardContent sx={{
                        flex: '1 0 auto',
                        display: 'flex',
                        flexDirection: 'center',
                        justifyContent: 'center', // Centrare pe axa orizontală
                        alignItems: 'center' // Centrare pe axa verticală
                    }}>

                        <Button
                            variant="contained"
                            endIcon={<AddCircleIcon/>}
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
                            to={`/add-homework/${idHomeworkAnnouncement}`}
                        > Add Homework
                        </Button>

                    </CardContent>
                </Box>
            </Card>

        </div>
    );
}


function SeeHomeworkAnnouncementDetailsStudent() {
    const {idHomeworkAnnouncement} = useParams();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [homework, setHomework] = useState<HomeworkAnnouncements>({
        idHomeworkAnnouncement: '',
        idLecture: '',
        dueDate: '',
        description: '',
        title: '',
        idTeacher: '',
        score: 0,
    });

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/homework-announcements/idHomeworkAnnouncement=${idHomeworkAnnouncement}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then((error) => {
                        throw new Error(error.message);
                    });
                }
                return response.json();
            })
            .then(data => {
                setHomework(data);

            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }, []);

    return (
        <div>
            <Header/>
            <UpperHeader title={"Homework"} subtitle={homework ? homework.title : ""}/>
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
                        sx={{m: 1, width: "25ch", marginBottom: "20px"}}
                        value={homework.title}
                    />


                    <TextField
                        sx={{ m: 1, marginBottom: "20px" }}
                        fullWidth
                        label="Description"
                        id="description"
                        value={homework.description}
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

                        value={homework.score}

                    />

                </Box>
                <Buttons idHomeworkAnnouncement={idHomeworkAnnouncement}/>
            </Box>

        </div>
    );
}

export default SeeHomeworkAnnouncementDetailsStudent;