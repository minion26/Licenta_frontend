import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import styles from "./Needs-Review-Teacher.module.css";
import Button from "@mui/material/Button";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CorrectAnswersExamCreationDTO, CorrectAnswersExamDTO, ReviewStudentAnswersDTO} from "../types.ts";
import Swal from "sweetalert2";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";


function NeedsReviewTeacher(){
    const {idStudentAnswerExam} = useParams();

    const [review, setReview] = useState<ReviewStudentAnswersDTO>({
        idStudentAnswerExam: "",
        idStudent: "",
        idTeacher: [],
        idExam: "",
        idQuestion: "",
        question: "",
        studentAnswer: "",
        needsReview: false
    });

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/student-answers/view-answer/needs-review/idStudentAnswerExam=${idStudentAnswerExam}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => {
                if(!response.ok){
                    setHasError(true);
                    return response.json().then((err) => {
                        throw new Error(err.message);
                    })
                }
                return response.json();
            })
            .then((data) => {
                setReview(data);
            })
            .catch((error) => {
                console.error("Error:", error);
                Swal.fire({
                    icon: 'error',
                    title: error.message || 'An error occurred',
                    showConfirmButton: false,
                    // timer: 1500
                });
            });
    }, []);

    const [correctAnswer, setCorrectAnswer] = useState<CorrectAnswersExamDTO>({
        idAnswerExam: "",
        correctAnswer: "",
        score: 0,
        idQuestionExam: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(review.idQuestion !== "") {
                    const response = await fetch(`http://localhost:8081/api/v1/correct-answers-exam/get-by-question/idQuestion=${review.idQuestion}`, {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setCorrectAnswer(data);
                    } else {
                        console.error("Error:", response);

                    }
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, [review.idQuestion]);


    useEffect(() => {
        console.log("review", review);
        console.log("correctAnswer", correctAnswer);

    }, [review.idQuestion, correctAnswer.idQuestionExam]);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [correctAnswersReview, setCorrectAnswersReview] = useState<CorrectAnswersExamCreationDTO>({
        score: 0
    });

    const handleSubmit =  (event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();


        handlePOST();
        handleClose();
    };

    const handlePOST = async  () => {

        console.log(correctAnswersReview);

        const response = await fetch(`http://localhost:8081/api/v1/student-answers/reviewed/idStudentAnswerExam=${review.idStudentAnswerExam}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(correctAnswersReview)
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
        setCorrectAnswersReview({
            ...correctAnswersReview,
            [e.target.name]: value
        });
    }


    return (
        <div>
            <Header />
            <UpperHeader title={"Needs Review"} subtitle={"date"} />

                {
                    hasError ? <div className={styles.container}><h1>You dont have the permission to see this.</h1></div> :
                        (
                        <div className={styles.container}>
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
                                    label="Question"
                                    id={`question`}
                                    value={review.question}
                                    name={"question"}
                                />
                                <TextField
                                    fullWidth
                                    label="Correct's Answer"
                                    id={`correct-answer`}
                                    value={correctAnswer.correctAnswer}
                                    sx={{ m: 1, marginBottom: "20px" }}
                                />
                                <TextField
                                    fullWidth
                                    label="Score"
                                    id={`score`}
                                    type={"number"}
                                    sx={{ m: 1, marginBottom: "20px" }}
                                    value={correctAnswer.score}
                                />
                                <TextField
                                    fullWidth
                                    label="Student's Answer"
                                    id={`answer`}
                                    value={review.studentAnswer}
                                    sx={{ m: 1, marginBottom: "20px" }}
                                />


                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        marginTop: "20px",
                                        m: 1,
                                    }}
                                >
                                    {/*<Button variant="outlined" color="error" endIcon={<CancelIcon />}>*/}
                                    {/*    Cancel*/}
                                    {/*</Button>*/}

                                    <Button variant="contained"
                                            color="success"
                                            endIcon={<AddTaskIcon />}
                                            onClick={handleClickOpen}
                                    >
                                        Review
                                    </Button>
                                </Box>
                            </Box>

                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Give review</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter the score for the student's answer.
                        </DialogContentText>

                        <TextField
                            margin="dense"
                            id="score"
                            label="Score for the answer"
                            type="number"
                            name={"score"}
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
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
                            </div>
                        )
                }





                {/*<Box sx={{*/}
                {/*    m: 1,*/}
                {/*    marginBottom: "20px",*/}
                {/*    p: 2,*/}
                {/*    border: '1px solid grey',*/}
                {/*    borderRadius: '5px',*/}
                {/*    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.15)',*/}
                {/*    backgroundColor: 'white'*/}
                {/*}}>*/}
                {/*    <TextField*/}
                {/*        sx={{ m: 1, marginBottom: "20px" }}*/}
                {/*        fullWidth*/}
                {/*        label="Question "*/}
                {/*        id={`question-${1}`}*/}
                {/*        // value={question}*/}
                {/*        // onChange={(e) => {*/}
                {/*        //     const newQuestions = [...questions];*/}
                {/*        //     newQuestions[index] = e.target.value;*/}
                {/*        //     setQuestions(newQuestions);*/}
                {/*        // }}*/}
                {/*    />*/}
                {/*    <TextField*/}
                {/*        fullWidth*/}
                {/*        label="Student's Answer"*/}
                {/*        id="outlined-start-adornment-studentsAnswer"*/}
                {/*        sx={{ m: 1, marginBottom: "20px" }}*/}
                {/*    />*/}

                {/*    <Box*/}
                {/*        sx={{*/}
                {/*            display: "flex",*/}
                {/*            justifyContent: "space-between",*/}
                {/*            width: "100%",*/}
                {/*            marginTop: "20px",*/}
                {/*            m: 1,*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <Button variant="outlined" color="error" endIcon={<CancelIcon />}>*/}
                {/*            Cancel*/}
                {/*        </Button>*/}

                {/*        <Button variant="contained" color="success" endIcon={<AddTaskIcon />}>*/}
                {/*            Reviewed*/}
                {/*        </Button>*/}
                {/*    </Box>*/}
                {/*</Box>*/}
            {/*</div>*/}
        </div>
    );
}

export default NeedsReviewTeacher;