import styles from "./Lecture-Per-Course-Students.module.css";
import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

function LecturePerCourseStudents() {
  return (
    <div>
        <Header />
        <UpperHeader title="Course Name" subtitle="week 1"/>
        <div className={styles.container}>
            <CardElongated title="Lecture 1" description="bla bla" cardIndex={1}>
                <Button
                    variant="contained"
                    endIcon={<ArrowForwardRoundedIcon />}
                    sx={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: '#F5F5F5',
                        borderRadius: '20px',
                        color: '#000000',
                        fontWeight: 'bold',
                        alignSelf: 'flex-end',
                        marginLeft: 'auto',
                        marginRight: '20px',
                        marginBottom: '50px',
                        border: 'none',
                    }}
                    component={Link}
                    to="/materials-per-lecture"
                >
                </Button>
            </CardElongated>
            <CardElongated title="Lecture 2" description="bla bla" cardIndex={2}>
                <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} sx={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#F5F5F5',
                    borderRadius: '20px',
                    color: '#000000',
                    fontWeight: 'bold',
                    alignSelf: 'flex-end',
                    marginLeft: 'auto',
                    marginRight: '20px',
                    marginBottom: '50px',
                    border: 'none',

                }}>
                </Button>
            </CardElongated>
        </div>
    </div>
  );
}

export default LecturePerCourseStudents;