import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import styles from "./Needs-Review-Teacher.module.css";
import Button from "@mui/material/Button";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CancelIcon from '@mui/icons-material/Cancel';
import {useEffect, useState} from "react";
interface IData {
    question: string;
    studentAnswer: string;
    // include other properties if they exist
}

function NeedsReviewTeacher(){
    const [data, setData] = useState<IData[]>([]);

    useEffect(() => {
        fetch('http://localhost:8081/api/v1/student-answers/needs-review')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <div>
            <Header />
            <UpperHeader title={"Needs Review"} subtitle={"date"} />
            <div className={styles.container}>
                {data.map((item, index) => (
                    <div key={index}>
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
                            id={`question-${index}`}
                            value={item.question}
                        />
                        <TextField
                            fullWidth
                            label="Student's Answer"
                            id={`answer-${index}`}
                            value={item.studentAnswer}
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
                                <Button variant="outlined" color="error" endIcon={<CancelIcon />}>
                                    Cancel
                                </Button>

                                <Button variant="contained" color="success" endIcon={<AddTaskIcon />}>
                                    Reviewed
                                </Button>
                            </Box>
                        </Box>
                    </div>
                ))}

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
            </div>
        </div>
    );
}

export default NeedsReviewTeacher;