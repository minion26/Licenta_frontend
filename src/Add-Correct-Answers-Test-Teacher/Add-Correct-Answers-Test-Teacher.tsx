// import Header from "../Header-teacher/Header.tsx";
// import UpperHeader from "../Upper-Header/Upper-Header.tsx";
// import {useEffect, useState} from "react";
// import axios from 'axios';
// import styles from "./Add-Correct-Answers-Test-Teacher.module.css";
//
// interface Question {
//     id: number;
//     text: string;
//     // include other properties of the question object if there are any
// }
//
// function AddCorrectAnswersTestTeacher(){
//     const [questions, setQuestions] = useState<Question[]>([]);
//     const [answers, setAnswers] = useState({});
//
//     useEffect(() => {
//         // Fetch the questions from the backend
//         axios.get('/api/questions/no-exam')
//             .then(response => {
//                 if (Array.isArray(response.data)) {
//                     setQuestions(response.data);
//                 } else {
//                     console.error('Expected response.data to be an array, got', response.data);
//                 }
//             })
//             .catch(error => {
//                 console.error('There was an error!', error);
//             });
//     }, []);
//
//     const handleAnswerChange = (questionId : number, answer : string) => {
//         setAnswers(prevAnswers => ({
//             ...prevAnswers,
//             [questionId]: answer
//         }));
//     };
//
//     const handleSubmit = () => {
//         // Send a POST request to the backend with the questions and their corresponding correct answers
//         axios.post('/api/answers', answers)
//             .then(response => {
//                 console.log(response);
//             })
//             .catch(error => {
//                 console.error('There was an error!', error);
//             });
//     };
//
//     return (
//         <div>
//             <Header />
//             <UpperHeader title={"Add Correct Answers"} subtitle={"Test Name"} />
//             <div className={styles.container}>
//                 {questions.map(question => (
//                     <div key={question.id}>
//                         <p>{question.text}</p>
//                         <input
//                             type="text"
//                             onChange={e => handleAnswerChange(question.id, e.target.value)}
//                         />
//                     </div>
//                 ))}
//                 <button onClick={handleSubmit}>Submit Answers</button>
//             </div>
//         </div>
//     );
// }
//
// export default AddCorrectAnswersTestTeacher;

import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import { useState} from "react";
import axios from 'axios';
import styles from "./Add-Correct-Answers-Test-Teacher.module.css";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";

interface Question {
    id: number;
    text: string;
    // include other properties of the question object if there are any
}

function AddCorrectAnswersTestTeacher(){
    // Mock data
    const [questions] = useState<Question[]>([
        {id: 1, text: 'Mock question 1'},
        {id: 2, text: 'Mock question 2'},
        {id: 3, text: 'Mock question 3'},
    ]);
    const [answers, setAnswers] = useState({});

    // Commented out the data fetching
    // useEffect(() => {
    //     // Fetch the questions from the backend
    //     axios.get('/api/questions/no-exam')
    //         .then(response => {
    //             if (Array.isArray(response.data)) {
    //                 setQuestions(response.data);
    //             } else {
    //                 console.error('Expected response.data to be an array, got', response.data);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('There was an error!', error);
    //         });
    // }, []);

    const handleAnswerChange = (questionId : number, answer : string) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    };

    const handleSubmit = () => {
        // Send a POST request to the backend with the questions and their corresponding correct answers
        axios.post('/api/answers', answers)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div>
            <Header />
            <UpperHeader title={"Add Correct Answers"} subtitle={"Test Name"} />
            <div className={styles.container}>
                {questions.map(question => (
                    // <div key={question.id}>
                        <Box
                            key={question.id}
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
                                sx={{ m: 1, marginBottom: "20px" }}
                                fullWidth
                                label="Question Text"
                                id={`question-text-${1}`}
                                value={question.text}
                            />
                            <TextField
                                sx={{m: 1, marginBottom: "20px"}}
                                fullWidth
                                label="Answer"
                                id={`answer-${question.id}`}
                                onChange={e => handleAnswerChange(question.id, e.target.value)}
                            />

                        </Box>
                    // </div>
                ))}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        marginTop: "20px",
                        m: 1,
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "The answers have been saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            handleSubmit();
                        }}
                    >
                        Save
                    </Button>
                </Box>
            </div>
        </div>
    );
}

export default AddCorrectAnswersTestTeacher;