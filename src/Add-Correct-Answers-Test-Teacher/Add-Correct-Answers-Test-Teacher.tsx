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
import {useEffect, useState} from "react";
import styles from "./Add-Correct-Answers-Test-Teacher.module.css";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import {useParams} from "react-router-dom";
import {ExamDTO, QuestionDTO} from "../types.ts";


function AddCorrectAnswersTestTeacher(){
    const {idExam} = useParams();

    const [exam, setExam] = useState<ExamDTO>({
        idExam: '',
        name: '',
        question: [],
        timeInMinutes: 0,
        totalScore: 0,
        passingScore: 0,
        date: new Date(),
        courseName: '',
        idTeachers: [],
        studentExamDTO: [],
    });

    useEffect(() => {
      fetch(`http://localhost:8081/api/v1/exam/idExam=${idExam}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
          },
      })
          .then((response) => {
              if(!response.ok){
                  return response.json().then(err => {
                      throw new Error(err.message);
                  });
              }
              return response.json();
          })
          .then((data) => {
                setExam(data);
                console.log(data);
          })
            .catch((error) => {
                    console.error('An error occured!', error);
                    Swal.fire({
                        icon: 'error',
                        title: error.message || 'An error occurred',
                        showConfirmButton: false,
                        // timer: 1500
                    });
            });
    }, [idExam]);

    // Mock data
    // const [questions] = useState<Question[]>([]);

    const [questions, setQuestions] = useState<QuestionDTO[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/question/all/idExam=${idExam}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => {
                if(!response.ok){
                    return response.json().then(err => {
                        throw new Error(err.message);
                    });
                }
                return response.json();
            })
            .then((data) => {
                setQuestions(data);
                console.log("questions ", data);
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
    }, []);

    const [questionsWithAnswers, setQuestionsWithAnswers] = useState<QuestionDTO[]>([]);
    useEffect(() => {
        setQuestionsWithAnswers(questions.filter(question => question.correctAnswers.length > 0));
    }, [questions]);

    const [questionsWithoutAnswers, setQuestionsWithoutAnswers] = useState<QuestionDTO[]>([]);
    useEffect(() => {
        setQuestionsWithoutAnswers(questions.filter(question => question.correctAnswers.length === 0));
    }, [questions]);


    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submit event

        const transformedQuestionsWithoutAnswers = questionsWithoutAnswers.reduce((acc, question) => {
            const idQuestion = question.idQuestion;
            const correctAnswer = question.correctAnswers[0].correctAnswer;
            const score = question.correctAnswers[0].score;

            acc[idQuestion] = {
                correctAnswer,
                score
            };

            return acc;
        }, {} as Record<string, { correctAnswer: string, score: number }>);

        console.log("transformedQuestionsWithoutAnswers", JSON.stringify(transformedQuestionsWithoutAnswers));

        fetch(`http://localhost:8081/api/v1/correct-answers-exam/createByExam/idExam=${idExam}`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(transformedQuestionsWithoutAnswers),
        })
            .then(response => {
                if(response.ok){
                    Swal.fire({
                        title: 'Success',
                        text: 'The correct answers have been saved!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });

                    window.location.reload();
                } else {
                    return response.json().then(err => {
                        throw new Error(err.message);
                    });

                    // throw new Error('Network response was not ok');

                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                Swal.fire({
                    icon: 'error',
                    title: error.message || 'An error occurred',
                    showConfirmButton: false,
                    // timer: 1500
                });
            });

    };

    return (
        <form onSubmit={handleSubmit}>
            <Header />
            <UpperHeader title={"Add Correct Answers"} subtitle={exam ? exam.name : ""} />
            <div className={styles.container}>
                {questionsWithAnswers.map((question, index) => {
                    const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                        const newQuestions = [...questionsWithAnswers];
                        newQuestions[index].correctAnswers[0].score = Number(event.target.value);
                        setQuestionsWithAnswers(newQuestions);
                    };

                    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                        const newQuestions = [...questionsWithAnswers];
                        newQuestions[index].correctAnswers[0].correctAnswer = event.target.value;
                        setQuestionsWithAnswers(newQuestions);
                    };

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
                            value={question.questionText}
                        />
                        <TextField
                            sx={{m: 1, marginBottom: "20px"}}
                            fullWidth
                            label="Score"
                            type={"number"}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                min: 1,
                                max: 100,
                            }}
                            id={`score${index}`}
                            value={(question.correctAnswers[0] && question.correctAnswers[0].score) ? question.correctAnswers[0].score : 0}
                            onChange={handleScoreChange}

                        />
                        <TextField
                            sx={{m: 1, marginBottom: "20px"}}
                            fullWidth
                            label="Answer"
                            id={`answer-${index}`}
                            value={(question.correctAnswers[0] && question.correctAnswers[0].correctAnswer) ? question.correctAnswers[0].correctAnswer : ''}
                            onChange={handleAnswerChange}
                        />

                    </Box>
                    );
                })}

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
                            const transformedQuestionsWithAnswers = questionsWithAnswers.reduce((acc, question) => {
                                const idQuestion = question.idQuestion;
                                const correctAnswer = question.correctAnswers[0].correctAnswer;
                                const score = question.correctAnswers[0].score;

                                acc[idQuestion] = {
                                    correctAnswer,
                                    score
                                };

                                return acc;
                            }, {} as Record<string, { correctAnswer: string, score: number }>);

                            console.log("transformedQuestionsWithAnswers", JSON.stringify(transformedQuestionsWithAnswers));

                            if(Object.keys(transformedQuestionsWithAnswers).length === 0) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'No correct answers to edit were found!',
                                    showConfirmButton: false,
                                    // timer: 1500
                                });
                                return;
                            }else{
                                fetch(`http://localhost:8081/api/v1/correct-answers-exam/updateByExam/idExam=${idExam}`, {
                                    method: 'PATCH',
                                    credentials: 'include',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Access-Control-Allow-Origin': '*',
                                    },
                                    body: JSON.stringify(transformedQuestionsWithAnswers),
                                })
                                    .then(response => {
                                        if(response.ok){
                                            Swal.fire({
                                                title: 'Success',
                                                text: 'The correct answers have been saved!',
                                                icon: 'success',
                                                confirmButtonText: 'Ok'
                                            });
                                        } else {
                                            return response.json().then(err => {
                                                throw new Error(err.message);
                                            });
                                        }
                                    })
                                    .catch(error => {
                                        console.error('There has been a problem with your fetch operation:', error);
                                        Swal.fire({
                                            icon: 'error',
                                            title: error.message || 'An error occurred',
                                            showConfirmButton: false,
                                            // timer: 1500
                                        });
                                    });

                            }}
                        }
                    >
                        Edit
                    </Button>
                </Box>


                {
                    questionsWithoutAnswers.map((question, index) => {

                        const handleScoreChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                            const newQuestions = [...questionsWithoutAnswers];
                            if (!newQuestions[index].correctAnswers[0]) {
                                newQuestions[index].correctAnswers[0] = { correctAnswer: '', score: 0, idAnswerExam: '', idQuestionExam: '' };
                            }
                            newQuestions[index].correctAnswers[0].score = Number((event.target as HTMLInputElement).value);
                            setQuestionsWithoutAnswers(newQuestions);
                        };

                        const handleAnswerChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                            const newQuestions = [...questionsWithoutAnswers];
                            if (!newQuestions[index].correctAnswers[0]) {
                                newQuestions[index].correctAnswers[0] = { correctAnswer: '', score: 0, idAnswerExam: '', idQuestionExam: '' };
                            }
                            newQuestions[index].correctAnswers[0].correctAnswer = (event.target as HTMLInputElement).value;
                            setQuestionsWithoutAnswers(newQuestions);
                        };

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
                                value={question.questionText}

                            />
                                <TextField
                                    sx={{m: 1, marginBottom: "20px"}}
                                    fullWidth
                                    label="Score"
                                    type={"text"} // Change this to "text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    id={`score${index}`}
                                    value={question.correctAnswers[0] && question.correctAnswers[0].score ? question.correctAnswers[0].score : ''}
                                    onChange={(event) => {
                                        // Check if the input is a number or empty string
                                        if (!isNaN(Number(event.target.value)) || event.target.value === '') {
                                            handleScoreChange(index, event);
                                        }
                                    }}
                                />
                            <TextField
                                sx={{m: 1, marginBottom: "20px"}}
                                fullWidth
                                label="Answer"
                                id={`answer-${index}`}
                                value={question.correctAnswers[0] && question.correctAnswers[0].correctAnswer ? question.correctAnswers[0].correctAnswer : ''}
                                onChange={(event) => handleAnswerChange(index, event)}

                            />

                        </Box>
                        );
                    })
                }

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
                        type={"submit"}
                    >
                        Save
                    </Button>
                </Box>
            </div>
        </form>
    );
}

export default AddCorrectAnswersTestTeacher;