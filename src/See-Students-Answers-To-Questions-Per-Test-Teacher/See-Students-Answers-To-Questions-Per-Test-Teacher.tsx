import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Header from "../Header-teacher/Header.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from "./See-Students-Answers-To-Questions-Per-Test-Teacher.module.css";
import {QuestionAndStudentsAnswersDTO, Student} from "../types.ts";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import Card from "@mui/material/Card";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



function SeeStudentsAnswersToQuestionsPerTestTeacher(){
    const {idExam, idStudent} = useParams();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [studentsAnswer, setStudentsAnswer] = useState<QuestionAndStudentsAnswersDTO[]>([]);

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/student-answers/see-students-answers/idExam=${idExam}/idStudent=${idStudent}`, {
            method:"GET",
            credentials: "include",
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then((response) => {
                if(!response.ok){
                    setHasError(true);
                    return response.json().then(error => {
                        throw new Error(error.message);
                    })
                }
                return response.json();
            })
            .then(data => {
                setStudentsAnswer(data);
            })
            .catch(error => {
                console.log("eroare: ", error);
                Swal.fire({
                    icon: 'error',
                    title: error.message || 'An error occurred',
                    showConfirmButton: false,
                    // timer: 1500
                });
            })
    }, []);

    const [student, setStudent] = useState<Student>({
        idUsers : "",
        firstName: "",
        lastName: "",
        facultyEmail: "",
        personalEmail: "",
        nrMatriculation: "",
        yearOfStudy: 0,
        semester: 0,
        groupOfStudy: ""
    })

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/students/${idStudent}`, {
            method:"GET",
            credentials: "include",
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                setStudent(data);
            })
            .catch(error => {
                console.log("eroare: ", error);
            })

    }, []);

    useEffect(() => {
        console.log("idExam", idExam);
        console.log("idStudent", idStudent);
    }, []);

    return (
        <div>

            <UpperHeader title={student.firstName + " "+ student.lastName} subtitle={"group: " + student.groupOfStudy + " year: " +student.yearOfStudy}/>
            <Header/>
            <div className={styles.container}>
                {!hasError && studentsAnswer.length > 0 ?  studentsAnswer.map((answer, index) => {

                        return  ( <Box
                            key={index}
                            sx={{
                                m: 1,
                                marginBottom: "20px",
                                p: 2,
                                border: '1px solid grey',
                                borderRadius: '5px',
                                boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.15)',
                                backgroundColor: 'white'
                            }}
                        >
                            <TextField
                                sx={{m: 1, marginBottom: "20px"}}
                                fullWidth
                                label="Question Text"
                                id={`question-text-${index}`}
                                value={answer.questionText}
                            />

                            <TextField
                                sx={{m: 1, marginBottom: "20px"}}
                                fullWidth
                                label="Correct Answer"
                                id={`correct-answer-${index}`}
                                value={answer.correctAnswer}
                            />

                            <TextField
                                sx={{m: 1, marginBottom: "20px"}}
                                fullWidth
                                label="Student's Answer"
                                id={`student-answer-${index}`}
                                value={answer.studentAnswer}
                            />

                            <TextField
                                sx={{m: 1, marginBottom: "20px"}}
                                fullWidth
                                label="Correct answer's score"
                                id={`score-${index}`}
                                value={answer.score}
                            />

                        </Box>)

                }) : hasError ? <Card
                    sx={{
                        // marginLeft: isSmallScreen ? "0px" : "200px",
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "column",
                        width: isSmallScreen ? "100%" : "75%",
                        height: isSmallScreen ? "50%" : "auto",
                        backgroundColor: "#FAFAF5",
                        borderRadius: "24px",
                        alignSelf: "center",
                    }}
                >
                    <div className={styles.title}>
                        <p className={styles.p}>
                            You don't have the permission to see this. <br/>
                        </p>
                    </div>
                </Card> : <Card
                    sx={{
                        // marginLeft: isSmallScreen ? "0px" : "200px",
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "column",
                        width: isSmallScreen ? "100%" : "75%",
                        height: isSmallScreen ? "50%" : "auto",
                        backgroundColor: "#FAFAF5",
                        borderRadius: "24px",
                        alignSelf: "center",
                    }}
                >
                    <div className={styles.title}>
                        <p className={styles.p}>
                            The student has not answered the test yet. <br/>
                        </p>
                    </div>
                </Card>}
            </div>
        </div>
    );
}

export default SeeStudentsAnswersToQuestionsPerTestTeacher;