import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Autocomplete} from "@mui/material";
import {useEffect, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate, useParams} from "react-router-dom";
import { ExamCreationDTO, QuestionCreationDTO, Teacher} from "../types.ts";


function CreateTestTeacher() {
    const navigate = useNavigate();
    const {idCourses} = useParams();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    // const [course, setCourse] = useState<Course>({
    //     idCourses: "",
    //     name: "",
    //     year: 0,
    //     semester: 0,
    //     credits: 0,
    //     description: "",
    // });

    const [exam, setExam] = useState<ExamCreationDTO>({
        name: "",
        timeInMinutes: 0,
        totalScore: 0,
        passingScore: 0,
        date: new Date(),
        idTeachers: [],
        questions: [],
        idCourse: "",
    });

    const [backupExam] = useState<ExamCreationDTO>({
        name: "",
        timeInMinutes: 0,
        totalScore: 0,
        passingScore: 0,
        date: new Date(),
        idTeachers: [],
        questions: [],
        idCourse: "",
    });


    // const [question, setQuestion] = useState<QuestionCreationDTO[]>([]);


    // useEffect(() => {
    //     fetch(`http://localhost:8081/api/v1/courses/${idCourses}`, {
    //         method:"GET",
    //         credentials: "include",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //         },
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //
    //                 return response.json().then(err => {
    //                     throw new Error(err.message);
    //                 });
    //             }
    //
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setCourse(data);
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: error.message || 'An error occurred',
    //                 showConfirmButton: false,
    //                 // timer: 1500
    //             });
    //         });
    // }, []);

    const [teachers, setTeachers] = useState<Teacher[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/courses/get-teachers/idCourse=${idCourses}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        throw new Error(err.message);
                    });
                }

                return response.json();
            })
            .then((data) => {
                setTeachers(data);
            })
            .catch((error) => {
                console.error("Error:", error);
                Swal.fire({
                    icon: "error",
                    title: error.message || "An error occurred",
                    showConfirmButton: false,
                    // timer: 1500
                });
            });
    }, []);

    // const teachers = [
    //     {id: "3f1547ec-1fb0-4b90-ad6b-a9a6e2e855bc", name: "Teacher 1"},
    //     {id: "77bd0b6a-1b80-438e-a96a-09bb82f590c0", name: "Teacher 2"},
    //     // more teachers...
    // ];

    const [questions, setQuestions] = useState<QuestionCreationDTO[]>([]);

    // const [questionCount, setQuestionCount] = useState(1);

    const handleAddQuestion = () => {
        setQuestions([...questions, {idQuestion: "", questionText: "", idExam: ""}]);
    };
    function handleDeleteQuestion(index: number) {
        setQuestions(questions.filter((_, i) => i !== index));
    }

    const handleQuestionChange = (index: number, newValue: string) => {
        const newQuestion: QuestionCreationDTO = {
            idQuestion: questions[index].idQuestion, // keep the existing idQuestion
            questionText: newValue, // update the questionText with the new value
            idExam: questions[index].idExam // keep the existing idExam
        };
        setQuestions(questions.map((question, i) => i === index ? newQuestion : question));
    };


    const renderQuestions = () => {
        return questions.map((question, index) => (

                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    sx={{ m: 1, marginBottom: "20px" }}
                    fullWidth
                    label="Question Text"
                    id={`question-text-${index}`}
                    value={question.questionText}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}

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


    const handleExamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "date") {
            const date = new Date(e.target.value);
            const formattedDate = date.toISOString().split('T')[0];
            setExam({
                ...exam,
                [e.target.name]: new Date(formattedDate),
            });
        }else{
            setExam({
                ...exam,
                [e.target.name]: e.target.value,
            });
        }

    }







    const handleSubmit =  async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if(selectedTeachers.length > 0) {

            const questionsToSend = questions.map(question => ({
                questionText: question.questionText
            }));

            const teacherIds = selectedTeachers.map(teacher => teacher.idUsers);

            const examToSend = {
                ...exam,
                date: exam.date.toISOString(),
                idTeacher: teacherIds,
                question: questionsToSend,
                idCourse: idCourses
            };

            console.log("exam", JSON.stringify(examToSend));
            console.log("questions", questions);


            const response = await fetch(`http://localhost:8081/api/v1/exam/create/idCourse=${idCourses}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(examToSend),
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Test created successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                if (response.headers.get("content-type")?.includes("application/json")) {
                    const text = await response.text();
                    if (text.length) {
                        const data = JSON.parse(text);
                        console.log(data);
                    }
                }

                navigate(`/see-tests/${idCourses}`);
            } else {
                const errorData = await response.json();
                await Swal.fire({
                    icon: 'error',
                    title: errorData.message || 'An error occurred',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Please select at least one teacher',
                showConfirmButton: false,
                timer: 1500
            });
        }



    };

    const handleCancel = () => {
        setExam(backupExam);
    }

    const [selectedTeachers, setSelectedTeachers] = useState<Teacher[]>([]);

    const handleTeachersChange = (
        _event: React.SyntheticEvent<Element, Event>,
        newValue: Teacher[]
    ) => {
        setSelectedTeachers(newValue);
    };


  return (
    <form onSubmit={handleSubmit}>
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
                    value={exam.name}
                    name={"name"}
                    onChange={handleExamChange}
                    required
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
                    value={exam.timeInMinutes}
                    name={"timeInMinutes"}
                    onChange={handleExamChange}
                    required
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
                    value={exam.totalScore}
                    name={"totalScore"}
                    onChange={handleExamChange}
                    required
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
                    value={exam.passingScore}
                    name={"passingScore"}
                    onChange={handleExamChange}
                    required
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
                    value={exam.date.toISOString().split('T')[0]}
                    name={"date"}
                    onChange={handleExamChange}
                    required
                />

                <Autocomplete
                    multiple
                    id="teachers-autocomplete"
                    options={teachers}
                    sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                    getOptionLabel={(option) => option.firstName + " " + option.lastName}
                    renderInput={(params) => <TextField {...params} label="Teachers" />}
                    onChange={handleTeachersChange}
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
                    <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    <Button
                        variant="contained"
                        type={"submit"}

                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Box>
    </form>
  );
}

export default CreateTestTeacher;