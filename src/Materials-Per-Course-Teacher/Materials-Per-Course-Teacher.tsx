import styles from "./Materials-Per-Course-Teacher.module.css";
import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardLarge from "../Card-Large/Card-Large.tsx";
import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Button from "@mui/material/Button";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';


function Buttons(){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

   return ( <Card sx={{ display: 'flex',
        width: isSmallScreen ? '100%' : '250px',
        height: isSmallScreen ? '50%' : '159px',
        backgroundColor: "#FAFAF5",
        borderRadius: '24px',
           alignSelf: 'center',

        }}>
            <Box sx={{ display: 'flex', }}>
                <CardContent sx={{ flex: '1 0 auto',
                    display: 'flex',
                    flexDirection: 'column'
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
                            alignSelf: 'flex-end',
                            marginLeft: 'auto',
                            marginRight: '20px',
                            marginBottom: '10px',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        // component={Link}
                        // to="/materials-per-lecture"
                    > Add Materials
                    </Button>
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
                            marginBottom: '10px',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        // component={Link}
                        // to="/materials-per-lecture"
                    > Add Homework
                    </Button>
                    <Button
                        variant="contained"
                        endIcon={<RemoveRedEyeOutlinedIcon />}
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
                            marginBottom: '10px',
                            border: 'none',
                            textTransform: 'none',
                        }}
                        // component={Link}
                        // to="/materials-per-lecture"
                    > See Homework
                    </Button>
                </CardContent>
            </Box>
        </Card>
   );
}


function MaterialsPerCourseTeacher() {



  return (
    <div>
        <Header />
        <UpperHeader title="WEEK 1" subtitle="introduction"/>
        <div className={styles.container}>
            <CardLarge title="Curs" cardIndex={1} />
            <CardLarge title="Suport" cardIndex={3} />
            <CardLarge title="Video" cardIndex={2} />

            <Buttons />


        </div>
    </div>
  );
}

export default MaterialsPerCourseTeacher;