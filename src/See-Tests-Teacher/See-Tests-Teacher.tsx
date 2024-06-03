import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import styles from "./See-Tests-Teacher.module.css";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Link, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import Tooltip from '@mui/material/Tooltip';
import AddTaskIcon from '@mui/icons-material/AddTask';
import StartIcon from '@mui/icons-material/Start';
import {Course, ExamDTO} from "../types.ts";
import {useEffect, useState} from "react";


function SeeTestsTeacher(){
    const {idCourses} = useParams();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const [exams, setExams] = useState<ExamDTO[]>([]);
    const [course, setCourse] = useState<Course>();

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/courses/${idCourses}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCourse(data);
                console.log(data)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/exam/get/idCourse=${idCourses}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setExams(data);
                console.log(data)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [idCourses]);

    return(
        <div>
            <Header/>
            <UpperHeader title={"Tests"} subtitle={course ? course.name : " "} />
            <div className={styles.container}>
                {
                    exams.map((exam, index) => {
                        return <CardElongated key={index} title={exam.name}  cardIndex={index} height={isSmallScreen ? 150 : 100}>
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'flex-end',
                                alignItems: 'space-between',
                                marginLeft: 'auto',
                                marginTop: isSmallScreen ? "0px" : "5px",
                            }}>
                                <Tooltip title="Start Test">
                                    <Button
                                        variant="contained"
                                        endIcon={<StartIcon />}
                                        sx={{
                                            width: isSmallScreen ? "35px" : "130px",
                                            height: "50px",
                                            backgroundColor: "#F5F5F5",
                                            borderRadius: "20px",
                                            color: "rgba(0,0,0,0.75)",
                                            fontFamily: "Inter",
                                            fontSize: isSmallScreen ? "10px" : "12px", // Adjust the font size based on screen size
                                            fontWeight: "semi-bold",
                                            alignSelf: "flex-end",
                                            marginLeft: "auto",
                                            marginRight: isSmallScreen ? "5px" : "20px",
                                            marginBottom: isSmallScreen ? "0px" : "25px",
                                            border: "none",
                                            textTransform: "none",
                                        }}
                                        // onClick={startTest}
                                    >
                                        Start Test
                                    </Button>

                                </Tooltip>

                                <Tooltip title="Edit Test Details">
                                    <Button
                                        variant="contained"
                                        endIcon={<CreateOutlinedIcon />}
                                        sx={{
                                            width: isSmallScreen ? "35px" : "75px",
                                            height: "50px",
                                            backgroundColor: "#F5F5F5",
                                            borderRadius: "20px",
                                            color: "rgba(0,0,0,0.75)",
                                            fontFamily: "Inter",
                                            fontSize: isSmallScreen ? "10px" : "12px", // Adjust the font size based on screen size
                                            fontWeight: "semi-bold",
                                            alignSelf: "flex-end",
                                            marginLeft: "auto",
                                            marginRight: isSmallScreen ? "5px" : "20px",
                                            marginBottom: isSmallScreen ? "0px" : "25px",
                                            border: "none",
                                            textTransform: "none",
                                        }}
                                        component={Link}
                                        to={`/edit-test/${idCourses}/${exam.idExam}`}
                                    />
                                </Tooltip>
                                <Tooltip title="Add Questions To Test">
                                    <Button
                                        variant="contained"
                                        endIcon={<AddCircleOutlineIcon />}
                                        sx={{
                                            width: isSmallScreen ? "35px" : "75px",
                                            height: "50px",
                                            backgroundColor: "#F5F5F5",
                                            borderRadius: "20px",
                                            color: "rgba(0,0,0,0.75)",
                                            fontFamily: "Inter",
                                            fontSize: isSmallScreen ? "10px" : "12px", // Adjust the font size based on screen size
                                            fontWeight: "semi-bold",
                                            alignSelf: "flex-end",
                                            marginLeft: "auto",
                                            marginRight: isSmallScreen ? "5px" : "20px",
                                            marginBottom: isSmallScreen ? "0px" : "25px",
                                            border: "none",
                                            textTransform: "none",
                                        }}
                                        component={Link}
                                        to={`/add-questions-test/${exam.idExam}`}
                                    />
                                </Tooltip>
                                <Tooltip title="Add Correct Answers" >
                                    <Button
                                        variant="contained"
                                        endIcon={<CheckIcon />}
                                        sx={{
                                            width: isSmallScreen ? "35px" : "75px",
                                            height: "50px",
                                            backgroundColor: "#F5F5F5",
                                            borderRadius: "20px",
                                            color: "rgba(0,0,0,0.75)",
                                            fontFamily: "Inter",
                                            fontSize: isSmallScreen ? "10px" : "12px", // Adjust the font size based on screen size
                                            fontWeight: "semi-bold",
                                            alignSelf: "flex-end",
                                            marginLeft: "auto",
                                            marginRight: isSmallScreen ? "5px" : "20px",
                                            marginBottom: isSmallScreen ? "0px" : "25px",
                                            border: "none",
                                            textTransform: "none",
                                        }}
                                        component={Link}
                                        to={`/add-correct-answers/${exam.idExam}`}
                                    />
                                </Tooltip>
                                <Tooltip title="Add Students To Test">
                                    <Button
                                        variant="contained"
                                        endIcon={<AddTaskIcon />}
                                        sx={{
                                            width: isSmallScreen ? "35px" : "75px",
                                            height: "50px",
                                            backgroundColor: "#F5F5F5",
                                            borderRadius: "20px",
                                            color: "rgba(0,0,0,0.75)",
                                            fontFamily: "Inter",
                                            fontSize: isSmallScreen ? "10px" : "12px", // Adjust the font size based on screen size
                                            fontWeight: "semi-bold",
                                            alignSelf: "flex-end",
                                            marginLeft: "auto",
                                            marginRight: isSmallScreen ? "5px" : "20px",
                                            marginBottom: isSmallScreen ? "0px" : "25px",
                                            border: "none",
                                            textTransform: "none",
                                        }}
                                        component={Link}
                                        to={`/add-students-to-test/${idCourses}/${exam.idExam}`}
                                    />
                                </Tooltip>
                            </Box>
                        </CardElongated>
                    })
                }


                {/*<CardElongated title={"Test1"} cardIndex={1} height={isSmallScreen ? 150 : 100}>*/}
                {/*    <Box sx={{*/}
                {/*        display: 'flex',*/}
                {/*        flexWrap: 'wrap',*/}
                {/*        justifyContent: 'flex-end',*/}
                {/*        alignItems: 'space-between',*/}
                {/*        marginLeft: 'auto',*/}
                {/*        marginTop: isSmallScreen ? "0px" : "5px",*/}
                {/*    }}>*/}
                {/*        <Tooltip title="Start Test">*/}
                {/*            <Button*/}
                {/*                variant="contained"*/}
                {/*                endIcon={<StartIcon />}*/}
                {/*                sx={{*/}
                {/*                    width: isSmallScreen ? "35px" : "130px",*/}
                {/*                    height: "50px",*/}
                {/*                    backgroundColor: "#F5F5F5",*/}
                {/*                    borderRadius: "20px",*/}
                {/*                    color: "rgba(0,0,0,0.75)",*/}
                {/*                    fontFamily: "Inter",*/}
                {/*                    fontSize: isSmallScreen ? "10px" : "12px", // Adjust the font size based on screen size*/}
                {/*                    fontWeight: "semi-bold",*/}
                {/*                    alignSelf: "flex-end",*/}
                {/*                    marginLeft: "auto",*/}
                {/*                    marginRight: isSmallScreen ? "5px" : "20px",*/}
                {/*                    marginBottom: isSmallScreen ? "0px" : "25px",*/}
                {/*                    border: "none",*/}
                {/*                    textTransform: "none",*/}
                {/*                }}*/}
                {/*                // onClick={startTest}*/}
                {/*            >*/}
                {/*                Start Test*/}
                {/*            </Button>*/}

                {/*        </Tooltip>*/}

                {/*        <Tooltip title="Edit Test Details">*/}
                {/*            <Button*/}
                {/*                variant="contained"*/}
                {/*                endIcon={<CreateOutlinedIcon />}*/}
                {/*                sx={{*/}
                {/*                    width: isSmallScreen ? "35px" : "75px",*/}
                {/*                    height: "50px",*/}
                {/*                    backgroundColor: "#F5F5F5",*/}
                {/*                    borderRadius: "20px",*/}
                {/*                    color: "rgba(0,0,0,0.75)",*/}
                {/*                    fontFamily: "Inter",*/}
                {/*                    fontSize: isSmallScreen ? "10px" : "12px", // Adjust the font size based on screen size*/}
                {/*                    fontWeight: "semi-bold",*/}
                {/*                    alignSelf: "flex-end",*/}
                {/*                    marginLeft: "auto",*/}
                {/*                    marginRight: isSmallScreen ? "5px" : "20px",*/}
                {/*                    marginBottom: isSmallScreen ? "0px" : "25px",*/}
                {/*                    border: "none",*/}
                {/*                    textTransform: "none",*/}
                {/*                }}*/}
                {/*                component={Link}*/}
                {/*                to="/edit-test"*/}
                {/*            />*/}
                {/*        </Tooltip>*/}
                {/*        <Tooltip title="Add Questions To Test">*/}
                {/*            <Button*/}
                {/*                variant="contained"*/}
                {/*                endIcon={<AddCircleOutlineIcon />}*/}
                {/*                sx={{*/}
                {/*                    width: isSmallScreen ? "35px" : "75px",*/}
                {/*                    height: "50px",*/}
                {/*                    backgroundColor: "#F5F5F5",*/}
                {/*                    borderRadius: "20px",*/}
                {/*                    color: "rgba(0,0,0,0.75)",*/}
                {/*                    fontFamily: "Inter",*/}
                {/*                    fontSize: isSmallScreen ? "10px" : "12px", // Adjust the font size based on screen size*/}
                {/*                    fontWeight: "semi-bold",*/}
                {/*                    alignSelf: "flex-end",*/}
                {/*                    marginLeft: "auto",*/}
                {/*                    marginRight: isSmallScreen ? "5px" : "20px",*/}
                {/*                    marginBottom: isSmallScreen ? "0px" : "25px",*/}
                {/*                    border: "none",*/}
                {/*                    textTransform: "none",*/}
                {/*                }}*/}
                {/*                component={Link}*/}
                {/*                to="/add-questions-test"*/}
                {/*            />*/}
                {/*        </Tooltip>*/}
                {/*        <Tooltip title="Add Correct Answers" >*/}
                {/*                <Button*/}
                {/*                    variant="contained"*/}
                {/*                    endIcon={<CheckIcon />}*/}
                {/*                    sx={{*/}
                {/*                        width: isSmallScreen ? "35px" : "75px",*/}
                {/*                        height: "50px",*/}
                {/*                        backgroundColor: "#F5F5F5",*/}
                {/*                        borderRadius: "20px",*/}
                {/*                        color: "rgba(0,0,0,0.75)",*/}
                {/*                        fontFamily: "Inter",*/}
                {/*                        fontSize: isSmallScreen ? "10px" : "12px", // Adjust the font size based on screen size*/}
                {/*                        fontWeight: "semi-bold",*/}
                {/*                        alignSelf: "flex-end",*/}
                {/*                        marginLeft: "auto",*/}
                {/*                        marginRight: isSmallScreen ? "5px" : "20px",*/}
                {/*                        marginBottom: isSmallScreen ? "0px" : "25px",*/}
                {/*                        border: "none",*/}
                {/*                        textTransform: "none",*/}
                {/*                    }}*/}
                {/*                    component={Link}*/}
                {/*                    to="/add-correct-answers"*/}
                {/*                />*/}
                {/*        </Tooltip>*/}
                {/*        <Tooltip title="Add Students To Test">*/}
                {/*            <Button*/}
                {/*                variant="contained"*/}
                {/*                endIcon={<AddTaskIcon />}*/}
                {/*                sx={{*/}
                {/*                    width: isSmallScreen ? "35px" : "75px",*/}
                {/*                    height: "50px",*/}
                {/*                    backgroundColor: "#F5F5F5",*/}
                {/*                    borderRadius: "20px",*/}
                {/*                    color: "rgba(0,0,0,0.75)",*/}
                {/*                    fontFamily: "Inter",*/}
                {/*                    fontSize: isSmallScreen ? "10px" : "12px", // Adjust the font size based on screen size*/}
                {/*                    fontWeight: "semi-bold",*/}
                {/*                    alignSelf: "flex-end",*/}
                {/*                    marginLeft: "auto",*/}
                {/*                    marginRight: isSmallScreen ? "5px" : "20px",*/}
                {/*                    marginBottom: isSmallScreen ? "0px" : "25px",*/}
                {/*                    border: "none",*/}
                {/*                    textTransform: "none",*/}
                {/*                }}*/}
                {/*                component={Link}*/}
                {/*                to="/add-students-to-test"*/}
                {/*            />*/}
                {/*        </Tooltip>*/}
                {/*    </Box>*/}
                {/*</CardElongated>*/}
            </div>
        </div>
    );
}

export default SeeTestsTeacher;