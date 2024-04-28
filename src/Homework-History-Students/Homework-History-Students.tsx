import styles from './Homework-History-Students.module.css';
import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Button from "@mui/material/Button";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function HomeworkHistoryStudents() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <div>
            <Header />
            <UpperHeader title="Homeworks" subtitle="history"/>
            <div className={styles.container}>
                <CardElongated title="Homework 1" cardIndex={1}>
                    <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} sx={{
                        width: isSmallScreen ? '10px' : '50px',
                        height: isSmallScreen ? '20px' : '50px',
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
                    <CardElongated title="Homework 2" cardIndex={2}>
                        <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} sx={{
                            width: isSmallScreen ? '10px' : '50px',
                            height: isSmallScreen ? '20px' : '50px',
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
                <CardElongated title="Homework 3" cardIndex={3}>
                    <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} sx={{
                        width: isSmallScreen ? '10px' : '50px',
                        height: isSmallScreen ? '20px' : '50px',
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

export default HomeworkHistoryStudents;