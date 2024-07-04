import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "./Notifications-Teacher.module.css";
import { Link } from "react-router-dom";
import { ReviewStudentAnswersDTO, User } from "../types.ts";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";

function NotificationsTeacher() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [needsReview, setNeedsReview] = useState<ReviewStudentAnswersDTO[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8081/api/v1/student-answers/needs-review`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNeedsReview(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8081/api/v1/users`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <UpperHeader title="Notifications" subtitle="tests" />
      <div className={styles.container}>
        {needsReview.length === 0 ? (
          <Card
            sx={{
              // marginLeft: isSmallScreen ? "0px" : "200px",
              marginTop: "10px",
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
              <p className={styles.p}>
                No notification to show. <br />
              </p>
            </div>
          </Card>
        ) : (
          needsReview.map((review, index) => {
            const user = users.find(
              (user) => user.idUsers === review.idStudent,
            );
            return (
              <CardElongated
                key={index}
                title={user ? user.firstName + " " + user.lastName : " "}
                description={"Question: " + review.question}
                cardIndex={index}
                height={200}
              >
                <Button
                  variant="contained"
                  endIcon={<CreateOutlinedIcon />}
                  sx={{
                    width: isSmallScreen ? "50px" : "75px",
                    height: "50px",
                    backgroundColor: "#F5F5F5",
                    borderRadius: "20px",
                    color: "rgba(0,0,0,0.75)",
                    fontFamily: "Inter",
                    fontSize: isSmallScreen ? "10px" : "12px", // Adjust the font size based on screen size
                    fontWeight: "semi-bold",
                    alignSelf: "flex-end",
                    marginLeft: "75%",
                    marginRight: "20px",
                    marginBottom: "25px",
                    border: "none",
                    textTransform: "none",
                  }}
                  component={Link}
                  to={`/add-review/${review.idStudentAnswerExam}`}
                />
              </CardElongated>
            );
          })
        )}
      </div>
    </div>
  );
}

export default NotificationsTeacher;
