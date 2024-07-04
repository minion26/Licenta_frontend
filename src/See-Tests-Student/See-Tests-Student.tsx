import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import StartIcon from "@mui/icons-material/Start";
import styles from "./See-Tests-Student.module.css";
import { Link } from "react-router-dom";
import Header from "../Header-students/Header.tsx";
import { ExamDetailsDTO, StudentExamDetailsDTO } from "../types.ts";
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Swal from "sweetalert2";

function SeeTestsStudent() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [exams, setExams] = useState<StudentExamDetailsDTO[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8081/api/v1/student-exam/get-by-id-student`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setExams(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const notStartedExams = exams.filter((exam) => exam.examStatus === -1);
  const startedExams = exams.filter((exam) => exam.examStatus !== -1);

  useEffect(() => {
    console.log("not started: ", notStartedExams);
    console.log("started: ", startedExams);
  }, [exams]);

  const [detailsExam, setDetailsExam] = useState<
    Record<string, ExamDetailsDTO>
  >({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    startedExams.forEach((exam) => {
      fetch(
        `http://localhost:8081/api/v1/exam/get-exam-extra-details/idExam=${exam.idExam}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "*",
          },
        },
      )
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              throw new Error(error.message);
            });
          }
          return response.json();
        })
        .then((data) => {
          setDetailsExam((prevDetails) => ({
            ...prevDetails,
            [exam.idExam]: data,
          }));
          console.log("details: ", data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error.",
            text: error.message,
          });
        });
    });
  }, [startedExams]);
  //daca exista in local storage timer il sterg
  useEffect(() => {
    localStorage.removeItem("timer");
  }, []);

  useEffect(() => {
    // Sort the startedExams array in descending order by date
    startedExams.sort((a, b) => {
      const dateA = new Date(detailsExam[a.idExam].date);
      const dateB = new Date(detailsExam[b.idExam].date);

      // Compare by year, then month, then day
      const yearDifference = dateB.getFullYear() - dateA.getFullYear();
      if (yearDifference !== 0) return yearDifference;

      const monthDifference = dateB.getMonth() - dateA.getMonth();
      if (monthDifference !== 0) return monthDifference;

      return dateB.getDate() - dateA.getDate();
    });
  }, []);

  return (
    <div>
      <Header />
      <UpperHeader title={"Tests"} subtitle={"date"} />
      <div className={styles.container}>
        <Box
          sx={{
            border: "3px solid red",
            padding: "20px",
            margin: "10px",
            borderRadius: "10px",
            fontFamily: "Newsreader , sans-serif",
            color: "black",
            // fontWeight: 'bold',
            fontSize: "20px",
            backgroundColor: "#FAFAF5",
          }}
        >
          <p>If you switch the tab, you can't resolve any more questions.</p>
          <p>
            When the timer is up, your work will be automatically submitted.
          </p>
        </Box>
        <div className={styles.notStartedExams}>
          {notStartedExams.map((exam, index) => {
            return (
              <CardElongated
                title={exam.courseName}
                description={` Score : Not graded , Exam Status: Not started`}
                cardIndex={index}
                height={160}
                key={index}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "space-between",
                    marginLeft: "auto",
                    marginTop: "5px",
                  }}
                >
                  <Tooltip title="Start Test">
                    <Button
                      variant="contained"
                      endIcon={<StartIcon />}
                      sx={{
                        width: isSmallScreen ? "75px" : "130px",
                        height: "50px",
                        backgroundColor: "#F5F5F5",
                        borderRadius: "20px",
                        color: "rgba(0,0,0,0.75)",
                        fontFamily: "Inter",
                        fontSize: isSmallScreen ? "10px" : "12px",
                        fontWeight: "semi-bold",
                        alignSelf: "flex-end",
                        marginLeft: "auto",
                        marginRight: "20px",
                        marginBottom: "25px",
                        border: "none",
                        textTransform: "none",
                      }}
                      component={Link}
                      to={`/take-test/${exam.idExam}/${exam.idStudentExam}`}
                    >
                      Start Test
                    </Button>
                  </Tooltip>
                </Box>
              </CardElongated>
            );
          })}
        </div>

        <div
          style={{ height: "4px", backgroundColor: "#007EB4", width: "100%" }}
        />

        <div className={styles.notStartedExams}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            startedExams.map((exam, index) => {
              return (
                <CardElongated
                  title={
                    exam.courseName +
                    " - " +
                    (detailsExam[exam.idExam]
                      ? detailsExam[exam.idExam].name
                      : "Loading...")
                  }
                  description={`Date: ${
                    detailsExam[exam.idExam]
                      ? detailsExam[exam.idExam].date.split("T")[0]
                      : "Loading..."
                  } Score : ${exam.score === -1 ? "Not graded" : exam.score}, Exam Status: ${(() => {
                    switch (exam.examStatus) {
                      case -1:
                        return "Not started";
                      case 0:
                        return "Failed";
                      case 1:
                        return "Passed";
                      default:
                        return exam.examStatus;
                    }
                  })()}`}
                  cardIndex={index + 1}
                  height={160}
                  key={index}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "space-between",
                      marginLeft: "auto",
                      marginTop: "5px",
                    }}
                  >
                    <Tooltip title="View Test">
                      <Button
                        variant="contained"
                        endIcon={<RemoveRedEyeIcon />}
                        sx={{
                          width: isSmallScreen ? "75px" : "130px",
                          height: "50px",
                          backgroundColor: "#F5F5F5",
                          borderRadius: "20px",
                          color: "rgba(0,0,0,0.75)",
                          fontFamily: "Inter",
                          fontSize: isSmallScreen ? "10px" : "12px",
                          fontWeight: "semi-bold",
                          alignSelf: "flex-end",
                          marginLeft: "auto",
                          marginRight: "20px",
                          marginBottom: "25px",
                          border: "none",
                          textTransform: "none",
                        }}
                        component={Link}
                        to={`/see-submitted-test/${exam.idExam}`}
                      >
                        View Test
                      </Button>
                    </Tooltip>
                  </Box>
                </CardElongated>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default SeeTestsStudent;
