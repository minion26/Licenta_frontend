import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ExamDTO, QuestionAndStudentsAnswersDTO} from "../types.ts";
import Swal from "sweetalert2";
import styles
    from "../See-Students-Answers-To-Questions-Per-Test-Teacher/See-Students-Answers-To-Questions-Per-Test-Teacher.module.css";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";

function SeeSubmittedTestStudent(){
    const {idExam} = useParams();


    const [exam, setExam] = useState<ExamDTO>({
        idExam: "",
        name: "",
        question: [],
        timeInMinutes: 0,
        totalScore: 0,
        passingScore: 0,
        date: new Date(),
        courseName: "",
        idTeachers: [],
        studentExamDTO: []
    });

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/exam/idExam=${idExam}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': '*',
            }
        })
            .then(response => {
                if(!response.ok){
                    return response.json().then(error => {
                        throw new Error(error.message);
                    })
                }
                return response.json();
            })
            .then(data => {
                setExam(data);
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
    }, []);



    const [studentsAnswer, setStudentsAnswer] = useState<QuestionAndStudentsAnswersDTO[]>([]);

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/student-answers/see-my-answer/idExam=${idExam}`, {
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
    }, [ idExam]);


    return (
        <div>
            <Header/>
            <UpperHeader title={exam.name} subtitle={exam.courseName}/>
            <div className={styles.container}>
                {!hasError && studentsAnswer.length > 0 ? studentsAnswer.map((answer, index) => {

                    return (<Box
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

                }) : hasError ? <h1>You dont have the permission to see this.</h1> :
                    <h1>The student has not taken the test.</h1>}
            </div>
        </div>
    );
}

export default SeeSubmittedTestStudent;