import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import styles from "./Homework-Per-Lecture-Teacher.module.css";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";

function HomeworkPerLectureTeacher() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Header />
            <UpperHeader title="WEEK 1" subtitle="Homeworks" />
            <div className={styles.container}>
                <CardElongated title="student 1" cardIndex={1} >
                    <Button
                        variant="contained"
                        endIcon={<CreateOutlinedIcon />}
                        sx={{
                            width: isSmallScreen ? '100px' : '150px',
                            height: '50px',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '20px',
                            color: 'rgba(0,0,0,0.75)',
                            fontFamily: 'Inter',
                            fontSize: isSmallScreen ? '10px' : '12px', // Adjust the font size based on screen size
                            fontWeight: 'semi-bold',
                            alignSelf: 'flex-end',
                            marginLeft: 'auto',
                            marginRight: '20px',
                            marginBottom: '50px',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        // component={Link}
                        // to="/materials-per-lecture"
                    > Add Feedback
                    </Button>
                </CardElongated>
                <CardElongated title="student 2" cardIndex={2} >
                    <Button
                        variant="contained"
                        endIcon={<CreateOutlinedIcon />}
                        sx={{
                            width: isSmallScreen ? '100px' : '150px',
                            height: '50px',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '20px',
                            color: 'rgba(0,0,0,0.75)',
                            fontFamily: 'Inter',
                            fontSize: isSmallScreen ? '10px' : '12px',
                            fontWeight: 'semi-bold',
                            alignSelf: 'flex-end',
                            marginTop: 'auto',
                            marginLeft: 'auto',
                            marginRight: '20px',
                            marginBottom: '50px',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        // component={Link}
                        // to="/materials-per-lecture"
                    > Add Feedback
                    </Button>
                </CardElongated>
            </div>
        </div>
    );
}

export default HomeworkPerLectureTeacher;