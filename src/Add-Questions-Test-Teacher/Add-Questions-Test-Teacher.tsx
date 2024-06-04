import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./Add-Questions-Test-Teacher.module.css";
import {useParams} from "react-router-dom";
import {ExamDTO, QuestionCreationDTO, QuestionDTO} from "../types.ts";
import Swal from "sweetalert2";


function AddQuestionsTestTeacher() {
    const {idExam} = useParams();

    const [questions, setQuestions] = useState<QuestionCreationDTO[]>([]);
    // const [newQuestions, setNewQuestions] = useState<QuestionCreationDTO[]>([]);


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

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/exam/idExam=${idExam}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
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
                setExam(data);
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

    // const [questionCount, setQuestionCount] = useState(1);

    const handleAddQuestion = () => {
        const newQuestion: QuestionCreationDTO = {
            idQuestion: '', // setează valoarea corespunzătoare
            questionText: '', // setează valoarea corespunzătoare
            idExam: '', // setează valoarea corespunzătoare
        };
        setQuestions([...questions, newQuestion]);
    };

    function handleDeleteQuestion(index: number) {
        setQuestions(questions.filter((_, i) => i !== index));


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


    const renderQuestions = () => {
        return questions.map((question, index) => (

            <Box key={index} sx={{
                display: 'flex',
                alignItems: 'center',
                width: '75%',
            }}>
                <TextField
                    sx={{ m: 1, marginBottom: "20px", flex: 1 }}
                    fullWidth
                    label="Question Text"
                    id={`question-text-${index}`}
                    value={question.questionText}
                    onChange={(event) => handleQuestionChange(index, 'questionText', event)}
                />
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteQuestion(index)}
                    sx={{ m: 1, marginBottom: "20px" }}
                    // sx={{ m: 1, marginTop: isSmallScreen ? "0px" : "20px" }}
                    startIcon={<DeleteIcon />}
                >
                </Button>
            </Box>

        ));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newQuestions = questions.map((question) => {
            return {
                questionText: question.questionText,
                idExam: idExam,
            };
        });

        console.log(newQuestions);

        const response = await fetch(`http://localhost:8081/api/v1/question/create/question/idExam=${idExam}`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(newQuestions),
        });

        if(response.ok){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The question has been saved",
                showConfirmButton: false,
                timer: 1500
            });

            if (response.headers.get("content-type")?.includes("application/json")) {
                const data = await response.json();
                console.log(data);
            }

            window.location.reload();
        }else{
            const errorData = await response.json();
            await Swal.fire({
                icon: 'error',
                title: errorData.message || 'An error occurred',
                showConfirmButton: false,
                timer: 1500
            });
        }



    };


  return (
    <div>
      <Header />
      <UpperHeader title={"Add questions"} subtitle={exam ? exam.name : ""} />
        <form onSubmit={handleSubmit} className={styles.container}>

            {
                exam.question.map((question, index) => (

                    <Box key={index} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '75%',
                    }}>
                        <TextField
                            sx={{ m: 1, marginBottom: "20px", flex: 1 }}
                            fullWidth
                            label="Question Text"
                            id={`question-text-${index}`}
                            value={question.questionText}

                        />
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ m: 1, marginBottom: "20px" }}
                            // sx={{ m: 1, marginTop: isSmallScreen ? "0px" : "20px" }}
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                                Swal.fire({
                                    title: "Are you sure?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!"
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        fetch(`http://localhost:8081/api/v1/question/delete/idQuestion=${question.idQuestion}/idExam=${idExam}`, {
                                            method: 'DELETE',
                                            credentials: 'include',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                "Access-Control-Allow-Origin": "*",
                                            },
                                        })
                                            .then((response) => {
                                                if (!response.ok) {
                                                    console.error(`Server responded with status code ${response.status}`);
                                                    throw new Error('Failed to delete the question');
                                                }
                                                // No need to parse the response as JSON if it doesn't return any data
                                                Swal.fire({
                                                    title: "Deleted!",
                                                    text: "The question has been deleted.",
                                                    icon: "success"
                                                });

                                                window.location.reload();

                                            })
                                            .then((data) => {
                                                console.log(data);
                                                Swal.fire({
                                                    title: "Deleted!",
                                                    text: "The question has been deleted.",
                                                    icon: "success"
                                                });

                                                window.location.reload();
                                            })
                                            .catch((error) => {
                                                console.error('Error:', error);
                                            });
                                    }
                                });
                            }}
                        >
                        </Button>
                    </Box>

                ))
            }



            {renderQuestions()}


            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "space-around", width: "100%", marginTop: "20px", m: 1 }}>
                <Button variant="contained" onClick={handleAddQuestion} sx={{ marginRight: "20px" }} >Add Question</Button>
                <Button variant="contained" type="submit">Save</Button>
            </Box>

        </form>
    </div>
  );
}

export default AddQuestionsTestTeacher;