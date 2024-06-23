import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Header from "../Header-teacher/Header.tsx";
import { Link, useParams } from "react-router-dom";
import { ExamDTO, StudentExamFrontDTO } from "../types.ts";
import { useEffect, useState } from "react";
import styles from "./See-Students-Per-Test-Teacher.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";

function SeeStudentsPerTestTeacher() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { idExam } = useParams();
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
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setExam(data);
      })
      .catch((error) => console.error("An error occured!", error));
  }, []);

  const [studentExam, setStudentExam] = useState<StudentExamFrontDTO[]>([]);
  const [studentEdit, setStudentEdit] = useState<StudentExamFrontDTO>({
    idStudentExam: "",
    idStudent: "",
    studentName: "",
    idExam: "",
    score: 0,
    examStatus: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:8081/api/v1/exam/get-students/idExam=${idExam}`, {
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
        setStudentExam(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("An error occured!", error);
        Swal.fire({
          icon: "error",
          title: error.message || "An error occurred",
          showConfirmButton: false,
          // timer: 1500
        });
      });
  }, []);

  const [open, setOpen] = useState(false);
  const handleClickOpen = ({ idStudentExam }: { idStudentExam: string }) => {
    setOpen(true);

    //facem si un get sa luam datele per student
    fetch(
      `http://localhost:8081/api/v1/student-exam/get/idStudentExam=${idStudentExam}`,
      {
        method: "GET",
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
        return response.json();
      })
      .then((data) => {
        setStudentEdit(data);
      })
      .catch((error) => {
        console.error("An error occured!", error);
        Swal.fire({
          icon: "error",
          title: error.message || "An error occurred",
          showConfirmButton: false,
          // timer: 1500
        });
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    { idStudentExam }: { idStudentExam: string },
  ) => {
    event.preventDefault();

    handlePATCH(idStudentExam);
    handleClose();
  };

  type InputChangeEvent = React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement
  >;
  type SelectChangeEventNumber = SelectChangeEvent<number>;

  function handleInput(event: InputChangeEvent | SelectChangeEventNumber) {
    const newValue = event.target.value;
    setStudentEdit({
      ...studentEdit,
      [event.target.name]: newValue,
    });
  }

  const handlePATCH = async (idStudentExam: string) => {
    const response = await fetch(
      `http://localhost:8081/api/v1/student-exam/update/idStudentExam=${idStudentExam}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(studentEdit),
      },
    );

    if (response.ok) {
      Swal.fire({
        title: "Success",
        text: "Student updated successfully",
        icon: "success",
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
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <UpperHeader
        title={exam.name}
        subtitle={new Date(exam.date).toLocaleDateString()}
      />
      <Header />
      <div className={styles.cardContainer}>
        {studentExam.length === 0 ? (
          <Card
            sx={{
              // marginLeft: isSmallScreen ? "0px" : "200px",
              // marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              width: isSmallScreen ? "100%" : "75%",
              height: isSmallScreen ? "50%" : "auto",
              backgroundColor: "#FAFAF5",
              borderRadius: "24px",
              alignSelf: "center",
            }}
          >
            <div className={styles.title}>
              <p className={styles.p}>No students enrolled for this exam.</p>
            </div>
          </Card>
        ) : (
          studentExam.map((student, index) => (
            <div key={index}>
              <CardElongated
                height={150}
                title={student.studentName}
                description={` Score : ${student.score === -1 ? "Not graded" : student.score}, Exam Status: ${(() => {
                  switch (student.examStatus) {
                    case -1:
                      return "Not started";
                    case 0:
                      return "Failed";
                    case 1:
                      return "Passed";
                    default:
                      return student.examStatus;
                  }
                })()}`}
                cardIndex={index}
              >
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      flex: "1 0 auto",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Button
                      variant="contained"
                      endIcon={<DeleteIcon />}
                      sx={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#F5F5F5",
                        borderRadius: "20px",
                        color: "rgba(0,0,0,0.75)",
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontWeight: "semi-bold",
                        alignSelf: "flex-end",
                        marginLeft: "auto",
                        marginRight: "20px",
                        marginBottom: "25px",
                        border: "none",
                        textTransform: "none",
                      }}
                      // component={Link}
                      // to="/homeworks-per-lecture"

                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            fetch(
                              `http://localhost:8081/api/v1/student-exam/delete/idStudentExam=${student.idStudentExam}`,
                              {
                                method: "DELETE",
                                credentials: "include",
                                headers: {
                                  "Content-Type": "application/json",
                                  "Access-Control-Allow-Origin": "*",
                                },
                              },
                            )
                              .then((response) => {
                                if (!response.ok) {
                                  console.error(
                                    `Server responded with status code ${response.status}`,
                                  );
                                  throw new Error(
                                    "Failed to delete the account",
                                  );
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
                              })
                              .then((data) => {
                                console.log(data);
                                Swal.fire({
                                  title: "Deleted!",
                                  text: "The file has been deleted.",
                                  icon: "success",
                                });

                                window.location.reload();
                              })
                              .catch((error) => {
                                console.error("Error:", error);
                              });
                          }
                        });
                      }}
                    ></Button>

                    <Tooltip title="See student's answers">
                      <Button
                        variant="contained"
                        endIcon={<VisibilityIcon />}
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
                        to={`/see-students-answers-per-test/${idExam}/${student.idStudent}`}
                      />
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
                        onClick={() =>
                          handleClickOpen({
                            idStudentExam: student.idStudentExam,
                          })
                        }
                      />
                    </Tooltip>
                  </Box>
                </Box>
              </CardElongated>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Edit Student</DialogTitle>
                <form
                  onSubmit={(event) =>
                    handleSubmit(event, {
                      idStudentExam: studentEdit.idStudentExam,
                    })
                  }
                >
                  <DialogContent>
                    <DialogContentText>
                      To edit the student, please change the score or the exam
                      status.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Name"
                      name={"studentName"}
                      type="text"
                      value={studentEdit.studentName}
                      fullWidth
                      required
                    />
                    <TextField
                      margin="dense"
                      id="score"
                      label="Score"
                      name={"score"}
                      type="number"
                      value={studentEdit.score}
                      onChange={handleInput}
                      fullWidth
                      required
                    />
                    <Select
                      value={studentEdit.examStatus}
                      onChange={handleInput}
                      name="examStatus"
                      fullWidth
                      required
                    >
                      <MenuItem value={-1}>Not started</MenuItem>
                      <MenuItem value={0}>Failed</MenuItem>
                      <MenuItem value={1}>Passed</MenuItem>
                    </Select>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button type="submit" color="primary">
                      Create
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SeeStudentsPerTestTeacher;
