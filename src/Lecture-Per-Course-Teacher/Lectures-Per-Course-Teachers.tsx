import styles from "./Lectures-Per-Course-Teachers.module.css";
import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
// import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';// import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

function LecturesPerCourseTeachers(){
    return (
        <div>
            <Header />
            <UpperHeader title="Course Name" subtitle="week 1 / 12"/>
            <div className={styles.container}>
                <CardElongated title="WEEK 1" cardIndex={1}>
                    <Button
                        variant="contained"
                        endIcon={<CreateOutlinedIcon />}
                        sx={{
                            width: '150px',
                            height: '50px',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '20px',
                            color: 'rgba(0,0,0,0.75)',
                            fontFamily: 'Inter',
                            fontSize: '12px',
                            fontWeight: 'semi-bold',
                            alignSelf: 'flex-end',
                            marginLeft: 'auto',
                            marginRight: '20px',
                            marginBottom: '50px',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        component={Link}
                        to="/materials-per-lecture"
                    > Add Materials
                    </Button>
                </CardElongated>
                <CardElongated title="WEEK 2" cardIndex={2}>
                    <Button
                        variant="contained"
                        endIcon={<CreateOutlinedIcon />}
                        sx={{
                            width: '150px',
                            height: '50px',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '20px',
                            color: 'rgba(0,0,0,0.75)',
                            fontFamily: 'Inter',
                            fontSize: '12px',
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
                    > Add Materials
                    </Button>
                </CardElongated>
            </div>
        </div>
    );
}

export default LecturesPerCourseTeachers;