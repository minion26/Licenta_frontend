import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Tooltip from '@mui/material/Tooltip';
import StartIcon from '@mui/icons-material/Start';
import styles from "./See-Tests-Student.module.css";
import {Link} from "react-router-dom";


function SeeTestsStudent(){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return(
        <div>
            <Header/>
            <UpperHeader title={"Tests"} subtitle={"Course Name"} />
            <div className={styles.container}>
                <CardElongated title={"Test1"} cardIndex={1} height={100}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'space-between',
                        marginLeft: 'auto',
                        marginTop: '5px',
                    }}>
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
                                    fontSize: isSmallScreen ? "10px" : "12px", // Adjust the font size based on screen size
                                    fontWeight: "semi-bold",
                                    alignSelf: "flex-end",
                                    marginLeft: "auto",
                                    marginRight: "20px",
                                    marginBottom: "25px",
                                    border: "none",
                                    textTransform: "none",
                                }}
                                component={Link}
                                to="/take-test"
                            >
                                Start Test
                            </Button>

                        </Tooltip>


                    </Box>
                </CardElongated>
            </div>
        </div>
    );
}

export default SeeTestsStudent;