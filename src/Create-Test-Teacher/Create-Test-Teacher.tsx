import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Autocomplete} from "@mui/material";
import {useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';


function CreateTestTeacher() {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const teachers = [
        {id: "3f1547ec-1fb0-4b90-ad6b-a9a6e2e855bc", name: "Teacher 1"},
        {id: "77bd0b6a-1b80-438e-a96a-09bb82f590c0", name: "Teacher 2"},
        // more teachers...
    ];

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

                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    sx={{ m: 1, marginBottom: "20px" }}
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








    const handleSubmit = async () => {
        // const data = {
        //     name: /* value from the "Name" TextField */,
        //     timeInMinutes: /* value from the "Time in minutes" TextField */,
        //     totalScore: /* value from the "Total Score" TextField */,
        //     passingScore: /* value from the "Passing Score" TextField */,
        //     date: /* value from the "Date" TextField */,
        //     idTeacher: /* value from the "Teachers" Autocomplete */,
        //     question: questions.map(q => ({ questionText: q.text })),
        // };
        //
        // const response = await fetch(/* your server endpoint */, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // });
        //
        // if (!response.ok) {
        //     // handle error
        // }
        //
        // const result = await response.json();
        // // do something with the result
    };


  return (
    <div>
      <Header />
        <UpperHeader title={"Create test"} subtitle={"date"}/>
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
                />

                <TextField
                    id="outlined-time-in-minutes"
                    label="Time in minutes"
                    type="number"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    // InputLabelProps={{
                    //     shrink: true,
                    // }}
                    // inputProps={{
                    //     min: 1,
                    //     // max: 100,
                    // }}

                />

                <TextField
                    id="outlined-total-score"
                    label="Total Score"
                    type="number"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    // InputLabelProps={{
                    //     shrink: true,
                    // }}
                    // inputProps={{
                    //     min: 1,
                    //     // max: 100,
                    // }}

                />

                <TextField
                    id="outlined-passing-score"
                    label="Passing Score"
                    type="number"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    // InputLabelProps={{
                    //     shrink: true,
                    // }}
                    // inputProps={{
                    //     min: 1,
                    //     // max: 100,
                    // }}

                />

                <TextField
                    id="outlined-date"
                    label="Date"
                    type="date"
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    // inputProps={{
                    //     min: 1,
                    //     // max: 100,
                    // }}

                />

                <Autocomplete
                    multiple
                    id="teachers-autocomplete"
                    options={teachers}
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Teachers" />}
                />



                {renderQuestions()}
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px", m: 1 }}>
                    <Button variant="contained" onClick={handleAddQuestion} >Add Question</Button>
                </Box>



                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        marginTop: "20px",
                        m: 1,
                    }}
                >
                    <Button variant="outlined">Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "The announcement has been saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            handleSubmit();
                        }}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Box>
    </div>
  );
}

export default CreateTestTeacher;