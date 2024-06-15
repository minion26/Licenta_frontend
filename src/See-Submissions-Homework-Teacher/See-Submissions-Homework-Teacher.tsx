import {Link, useParams} from "react-router-dom";
import {Homework, HomeworkAnnouncements, HomeworkGrade} from "../types.ts";
import {useEffect, useState} from "react";
import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import styles from './See-Submissions-Homework-Teacher.module.css';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Swal from "sweetalert2";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

function SeeSubmissionsHomeworkTeacher() {
    const {idHomeworkAnnouncement} = useParams();
    const [homeworkAnn, setHomeworkAnn] = useState<HomeworkAnnouncements>();

    const [homeworks, setHomeworks] = useState<Homework[]>([]);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/homework-announcements/idHomeworkAnnouncement=${idHomeworkAnnouncement}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setHomeworkAnn(data);
                console.log(data);
            })
            .catch(error => console.error('An error occured!', error));

    }, []);


    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/homework/all/idHomeworkAnnouncement=${idHomeworkAnnouncement}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
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
            .then(data => {
                setHomeworks(data);
                console.log(data);
            })
            .catch(error => {
                console.error('An error occured!', error);
                Swal.fire({
                    icon: 'error',
                    title: error.message || 'An error occurred',
                    showConfirmButton: false,
                    // timer: 1500
                });
            });
    }, [idHomeworkAnnouncement]);

    useEffect(() => {
        for (let i = 0; i < homeworks.length; i++) {
            console.log(homeworks[i]);
        }
    }, []);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [grade, setGrade] = useState<HomeworkGrade>({
        grade: 0,
    });

    const handleSubmit = (idHomework: string) => (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handlePatch(idHomework);
        handleClose();
    }

    const handlePatch = async (idHomework: string) => {
        const response = await fetch(`http://localhost:8081/api/v1/homework/grade/idHomework=${idHomework}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(grade),
        });
        if (response.ok){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The lecture has been saved",
                showConfirmButton: false,
                timer: 1500
            });

            if (response.headers.get("content-type")?.includes("application/json")) {
                const data = await response.json();
                console.log(data);
            }

            window.location.reload();
        }else{
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something went wrong",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) {
        const newValue = event.target.value;
        setGrade({
            ...grade,
            [event.target.name]: newValue === "" ? "" : Number(newValue)
        });
    }


    return (
        <div>
           <Header/>
           <UpperHeader title={"See submissions"} subtitle={homeworkAnn ? homeworkAnn.title : ""} />
            <div className={styles.container}>
                {
                    homeworks.map(
                        (homework, index) => (
                            <div key={index}>
                            <CardElongated  title={`${homework.firstNameStudent} ${homework.lastNameStudent}`} description={"Grade : " + (homework ? (homework.grade!=-1 ? homework.grade : "not graded") : "")} cardIndex={index+1}>
                                <Box sx={{ display: "flex" }}>
                                        <Button
                                            variant="contained"
                                            endIcon={<CreateOutlinedIcon />}
                                            sx={{
                                                width: isSmallScreen ? '150px' : '175px',
                                                height: '50px',
                                                backgroundColor: '#F5F5F5',
                                                borderRadius: '20px',
                                                color: 'rgba(0,0,0,0.75)',
                                                fontFamily: 'Inter',
                                                fontSize: isSmallScreen ? '10px' : '12px',
                                                fontWeight: 'semi-bold',
                                                alignSelf: 'flex-end',
                                                marginTop: 'auto',
                                                marginLeft: '130px',
                                                marginRight: '20px',
                                                marginBottom: '50px',
                                                border: 'none',
                                                textTransform: 'none',
                                            }}
                                            component={Link}
                                            to={`/add-feedback/${idHomeworkAnnouncement}/${homework.idHomework}`}

                                        >
                                            Add feedback
                                        </Button>

                                    <Button
                                        variant="contained"
                                        endIcon={<CreateOutlinedIcon />}
                                        sx={{
                                            width: isSmallScreen ? '150px' : '175px',
                                            height: '50px',
                                            backgroundColor: '#F5F5F5',
                                            borderRadius: '20px',
                                            color: 'rgba(0,0,0,0.75)',
                                            fontFamily: 'Inter',
                                            fontSize: isSmallScreen ? '10px' : '12px',
                                            fontWeight: 'semi-bold',
                                            alignSelf: 'flex-end',
                                            marginTop: 'auto',
                                            marginLeft: '30px',
                                            marginRight: '20px',
                                            marginBottom: '50px',
                                            border: 'none',
                                            textTransform: 'none',
                                        }}
                                        // component={Link}
                                        // to={`/add-feedback/${homework.idHomework}`}
                                        onClick={handleClickOpen}
                                    >
                                        Give grade
                                    </Button>

                                </Box>
                            </CardElongated>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Grade</DialogTitle>
                <form onSubmit={handleSubmit(homework.idHomework)}>
                    <DialogContent>
                        <DialogContentText>
                            To give or edit a grade, please enter a value between 0 and 10.
                        </DialogContentText>

                        <TextField
                            margin="dense"
                            id="grade"
                            label="Grade"
                            inputProps={{
                                min: 0,
                                max: 10,
                            }}
                            type="number"
                            name={"grade"}
                            value={grade.grade}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
                            </div>
                    ))
                }

            </div>
        </div>
    );
}

export default SeeSubmissionsHomeworkTeacher;