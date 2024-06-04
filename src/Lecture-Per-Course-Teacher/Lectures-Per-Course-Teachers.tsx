import styles from "./Lectures-Per-Course-Teachers.module.css";
import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
// import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';// import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {Link, useParams} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useEffect, useState} from "react";
import {Course, Lecture, LectureCreation} from "../types.ts";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import Swal from "sweetalert2";


function Buttons({ idCourses }: { idCourses: string | undefined}){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [createLecture, setCreateLecture] = useState<LectureCreation>({
        name: '',
        description: '',
        week: 0,
    });

    const handleSubmit =  (event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();


        handlePOST();
        handleClose();
    };

    const handleChange = (e :  React.ChangeEvent<HTMLInputElement> ) => {
        const value = e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
        setCreateLecture({
            ...createLecture,
            [e.target.name]: value
        });
    };

    const handlePOST = async () => {
        const response = await fetch(`http://localhost:8081/api/v1/lectures/create/${idCourses}`, {
            method: "POST",
            credentials : 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(createLecture),
        });

        if (response.ok) {
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

        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something went wrong",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }


    return (
        <div>
        <Card sx={{ display: 'flex',
            width: isSmallScreen ? '100%' : '250px',
            height: isSmallScreen ? '50%' : '200px',
            backgroundColor: "#FAFAF5",
            borderRadius: '24px',
            alignSelf: 'center',
            justifyContent: 'center',

        }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CardContent sx={{
                    flex: '1 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
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
                            border: 'none',
                            textTransform: 'none',
                        }}
                        onClick={handleClickOpen}
                    > Create Week
                    </Button>

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
                            border: 'none',
                            textTransform: 'none',
                        }}
                        component={Link}
                        to="/create-test"
                    > Create Test
                    </Button>

                    <Button
                        variant="contained"
                        endIcon={<VisibilityIcon />}
                        sx={{
                            width: '150px',
                            height: '50px',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '20px',
                            color: 'rgba(0,0,0,0.75)',
                            fontFamily: 'Inter',
                            fontSize: '12px',
                            fontWeight: 'semi-bold',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        component={Link}
                        to={`/see-tests/${idCourses}`}
                    > See Tests
                    </Button>



                </CardContent>
            </Box>
        </Card>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Week</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            To create a new week, please enter the name, description and week number here.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            name={"name"}
                            type="text"
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="Description"
                            name={"description"}
                            type="text"
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            margin="dense"
                            id="week"
                            label="Week Number"
                            type="number"
                            name={"week"}
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
    );
}




function LecturesPerCourseTeachers(){
    const {idCourses} = useParams();
    const [course, setCourse] = useState<Course>({
        idCourses: '',
        name: '',
        year: 0,
        semester: 0,
        credits: 0,
        description: '',
    });

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/v1/courses/${idCourses}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    },
                });

                if(!response.ok){
                    const err = await response.json();
                    console.error('Error:', err.message);
                    Swal.fire({
                        icon: 'error',
                        title: err.message || 'An error occurred',
                        showConfirmButton: false,
                        // timer: 1500
                    });

                    setHasError(true);
                }else{
                    const data = await response.json();
                    console.log(data);
                    setCourse(data);
                }

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [idCourses]);

    const [lectures, setLectures] = useState<Lecture[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/v1/lectures/idCourses=${idCourses}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    },
                });

                if(!response.ok) {
                    const err = await response.json();
                    console.error('Error:', err.message);
                    Swal.fire({
                        icon: 'error',
                        title: err.message || 'An error occurred',
                        showConfirmButton: false,
                        // timer: 1500
                    });

                    setHasError(true);
                }else{
                    const data = await response.json();
                    console.log(data);
                    setLectures(data);
                }

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [idCourses]);

    return (
        <div>
            <Header />
            <UpperHeader title={course.name} subtitle=""/>
            <div className={styles.container}>
                {   lectures.length === 0 ?
                    <CardElongated title="No lectures added yet" cardIndex={0}/>
                    : (
                    lectures.map((lecture, index) => (
                        <CardElongated key={index} title={lecture.name}  cardIndex={index + 1}>
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
                                    marginBottom: '50px',
                                    border: 'none',
                                    textTransform: 'none',
                                }}
                                component={Link}
                                to={`/materials-per-lecture/${idCourses}/${lecture.idLecture}`}
                            > Add Materials
                            </Button>

                        </CardElongated>

                    )))

                }
                {
                    !hasError && (
                        <Buttons idCourses={idCourses} />
                    )
                }


            </div>
        </div>
    );
}

export default LecturesPerCourseTeachers;


