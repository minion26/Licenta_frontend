import styles from './Homework-History-Students.module.css';
import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Button from "@mui/material/Button";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {StudentHomeworkDTO} from "../types.ts";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function HomeworkHistoryStudents() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [studentHomework, setStudentHomework] = useState<StudentHomeworkDTO[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/student-homework/all-by-student`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setStudentHomework(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return(
        <div>
            <Header />
            <UpperHeader title="Homeworks" subtitle="history"/>
            <div className={styles.container}>

                {
                    studentHomework.map((homework, index) => {
                        return (
                            <CardElongated title={homework.homeworkName} description={"Grade: " + homework.grade} cardIndex={index}>
                                <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} sx={{
                                    width: isSmallScreen ? '10px' : '50px',
                                    height: isSmallScreen ? '20px' : '50px',
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: '20px',
                                    color: '#000000',
                                    fontWeight: 'bold',
                                    alignSelf: 'flex-end',
                                    marginLeft: '75%',
                                    marginRight: '20px',
                                    marginBottom: '50px',
                                    border: 'none',
                                }}
                                    component={Link}
                                    to={`/see-homeworks/${homework.idHomework}`}
                                >
                                </Button>
                            </CardElongated>
                        )
                    })
                }


            </div>
        </div>
    );
}

export default HomeworkHistoryStudents;