import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Autocomplete} from "@mui/material";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useEffect, useState} from "react";

function EditTestTeacher(){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    // Starea pentru profesori
    // , setTeachers
    const [teachers] = useState<{ name: string }[]>([]);

    // Funcția pentru a prelua profesorii
    const fetchTeachers = async () => {
        // const response = await fetch(/* your server endpoint */);
        // const data = await response.json();
        // setTeachers(data);
    };

    // Folosiți useEffect pentru a prelua profesorii când componenta se încarcă
    useEffect(() => {
        fetchTeachers();
    }, []);
    return(
        <div>
            <Header/>
            <UpperHeader title={"Test 1"} subtitle={"date"} />
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
                        id="outlined-time-in-minutes"
                        label="Time in minutes"
                        type="number"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    />

                    <TextField
                        id="outlined-total-score"
                        label="Total Score"
                        type="number"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    />

                    <TextField
                        id="outlined-passing-score"
                        label="Passing Score"
                        type="number"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start'
                        }}
                    >
                        <TextField
                            id="outlined-date"
                            label="Date"
                            type="date"
                            sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <Autocomplete
                            multiple
                            id="teachers-autocomplete"
                            options={teachers}
                            sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Teachers" />}
                        />

                        <TextField
                            label="Course Name"
                            id="outlined-start-adornment-course-name"
                            sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        />
                    </Box>

                {/*Aici va fi un for pentru a afisa intrebarile*/}
                <Box sx={{
                    m: 1,
                    marginBottom: "20px",
                    p: 2,
                    border: '1px solid grey',
                    borderRadius: '5px',
                    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.15)',
                    backgroundColor: 'white'
                }}>
                    <TextField
                        sx={{ m: 1, marginBottom: "20px" }}
                        fullWidth
                        label="Question Text"
                        id={`question-text-${1}`}
                        // value={question}
                        // onChange={(e) => {
                        //     const newQuestions = [...questions];
                        //     newQuestions[index] = e.target.value;
                        //     setQuestions(newQuestions);
                        // }}
                    />
                    <TextField
                        fullWidth
                        label="Correct Answer"
                        id="outlined-start-adornment-correctAnswer"
                        sx={{ m: 1, marginBottom: "20px" }}
                    />

                </Box>

                    <Box sx={{
                        m: 1,
                        marginBottom: "20px",
                        p: 2,
                        border: '1px solid grey',
                        borderRadius: '5px',
                        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.15)',
                        backgroundColor: 'white'
                    }}>
                        <TextField
                            sx={{ m: 1, marginBottom: "20px" }}
                            fullWidth
                            label="Question Text"
                            id={`question-text-${1}`}
                            // value={question}
                            // onChange={(e) => {
                            //     const newQuestions = [...questions];
                            //     newQuestions[index] = e.target.value;
                            //     setQuestions(newQuestions);
                            // }}
                        />
                        <TextField
                            fullWidth
                            label="Correct Answer"
                            id="outlined-start-adornment-correctAnswer"
                            sx={{ m: 1, marginBottom: "20px" }}
                        />

                    </Box>

                    {/*Aici se termina intrebarile si raspunsurile*/}



                    {/*Aici un for pentru studentii care participa la examen*/}
                    <Box sx={{
                        m: 1,
                        marginBottom: "20px",
                        p: 2,
                        border: '1px solid grey',
                        borderRadius: '5px',
                        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.15)',
                        backgroundColor: 'white'
                    }}>
                        <TextField
                            label="Student Exam ID"
                            id="outlined-start-adornment-idStudentExam"
                            sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        />
                        <TextField
                            label="Student ID"
                            id="outlined-start-adornment-idStudent"
                            sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        />
                        <TextField
                            label="Exam Status"
                            id="outlined-start-adornment-examStatus"
                            sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        />
                        <TextField
                            label="Score"
                            id="outlined-start-adornment-score"
                            sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                            />
                    </Box>
                    {/*Aici se termina */}



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
    )
}

export default EditTestTeacher;