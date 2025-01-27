import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import styles from "./See-Tests-Teacher.module.css";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import Tooltip from "@mui/material/Tooltip";
import StartIcon from "@mui/icons-material/Start";
import { Course, ExamDTO, StudentExamFrontDTO } from "../types.ts";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Card from "@mui/material/Card";

function SeeTestsTeacher() {
  const { idCourses } = useParams();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [exams, setExams] = useState<ExamDTO[]>([]);
  const [course, setCourse] = useState<Course>();

  useEffect(() => {
    if (idCourses === "null" || idCourses === "undefined") {
      return;
    }

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
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [idCourses]);

  useEffect(() => {
    if (idCourses === "null" || idCourses === "undefined") {
      return;
    }

    fetch(`http://localhost:8081/api/v1/exam/get/idCourse=${idCourses}`, {
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
        setExams(data);
        console.log(data);
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
  }, [idCourses]);

  const [examStatuses, setExamStatuses] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (Array.isArray(exams)) {
      exams.forEach((exam) => {
        fetch(
          `http://localhost:8081/api/v1/exam/is-started/idExam=${exam.idExam}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          },
        )
          .then((response) => response.json())
          .then((data) => {
            setExamStatuses((prevStatuses) => ({
              ...prevStatuses,
              [exam.idExam]: data,
            }));
          })
          .catch((error) => console.error("Error:", error));
      });
    }
  }, [exams]);

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [studentExams, setStudentExams] = useState<
    Record<string, StudentExamFrontDTO[]>
  >({});

  useEffect(() => {
    exams.forEach((exam) => {
      fetch(`http://localhost:8081/api/v1/student-exam/idExam=${exam.idExam}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setStudentExams((prevStudentExams) => ({
            ...prevStudentExams,
            [exam.idExam]: data,
          }));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }, [exams]);

  return (
    <div>
      <Header />
      <UpperHeader title={"Tests"} subtitle={course ? course.name : " "} />
      {idCourses === "null" || idCourses === "undefined" ? (
        <Card
          sx={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            width: isSmallScreen ? "100%" : "75%",
            height: isSmallScreen ? "50%" : "auto",
            backgroundColor: "#FAFAF5",
            borderRadius: "24px",
            alignSelf: "center",
            marginLeft: isSmallScreen ? "0px" : "140px",
          }}
        >
          <div className={styles.title}>
            <p className={styles.p}>
              No notification to show. <br />
            </p>
          </div>
        </Card>
      ) : null}

      <div className={styles.container}>
        {Array.isArray(exams) ? (
          exams.map((exam, index) => {
            const isStarted = examStatuses[exam.idExam];
            const studentExam = studentExams[exam.idExam];
            return (
              <CardElongated
                key={index}
                title={exam.name}
                cardIndex={index}
                height={isSmallScreen ? 160 : 150}
              >
                <Stack
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    alignItems: "space-around",
                    marginLeft: "auto",
                    marginTop: isSmallScreen ? "0px" : "5px",
                  }}
                >
                  <Tooltip title="Start Test">
                    <Button
                      variant="contained"
                      endIcon={<StartIcon />}
                      sx={{
                        width: isSmallScreen ? "35px" : "85px",
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
                      onClick={() => {
                        //trebuie sa vad daca examenul are studenti
                        if (studentExam.length === 0) {
                          Swal.fire({
                            icon: "error",
                            title: "The test has no students",
                            showConfirmButton: false,
                            // timer: 1500
                          });
                        } else {
                          setIsButtonClicked(true);
                          fetch(
                            `http://localhost:8081/api/v1/exam/start-exam/idExam=${exam.idExam}`,
                            {
                              method: "POST",
                              credentials: "include",
                              headers: {
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*",
                              },
                            },
                          )
                            .then((response) => {
                              if (!response.ok) {
                                return response.json().then((err) => {
                                  throw new Error(err.message);
                                });
                              }
                              if (
                                response.headers
                                  .get("content-type")
                                  ?.includes("application/json")
                              ) {
                                const data = response.json();
                                console.log("File uploaded", data);
                              } else {
                                console.log("No JSON data returned");
                              }

                              window.location.reload();
                            })
                            .catch((error) => {
                              console.error("Error:", error);
                              Swal.fire({
                                icon: "error",
                                title: error.message || "An error occurred",
                                showConfirmButton: false,
                                // timer: 1500
                              });
                            })
                            .finally(() => {
                              // Reset the button click state after the fetch request is completed
                              setIsButtonClicked(false);
                            });
                        }
                      }}
                      // Disable the button if it's clicked or if the test has started
                      disabled={isStarted || isButtonClicked}
                    >
                      Start Test
                    </Button>
                  </Tooltip>

                  <Tooltip title="Edit Test Details">
                    <Button
                      variant="contained"
                      endIcon={<CreateOutlinedIcon />}
                      sx={{
                        width: isSmallScreen ? "35px" : "35px",
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
                      disabled={isStarted || isButtonClicked}
                      component={Link}
                      to={`/edit-test/${idCourses}/${exam.idExam}`}
                    />
                  </Tooltip>
                  <Tooltip title="Add Questions To Test">
                    <Button
                      variant="contained"
                      endIcon={<AddCircleOutlineIcon />}
                      sx={{
                        width: isSmallScreen ? "35px" : "35px",
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
                      disabled={isStarted || isButtonClicked}
                      component={Link}
                      to={`/add-questions-test/${exam.idExam}`}
                    />
                  </Tooltip>
                  <Tooltip title="Add Correct Answers">
                    <Button
                      variant="contained"
                      endIcon={<CheckIcon />}
                      sx={{
                        width: isSmallScreen ? "35px" : "35px",
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
                      disabled={isStarted || isButtonClicked}
                      to={`/add-correct-answers/${exam.idExam}`}
                    />
                  </Tooltip>
                  <Tooltip title="Add Students To Test">
                    <Button
                      variant="contained"
                      endIcon={<PersonAddIcon />}
                      sx={{
                        width: isSmallScreen ? "35px" : "35px",
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
                      disabled={isStarted || isButtonClicked}
                      component={Link}
                      to={`/add-students-to-test/${idCourses}/${exam.idExam}`}
                    />
                  </Tooltip>

                  <Tooltip title="See students">
                    <Button
                      variant="contained"
                      endIcon={<VisibilityIcon />}
                      sx={{
                        width: isSmallScreen ? "35px" : "35px",
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
                      to={`/see-students-test/${exam.idExam}`}
                    />
                  </Tooltip>
                </Stack>
              </CardElongated>
            );
          })
        ) : (
          <p>Loading exams or an error occurred</p>
        )}
      </div>
    </div>
  );
}

export default SeeTestsTeacher;
