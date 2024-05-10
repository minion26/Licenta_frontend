import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import styles from "./See-Tests-Teacher.module.css";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import Tooltip from '@mui/material/Tooltip';
import AddTaskIcon from '@mui/icons-material/AddTask';
import StartIcon from '@mui/icons-material/Start';


function SeeTestsTeacher(){
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
                                // onClick={startTest}
                            >
                                Start Test
                            </Button>

                        </Tooltip>

                        <Tooltip title="Edit Test Details">
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
                                    marginLeft: "auto",
                                    marginRight: "20px",
                                    marginBottom: "25px",
                                    border: "none",
                                    textTransform: "none",
                                }}
                                component={Link}
                                to="/edit-test"
                            />
                        </Tooltip>
                        <Tooltip title="Add Questions To Test">
                            <Button
                                variant="contained"
                                endIcon={<AddCircleOutlineIcon />}
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
                                    marginLeft: "auto",
                                    marginRight: "20px",
                                    marginBottom: "25px",
                                    border: "none",
                                    textTransform: "none",
                                }}
                                component={Link}
                                to="/add-questions-test"
                            />
                        </Tooltip>
                        <Tooltip title="Add Correct Answers" >
                                <Button
                                    variant="contained"
                                    endIcon={<CheckIcon />}
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
                                        marginLeft: "auto",
                                        marginRight: "20px",
                                        marginBottom: "25px",
                                        border: "none",
                                        textTransform: "none",
                                    }}
                                    component={Link}
                                    to="/add-correct-answers"
                                />
                        </Tooltip>
                        <Tooltip title="Add Students To Test">
                            <Button
                                variant="contained"
                                endIcon={<AddTaskIcon />}
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
                                    marginLeft: "auto",
                                    marginRight: "20px",
                                    marginBottom: "25px",
                                    border: "none",
                                    textTransform: "none",
                                }}
                                component={Link}
                                to="/add-students-to-test"
                            />
                        </Tooltip>
                    </Box>
                </CardElongated>
            </div>
        </div>
    );
}

export default SeeTestsTeacher;