import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import {useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./Add-Questions-Test-Teacher.module.css";


function AddQuestionsTestTeacher() {


    const [questions, setQuestions] = useState<string[]>([]);

    // const [questionCount, setQuestionCount] = useState(1);

    const handleAddQuestion = () => {
        setQuestions([...questions, '']);
    };
    function handleDeleteQuestion(index: number) {
        setQuestions(questions.filter((_, i) => i !== index));
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
                    value={question}
                    onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index] = e.target.value;
                        setQuestions(newQuestions);
                    }}
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


  return (
    <div>
      <Header />
      <UpperHeader title={"Add questions"} subtitle={"Test name"} />
        <div className={styles.container}>

            {renderQuestions()}
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px", m: 1 }}>
                <Button variant="contained" onClick={handleAddQuestion} >Add Question</Button>
            </Box>

        </div>
    </div>
  );
}

export default AddQuestionsTestTeacher;