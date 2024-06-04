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
import {Link, useParams} from "react-router-dom";
import {Course, ExamDTO, QuestionDTO, StudentExamFrontDTO, Teacher} from "../types.ts";


function EditTestTeacher(){
    const {idCourses, idExam} = useParams();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [course, setCourse] = useState<Course>(
        {
            idCourses: "",
            name: "",
            year: 0,
            semester: 0,
            credits: 0,
            description: "",
        }
    );
    const [exam, setExam] = useState<ExamDTO>(
        {
            idExam: "",
            name: "",
            question: [],
            timeInMinutes: 0,
            totalScore: 0,
            passingScore: 0,
            date: new Date(),
            courseName: "",
            idTeachers: [],
            studentExamDTO: [],
        }
    );

    const [examBackup, setExamBackup] = useState<ExamDTO>(
        {
            idExam: "",
            name: "",
            question: [],
            timeInMinutes: 0,
            totalScore: 0,
            passingScore: 0,
            date: new Date(),
            courseName: "",
            idTeachers: [],
            studentExamDTO: [],
        }
    );

    const [studentExam, setStudentExam] = useState<StudentExamFrontDTO[]>([]);
    const [, setStudentExamBackup] = useState<StudentExamFrontDTO[]>([]);

    const [questions, setQuestions] = useState<QuestionDTO[]>([]);
    const [questionsBackup, setQuestionsBackup] = useState<QuestionDTO[]>([]);


    // luam cursul
    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/courses/${idCourses}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCourse(data);
            })
            .catch(error => console.error('An error occured!', error));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/exam/idExam=${idExam}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setExam(data);
                setExamBackup(data);
                console.log(data);
            })
            .catch(error => console.error('An error occured!', error));
    }, []);




    // Starea pentru profesori
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    // Funcția pentru a prelua profesorii
    const fetchTeachers = async () => {
        const response = await fetch(`http://localhost:8081/api/v1/courses/get-teachers/idCourse=${idCourses}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
        if(response.ok){
            const data = await response.json();
            setTeachers(data);
        }
        else{
            console.error("An error occurred while fetching teachers");
        }
    };


    //luam studentii
    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/exam/get-students/idExam=${idExam}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setStudentExam(data);
                setStudentExamBackup(data);
            })
            .catch(error => console.error('An error occured!', error));
    }, []);


    //luam intrebarile
    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/exam/get-questions-and-answers/idExam=${idExam}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data);
                setQuestionsBackup(data);
            })
            .catch(error => console.error('An error occured!', error));
    }, []);


    // Folosiți useEffect pentru a prelua profesorii când componenta se încarcă
    useEffect(() => {
        fetchTeachers();
    }, []);


    function handleInputChange(property: keyof ExamDTO, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const newValue = event.target.value;
        setExam((prevExam) => {
            const newExam = {
                ...prevExam,
                [property]: newValue,
            };

            return newExam;
        });
    }


    const handleQuestionChange = (index: number, property: keyof QuestionDTO, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setQuestions((prevQuestions) => {
            const newQuestions = [...prevQuestions];
            newQuestions[index] = {
                ...newQuestions[index],
                [property]: newValue,
            };

            return newQuestions;
        });
    }



    // const handleStudentChange = (index: number,property: keyof StudentExamFrontDTO, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const newValue = event.target.value;
    //     setStudentExam((prevStudentExam) => {
    //         const newStudentExam = [...prevStudentExam];
    //         newStudentExam[index] = {
    //             ...newStudentExam[index],
    //             [property]: newValue,
    //         };
    //
    //         return newStudentExam;
    //     });
    // }


    function handleCancel() {
        setExam(examBackup);
        // setStudentExam(studentExamBackup);
        setQuestions(questionsBackup);
    }

    useEffect(() => {
        setExam((prevExam) => ({
            ...prevExam,
            studentExamDTO: studentExam.map((student) => ({
                idStudentExam: student.idStudentExam,
                idStudent: student.idStudent,
                idExam: student.idExam,
                score: student.score,
                examStatus: student.examStatus,
            })),
        }));
    }, [studentExam]);

    useEffect(() => {
        setExam((prevExam) => ({
            ...prevExam,
            question: questions.map((question) => ({
                idQuestion: question.idQuestion,
                questionText: question.questionText,
                idExam: question.idExam,
                correctAnswers: question.correctAnswers,
            })),
        }));
    }, [questions]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // console.log(exam);
        // console.log(studentExam);
        // console.log(questions);
        // console.log(JSON.stringify(exam));

        // const examToSend = {
        //     ...exam,
        //     date: exam.date ? new Date(exam.date).toISOString() : null,
        // };

        const response = await fetch(`http://localhost:8081/api/v1/exam/update/idExam=${idExam}`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                'Content-Type': "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(exam),
        });

        if(response.ok){
            await Swal.fire({
                icon: 'success',
                title: 'Exam updated successfully',
                showConfirmButton: false,
                timer: 1500
            });

            if (response.headers.get("content-type")?.includes("application/json")) {
                const data = await response.json();
                console.log(data);
            }

            // window.location.reload();
        }else{
            const errorData = await response.json();
            await Swal.fire({
                icon: 'error',
                title: errorData.message || 'An error occurred',
                showConfirmButton: false,
                timer: 1500
            });

        }

    }

    return(
        <form onSubmit={handleSubmit}>
            <Header/>
            <UpperHeader title={exam ? exam.name : ""} subtitle={"date"} />
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
                        InputLabelProps={{ shrink: true }}
                        value={exam?.name}
                        name={"name"}
                        onChange={(event) => handleInputChange("name", event)}

                    />

                    <TextField
                        id="outlined-time-in-minutes"
                        label="Time in minutes"
                        type="number"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        InputLabelProps={{ shrink: true }}
                        value={exam?.timeInMinutes}
                        name={"timeInMinutes"}
                        onChange={(event) => handleInputChange("timeInMinutes", event)}
                    />

                    <TextField
                        id="outlined-total-score"
                        label="Total Score"
                        type="number"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        InputLabelProps={{ shrink: true }}
                        value={exam?.totalScore}
                        name={"totalScore"}
                        onChange={(event) => handleInputChange("totalScore", event)}
                    />

                    <TextField
                        id="outlined-passing-score"
                        label="Passing Score"
                        type="number"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        InputLabelProps={{ shrink: true }}
                        value={exam?.passingScore}
                        name={"passingScore"}
                        onChange={(event) => handleInputChange("passingScore", event)}
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
                            value={exam?.date ? new Date(exam.date).toISOString().split("T")[0] : ""}
                            name={"date"}
                            onChange={(event) => handleInputChange("date", event)}
                        />

                        <Autocomplete
                            multiple
                            id="teachers-autocomplete"
                            options={teachers}
                            sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                            getOptionLabel={(option) => option.firstName + " " + option.lastName}
                            renderInput={(params) => <TextField {...params} label="Teachers" />}

                        />

                        <TextField
                            label="Course Name"
                            id="outlined-start-adornment-course-name"
                            sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                            InputLabelProps={{ shrink: true }}
                            value={course?.name}
                            name={"courseName"}
                            onChange={(event) => handleInputChange("courseName", event)}
                        />
                    </Box>

                {/*Aici va fi un for pentru a afisa intrebarile*/}
                    {questions.map((question, index) => (
                        <Box key={index} sx={{
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
                                id={`question-text-${index}`}
                                value={question.questionText}
                                onChange={(event) => handleQuestionChange(index, "questionText", event)}
                            />

                        </Box>
                    ))}

                    {/*Aici se termina intrebarile si raspunsurile*/}



                    {/*Aici un for pentru studentii care participa la examen*/}

                    <Box  sx={{
                        m: 1,
                        marginBottom: "20px",
                        p: 2,
                        border: '1px solid grey',
                        borderRadius: '5px',
                        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.15)',
                        backgroundColor: 'white',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Link to={`/see-students-test/${idExam}`}>
                            <Button variant="contained">
                                See Students
                            </Button>
                        </Link>
                    </Box>

                    {/*{*/}
                    {/*    studentExam.map((studentExam, index) => (*/}
                    {/*        <Box key={index} sx={{*/}
                    {/*            m: 1,*/}
                    {/*            marginBottom: "20px",*/}
                    {/*            p: 2,*/}
                    {/*            border: '1px solid grey',*/}
                    {/*            borderRadius: '5px',*/}
                    {/*            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.15)',*/}
                    {/*            backgroundColor: 'white'*/}
                    {/*        }}>*/}
                    {/*            */}
                    {/*            <TextField*/}
                    {/*                label="Student name"*/}
                    {/*                id="outlined-start-adornment-idStudent"*/}
                    {/*                sx={{ m: 1, width: "25ch", marginBottom: "20px" }}*/}
                    {/*                value={studentExam.studentName}*/}
                    {/*                name={"studentName"}*/}
                    {/*                onChange={(event) => handleStudentChange(index, "studentName", event)}*/}
                    {/*            />*/}
                    {/*            <TextField*/}
                    {/*                label="Exam Status"*/}
                    {/*                id="outlined-start-adornment-examStatus"*/}
                    {/*                sx={{ m: 1, width: "25ch", marginBottom: "20px" }}*/}
                    {/*                value={*/}
                    {/*                    (() => {*/}
                    {/*                        switch(studentExam.examStatus) {*/}
                    {/*                            case -1: return "Not started";*/}
                    {/*                            case 0: return "Failed";*/}
                    {/*                            case 1: return "Passed";*/}
                    {/*                            default: return studentExam.examStatus;*/}
                    {/*                        }*/}
                    {/*                    })()*/}
                    {/*                }*/}
                    {/*                name={"examStatus"}*/}
                    {/*                onChange={(event) => handleStudentChange(index, "examStatus", event)}*/}
                    {/*            />*/}
                    {/*            <TextField*/}
                    {/*                label="Score"*/}
                    {/*                id="outlined-start-adornment-score"*/}
                    {/*                sx={{ m: 1, width: "25ch", marginBottom: "20px" }}*/}
                    {/*                value={studentExam.score === -1 ? "Not graded" : studentExam.score}*/}
                    {/*                name={"score"}*/}
                    {/*                onChange={(event) => handleStudentChange(index, "score", event)}*/}
                    {/*            />*/}
                    {/*        </Box>*/}
                    {/*    ))*/}
                    {/*}*/}

                    {/*/!*Aici se termina *!/*/}



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
    )
}

export default EditTestTeacher;