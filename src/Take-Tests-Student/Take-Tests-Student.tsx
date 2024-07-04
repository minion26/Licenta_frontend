import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Header from "../Header-students/Header.tsx";
import styles from "./Take-Tests-Student.module.css";
import { TimerComponent } from "../TimerComponent/TimerComponent.tsx";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import {
  ExamDTO,
  QuestionsExamDTO,
  StudentAnswersExamCreationDTO,
} from "../types.ts";

function TakeTestsStudent() {
  const { idExam, idStudentExam } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState<ExamDTO>({
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
  });

  useEffect(() => {
    fetch(`http://localhost:8081/api/v1/exam/idExam=${idExam}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "*",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        setExam(data);
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

  const [examStarted, setExamStarted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/v1/exam/is-started/idExam=${idExam}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": "*",
            },
          },
        );
        const data = await response.json();
        if (data === true) {
          setExamStarted(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000); // 5000 ms = 5 secunde

    return () => {
      clearInterval(intervalId);
    };
  }, [idExam]);

  const [questionExam, setQuestionExam] = useState<QuestionsExamDTO[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8081/api/v1/question-exam/all/idExam=${idExam}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestionExam(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    console.log("time in minutes: ", exam.timeInMinutes);
  }, []);

  const [studentAnswers, setStudentAnswers] =
    useState<StudentAnswersExamCreationDTO>({
      idStudentExam: "",
      answers: [],
    });

  const handleAnswerChange = (idQuestion: string, newAnswer: string) => {
    //find the questionExam with the idQuestion
    const question = questionExam.find(
      (question) => question.questionId === idQuestion,
    );

    if (!question) {
      // Handle the case where the question is not found
      console.error(`Question with id ${idQuestion} not found`);
      return;
    }

    const idQuestionExam = question.idQuestionsExam;

    setStudentAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.answers.findIndex(
        (answer) => answer.idQuestionExam === idQuestionExam,
      );

      if (existingAnswerIndex !== -1) {
        // Update existing answer
        const newAnswers = [...prevAnswers.answers];
        newAnswers[existingAnswerIndex].answer = newAnswer;
        return { ...prevAnswers, answers: newAnswers };
      } else {
        // Add new answer
        return {
          ...prevAnswers,
          answers: [
            ...prevAnswers.answers,
            { idQuestionExam, answer: newAnswer },
          ],
        };
      }
    });
  };

  const [isTabActive, setIsTabActive] = useState(true);
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(false);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (idStudentExam) {
      setStudentAnswers((prevAnswers) => ({
        ...prevAnswers,
        idStudentExam: idStudentExam,
      }));
    }
  }, [idStudentExam]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    console.log("students answers: ", studentAnswers);

    const response = await fetch(
      `http://localhost:8081/api/v1/student-answers/submit`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "*",
        },
        body: JSON.stringify(studentAnswers),
      },
    );

    if (response.ok) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your answers has been submitted",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const error = await response.json();
      Swal.fire({
        icon: "error",
        title: error.message || "An error occurred",
        showConfirmButton: false,
        // timer: 1500
      });
    }

    setIsSubmitted(true);
    navigate(`/tests`);
  };

  useEffect(() => {
    // Adaugă listener-ul la încărcarea componentei
    const blockBackButton = (event: PopStateEvent) => {
      // Dacă submit-ul nu a fost efectuat, blochează navigarea înapoi
      if (!isSubmitted) {
        event.preventDefault();
        window.history.pushState(null, document.title, window.location.href);
      }
    };
    window.addEventListener("popstate", blockBackButton);

    // Înlătură listener-ul la descărcarea componentei
    return () => {
      window.removeEventListener("popstate", blockBackButton);
    };
  }, [isSubmitted]);

  return (
    <div>
      <Header />
      <UpperHeader title={exam.name} subtitle={exam.courseName} />
      <div className={styles.container}>
        {examStarted ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {exam.timeInMinutes ? (
                <TimerComponent
                  onTimeUp={handleSubmit}
                  initialTime={exam.timeInMinutes * 60}
                />
              ) : (
                <div>Loading...</div>
              )}
            </div>

            <Box
              sx={{
                width: "100%",
              }}
            >
              {exam.question.map((question, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    sx={{ m: 1, marginBottom: "20px" }}
                    fullWidth
                    label="Question Text"
                    id={`question-text-${index}`}
                    value={question.questionText}
                  />

                  <TextField
                    fullWidth
                    label="Correct Answer"
                    id={`outlined-start-adornment-correctAnswer-${index}`}
                    sx={{ m: 1, marginBottom: "20px" }}
                    onChange={(e) =>
                      handleAnswerChange(question.idQuestion, e.target.value)
                    }
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
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <h1>Wait for the professor to start the exam</h1>
        )}

        {/*    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>*/}
        {/*        {exam.timeInMinutes ? (*/}
        {/*            <TimerComponent onTimeUp={handleSubmit} time={exam.timeInMinutes * 60}/>*/}
        {/*        ) : (*/}
        {/*            <div>Loading...</div>*/}
        {/*        )}*/}
        {/*    </div>*/}

        {/*    <Box sx={*/}
        {/*        {*/}
        {/*            width: '100%',*/}
        {/*        }*/}
        {/*    }>*/}

        {/*        {exam.question.map((question, index) => (*/}
        {/*            <Box key={index} sx={{display: 'flex', alignItems: 'center'}}>*/}
        {/*                <TextField*/}
        {/*                    sx={{m: 1, marginBottom: "20px"}}*/}
        {/*                    fullWidth*/}
        {/*                    label="Question Text"*/}
        {/*                    id={`question-text-${index}`}*/}
        {/*                    value={question.questionText}*/}

        {/*                />*/}

        {/*                <TextField*/}
        {/*                    fullWidth*/}
        {/*                    label="Correct Answer"*/}
        {/*                    id={`outlined-start-adornment-correctAnswer-${index}`}*/}
        {/*                    sx={{m: 1, marginBottom: "20px"}}*/}
        {/*                    onChange={(e) => handleAnswerChange(question.idQuestion, e.target.value)}*/}
        {/*                    disabled={!isTabActive}*/}
        {/*                />*/}
        {/*            </Box>*/}
        {/*        ))}*/}

        {/*        <Box*/}
        {/*            sx={{*/}
        {/*                display: "flex",*/}
        {/*                justifyContent: "space-between",*/}
        {/*                marginTop: "20px",*/}
        {/*                m: 1,*/}
        {/*            }}*/}
        {/*        >*/}

        {/*            <Button*/}
        {/*                variant="contained"*/}
        {/*                onClick={handleSubmit}*/}
        {/*            >*/}
        {/*                Submit*/}
        {/*            </Button>*/}
        {/*        </Box>*/}

        {/*    </Box>*/}
      </div>
    </div>
  );
}

export default TakeTestsStudent;
