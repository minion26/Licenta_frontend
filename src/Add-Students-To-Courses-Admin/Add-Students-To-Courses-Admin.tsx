import styles from "./Add-Students-To-Courses-Admin.module.css";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Card from "@mui/material/Card";
import {Importer, ImporterField} from "react-csv-importer";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

function AddStudentsToCoursesAdmin(){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const navigate = useNavigate();

    return (
        <div >
            <Header/>
            <UpperHeader title={"Upload Students"} subtitle={"Courses"}/>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
                            <strong className={styles.str}>Step 1:</strong> Please select the file you want to import. This file can be dragged and
                            dropped into the importer.<br/>
                            <strong className={styles.str}>Step 2:</strong> Determine if the first row of your file is a header. If it is, make sure
                            the 'First row is a header' option is selected.<br/>
                            <strong className={styles.str}>Step 3:</strong> Ensure that your file is in CSV format. This is the only format that the
                            importer can process.<br/>
                            <strong className={styles.str}>Step 4:</strong> Drag and drop the data columns to match the corresponding fields in which
                            the data should be imported.
                        </p>
                    </div>
                </Card>


                <div className={styles.container} style={{
                    marginLeft: isSmallScreen ? "0px" : "200px",
                    marginTop: "10px",
                    width: isSmallScreen ? "100%" : "1000px",
                    alignSelf: "center"}} >

                    <div className={styles.importer}>
                        <Importer

                            dataHandler={async (rows) => {
                                console.log("received batch of rows", rows);
                                await new Promise((resolve) => setTimeout(resolve, 500));
                            }}
                            chunkSize={10000}
                            defaultNoHeader={false}
                            restartable={false}
                            onStart={({file, fields}) => {
                                console.log("starting import of file", file, "with fields", fields);
                            }}
                            onComplete={ async ({file, fields}) => {
                                console.log("finished import of file", file, "with fields", fields);

                                const formData = new FormData();
                                formData.append("file", file);

                                try{
                                    const response = await fetch("http://localhost:8081/api/v1/students-follow-courses/upload", {
                                        method: "POST",
                                        body: formData,
                                        credentials: "include",
                                        headers: {
                                            "Access-Control-Allow-Origin": "*",
                                        },
                                    });
                                    if (!response.ok) {
                                        const error = await response.json();
                                        throw new Error(error.message);
                                    }

                                    if (response.headers.get('content-type')?.includes('application/json')) {
                                        const data = await response.json();
                                        console.log('File uploaded', data);
                                    } else {
                                        console.log('No JSON data returned');
                                    }
                                }catch(error){
                                    console.error(error);
                                    const errorMessage = (error as Error).message;
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'An error occurred',
                                        text: errorMessage,
                                    });
                                }
                            }}
                            onClose={() => {
                                console.log("importer closed");
                                navigate("/main-page-admin")
                            }}
                        >
                            <ImporterField name="studentId" label="Student's id"/>
                            <ImporterField name="courseName" label="Course's name"/>

                        </Importer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddStudentsToCoursesAdmin;