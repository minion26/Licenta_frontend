import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Header from "../Header-students/Header.tsx";
import styles from "./Take-Tests-Student.module.css";
import {TimerComponent} from "../TimerComponent/TimerComponent.tsx";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

// import {ExamType, StudentExamDTO, CorrectAnswer, Question} from "../types";

function TakeTestsStudent(){
    const [questionsAndAnswers] = useState([
        {
            questionText: "What is the capital of France?",
            correctAnswer: "Paris"
        },
        {
            questionText: "Care este capitala Germaniei?",
            correctAnswer: "Berlin"
        },
        {
            questionText: "La ce serial de uiti acum?",
            correctAnswer: "suits"
        },
        {
            questionText: "Care e trupa ta preferata?",
            correctAnswer: ""
        }
    ]);

    const [isTabActive, setIsTabActive] = useState(true);
    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsTabActive(false);
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const handleSubmit = () => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been submitted",
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div>

            <Header />
            <UpperHeader title={"Test1"} subtitle={"blabla"} />
            <div className={styles.container}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <TimerComponent onTimeUp={handleSubmit} time={360}/>
                </div>

                <Box sx={
                    {
                        width: '100%',
                    }
                }>

                    {questionsAndAnswers.map((item, index) => (
                        <Box key={index} sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                sx={{m: 1, marginBottom: "20px"}}
                                fullWidth
                                label="Question Text"
                                id={`question-text-${index}`}
                                value={item.questionText}

                            />

                            <TextField
                                fullWidth
                                label="Correct Answer"
                                id={`outlined-start-adornment-correctAnswer-${index}`}
                                sx={{m: 1, marginBottom: "20px"}}
                                disabled={!isTabActive}
                            />
                        </Box>
                    ))}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "20px",
                            m: 1,
                        }}
                    >

                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Box>

                </Box>

            </div>
        </div>
    );
}

export default TakeTestsStudent;