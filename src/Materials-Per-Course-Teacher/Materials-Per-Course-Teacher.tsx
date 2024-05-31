import styles from "./Materials-Per-Course-Teacher.module.css";
import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardLarge from "../Card-Large/Card-Large.tsx";
import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Button from "@mui/material/Button";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {Link, useParams} from "react-router-dom";
import {Lecture, LectureCreation} from "../types.ts";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";


function Buttons({idLectures, idCourses}: {idLectures: string | undefined, idCourses: string | undefined}) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [updateLecture, setUpdateLecture] = useState<LectureCreation>({
        name: '',
        description: '',
        week: 0,
    });


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8081/api/v1/lectures/${idLectures}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                },

            });
            const data = await response.json();
            setUpdateLecture(data);

        };
        fetchData();
    }, []);

    function handleChange( event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const newValue = event.target.value;
        setUpdateLecture({
            ...updateLecture,
            [event.target.name]: newValue
        });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handlePatch();
        handleClose();
    }


    const handlePatch = async () => {
        const response = await fetch(`http://localhost:8081/api/v1/lectures/update/${idLectures}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(updateLecture),
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

   return ( <div>
       <Card sx={{ display: 'flex',
        width: isSmallScreen ? '100%' : '400px',
        height: isSmallScreen ? '50%' : '220px',
        backgroundColor: "#FAFAF5",
        borderRadius: '24px',
           alignSelf: 'center',

        }}>
            <Box sx={{
                display: 'flex',
                // flexWrap:'wrap'
            }}
            >
                <CardContent sx={{ flex: '1 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
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
                        to={`/add-materials-per-lecture/${idLectures}`}
                    > Add Materials
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
                            alignSelf: 'flex-end',
                            marginLeft: 'auto',
                            marginRight: '20px',
                            marginBottom: '10px',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        component={Link}
                        to={`/delete-materials-per-lecture/${idLectures}`}

                    > Delete Materials
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
                            alignSelf: 'flex-end',
                            marginLeft: 'auto',
                            marginRight: '20px',
                            marginBottom: '10px',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        component={Link}
                        to={`/add-homework-announcement/${idCourses}/${idLectures}`}
                    > Add Homework
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
                            alignSelf: 'flex-end',
                            marginLeft: 'auto',
                            marginRight: '20px',
                            marginBottom: '10px',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        component={Link}
                        to={`/see-homework-announcement/${idCourses}/${idLectures}`}
                    > Edit Homework
                    </Button>
                    <Button
                        variant="contained"
                        endIcon={<RemoveRedEyeOutlinedIcon />}
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
                        to={`/homeworks-per-lecture/${idCourses}/${idLectures}`}
                    > See Homework
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
                            alignSelf: 'flex-end',
                            marginLeft: 'auto',
                            marginRight: '20px',
                            marginBottom: '10px',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        onClick={handleClickOpen}
                    > Edit Week
                    </Button>
                </CardContent>
            </Box>
        </Card>
           <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
               <DialogTitle id="form-dialog-title">Edit Week</DialogTitle>
               <form onSubmit={handleSubmit}>
                   <DialogContent>
                       <DialogContentText>
                           To edit the week of lectures, please update the desired inputs.
                       </DialogContentText>
                       <TextField
                           autoFocus
                           margin="dense"
                           id="name"
                           label="Name"
                           name={"name"}
                           type="text"
                           value={updateLecture.name}
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
                           value={updateLecture.description}
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
                           value={updateLecture.week}
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

           {/*<Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="delete-dialog-title">*/}
           {/*    <DialogTitle id="delete-dialog-title">Delete File</DialogTitle>*/}
           {/*    <DialogContent>*/}
           {/*        <DialogContentText>*/}
           {/*            To delete a file, please select the file from the dropdown list and click the delete button.*/}
           {/*        </DialogContentText>*/}
           {/*        <Select*/}
           {/*            value={selectedFile}*/}
           {/*            onChange={(event) => setSelectedFile(event.target.value)}*/}
           {/*        >*/}
           {/*            /!* Replace this with your actual list of files *!/*/}
           {/*            <MenuItem value={"file1"}>File 1</MenuItem>*/}
           {/*            <MenuItem value={"file2"}>File 2</MenuItem>*/}
           {/*            <MenuItem value={"file3"}>File 3</MenuItem>*/}
           {/*        </Select>*/}
           {/*    </DialogContent>*/}
           {/*    <DialogActions>*/}
           {/*        <Button onClick={handleCloseDelete} color="primary">*/}
           {/*            Cancel*/}
           {/*        </Button>*/}
           {/*        <Button color="primary" type="submit">*/}
           {/*            Delete*/}
           {/*        </Button>*/}
           {/*    </DialogActions>*/}
           {/*</Dialog>*/}
       </div>
   );
}


function MaterialsPerCourseTeacher() {
    const {idCourses, idLectures} = useParams();
    const [lecture, setLecture] = useState<Lecture>();
    // const [course, setCourse] = useState<Course>();
    const [materialType, setMaterialType] = useState<string[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8081/api/v1/lectures/${idLectures}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                },

            });
            const data = await response.json();
            setLecture(data);
        };
        fetchData();
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch(`http://localhost:8081/api/v1/courses/${idCourses}`, {
    //             method: 'GET',
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 "Access-Control-Allow-Origin": "*",
    //             },
    //
    //         });
    //         const data = await response.json();
    //         setCourse(data);
    //     };
    //     fetchData();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch(`http://localhost:8081/api/v1/materials/get-type/idLecture=${idLectures}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    },
                });
                const data = await response.json();
                console.log("material type: " , data);
                setMaterialType(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();

    }, []);


    return (
    <div>
        <Header />
        <UpperHeader title={lecture ? lecture.name : ""} subtitle={lecture ? lecture.description : ""}/>
        <div className={styles.container}>

            {
               materialType.includes("course") &&
                <Link to={`/view-course-teacher/${idCourses}/${idLectures}/course`} className={styles.noDecoration}>
                    <CardLarge title="Course Materials" cardIndex={1} />
                </Link>
            }

            {
                materialType.includes("auxiliar") &&
                <Link to={`/view-course-teacher/${idCourses}/${idLectures}/auxiliar`} className={styles.noDecoration}>
                    <CardLarge title="Auxiliar" cardIndex={3} />
                </Link>
            }

            {
                materialType.includes("video") &&
                <Link to={`/view-course-teacher/${idCourses}/${idLectures}/video`} className={styles.noDecoration}>
                    <CardLarge title="Video" cardIndex={2} />
                </Link>
            }

            <Buttons idLectures={idLectures} idCourses={idCourses}/>


        </div>
    </div>
  );
}

export default MaterialsPerCourseTeacher;