import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useParams} from "react-router-dom";
import {HomeworkAnnouncements} from "../types.ts";
import {useEffect, useState} from "react";
import {DatePicker} from "rsuite";

function EditHomeworkAnnouncementsTeacher() {
    const {idHomeWorkAnnouncement} = useParams();
    const [homeworkAnnouncement, setHomeworkAnnouncement] = useState<HomeworkAnnouncements>({
        idHomeworkAnnouncement: '',
        title: '',
        description: '',
        dueDate: null,
        score: 0,
        idLecture: '',
        idTeacher: '',
    });

    const [homeworkAnnouncementBackup, setHomeworkAnnouncementBackup] = useState<HomeworkAnnouncements>({
        idHomeworkAnnouncement: '',
        title: '',
        description: '',
        dueDate: null,
        score: 0,
        idLecture: '',
        idTeacher: '',
    });

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/homework-announcements/idHomeworkAnnouncement=${idHomeWorkAnnouncement}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                // "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message);
                    });
                }

                return response.json();
            })
            .then((data) => {
                setHomeworkAnnouncement(data);
                setHomeworkAnnouncementBackup(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: error.message || 'An error occurred',
                    showConfirmButton: false,
                    // timer: 1500
                });
            });
    }, [idHomeWorkAnnouncement]);

    function handleInputChange(property: keyof HomeworkAnnouncements, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const newValue = event.target.value;
        setHomeworkAnnouncement({
            ...homeworkAnnouncement,
            [property]: newValue,
        });

    }

    function handleCancel(){
        setHomeworkAnnouncement(homeworkAnnouncementBackup);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // const homeworkAnnouncementToSend = {
            //     ...homeworkAnnouncement,
            //     dueDate: homeworkAnnouncement.dueDate ? new Date(homeworkAnnouncement.dueDate).toISOString() : null,
            // };
            //
            // console.log(homeworkAnnouncementToSend);

            const response = await fetch(`http://localhost:8081/api/v1/homework-announcements/update/idHomeworkAnnouncement=${idHomeWorkAnnouncement}`, {
                method: "PATCH",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(homeworkAnnouncement),
            });
            if (response.ok) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "The details have been saved",
                    showConfirmButton: false,
                    timer: 1500
                });

                if (response.headers.get("content-type")?.includes("application/json")) {
                    const data = await response.json();
                    console.log(data);
                }
            } else {
                const errorData = await response.json();
                await Swal.fire({
                    icon: 'error',
                    title: errorData.message || 'An error occurred',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <form onSubmit={handleSubmit}>
            <Header/>
            <UpperHeader title={"Edit " + homeworkAnnouncement.title} subtitle={"date"}/>
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
                        value={homeworkAnnouncement.title}
                        name={"title"}
                        onChange={(event) => handleInputChange("title", event)}
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
                        value={homeworkAnnouncement.description}
                        name={"description"}
                        onChange={(event) => handleInputChange("description", event)}
                    />


                    <DatePicker
                        size="lg"
                        placeholder="Select Due Date"
                        style={{ width: "200px",
                            height: "80px",
                            margin: 1,
                            marginBottom: "20px"
                        }}
                        value={homeworkAnnouncement.dueDate ? new Date(homeworkAnnouncement.dueDate) : undefined}
                        name={"dueDate"}
                        onChange={(value) => {
                            if (value) {
                                const offset = value.getTimezoneOffset();
                                const localISOTime = (new Date(value.getTime() - (offset * 60 * 1000))).toISOString().slice(0, -1);
                                setHomeworkAnnouncement({...homeworkAnnouncement, dueDate: localISOTime})
                                console.log("new date:", localISOTime)
                            }

                        }}

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
                        value={homeworkAnnouncement.score}
                        name={"score"}
                        onChange={(event) => handleInputChange("score", event)}

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
                        <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                        <Button
                            variant="contained"
                            type={"submit"}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Box>
        </form>
    );
}

export default EditHomeworkAnnouncementsTeacher;