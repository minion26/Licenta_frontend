import styles from "./Lectures-Per-Course-Teachers.module.css";
import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
// import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';// import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import VisibilityIcon from '@mui/icons-material/Visibility';


function Buttons(){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return ( <Card sx={{ display: 'flex',
            width: isSmallScreen ? '100%' : '250px',
            height: isSmallScreen ? '50%' : '150px',
            backgroundColor: "#FAFAF5",
            borderRadius: '24px',
            alignSelf: 'center',
            justifyContent: 'center',

        }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CardContent sx={{
                    flex: '1 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                }}>
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
                            border: 'none',
                            textTransform: 'none',
                        }}
                        component={Link}
                        to="/create-test"
                    > Create Test
                    </Button>

                    <Button
                        variant="contained"
                        endIcon={<VisibilityIcon />}
                        sx={{
                            width: '150px',
                            height: '50px',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '20px',
                            color: 'rgba(0,0,0,0.75)',
                            fontFamily: 'Inter',
                            fontSize: '12px',
                            fontWeight: 'semi-bold',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        component={Link}
                        to="/see-tests"
                    > See Tests
                    </Button>



                </CardContent>
            </Box>
        </Card>
    );
}




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


                <CardElongated title="WEEK 3" cardIndex={3}>
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








                <Buttons />

            </div>
        </div>
    );
}

export default LecturesPerCourseTeachers;