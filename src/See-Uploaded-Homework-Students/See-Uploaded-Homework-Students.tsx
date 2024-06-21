import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Header from "../Header-students/Header.tsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from "./See-Uploaded-Homework-Students.module.css";
import {Homework} from "../types.ts";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import Tooltip from "@mui/material/Tooltip";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DownloadIcon from '@mui/icons-material/Download';


function SeeUploadedHomeworkStudents(){
    const {idHomework} = useParams();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [homework, setHomework] = useState<Homework>({
        idHomework: "",
        idStudent: "",
        nrMatricol: "",
        firstNameStudent: "",
        lastNameStudent: "",
        grade: 0,
        uploadDate: null,
        fileName: []
    });

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/homework/idHomework=${idHomework}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if(!response.ok){
                    return response.json().then(error => {
                        throw new Error(error.message);

                    })
                }
                return response.json();
            })
            .then(data => {
                setHomework(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: (error as Error).message || 'An error occurred',
                    showConfirmButton: false,
                    // timer: 1500
                });

            });
    }, []);


    return (
        <div>
            <UpperHeader title={"See homework"} subtitle={"date"}/>
            <Header/>
            <div className={styles.cardContainer}>
                <div className={styles.divContainer}>
                <Button
                    variant="contained"
                    endIcon={<CreateOutlinedIcon/>}
                    sx={{
                        width: isSmallScreen ? '150px' : '175px',
                        height: '50px',
                        backgroundColor: '#F5F5F5',
                        borderRadius: '20px',
                        color: 'rgba(0,0,0,0.75)',
                        fontFamily: 'Inter',
                        fontSize: isSmallScreen ? '10px' : '12px',
                        fontWeight: 'semi-bold',
                        alignSelf: 'flex-end',
                        marginTop: 'auto',
                        marginLeft: '30px',
                        marginRight: '20px',
                        marginBottom: '50px',
                        border: 'none',
                        textTransform: 'none',
                    }}
                    component={Link}
                    to={`/see-homework-feedback/${idHomework}`}
                >
                    See Feedback
                </Button>
                </div>

            {
                homework.fileName.map((file, index) => {
                    console.log(file);
                    const nameFile = file.split("/").pop();
                    let uuid = "";
                    return (
                        <CardElongated height={145} title={nameFile ? nameFile : file} cardIndex={index} key={index}>
                        <Box sx={{ display: "flex" }}>
                            <Box
                                sx={{
                                    flex: "1 0 auto",
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <Tooltip title={"Delete the homework"}>
                                <Button
                                    variant="contained"
                                    endIcon={<DeleteIcon />}
                                    sx={{
                                        width: "50px",
                                        height: "50px",
                                        backgroundColor: "#F5F5F5",
                                        borderRadius: "20px",
                                        color: "rgba(0,0,0,0.75)",
                                        fontFamily: "Inter",
                                        fontSize: "12px",
                                        fontWeight: "semi-bold",
                                        alignSelf: "flex-end",
                                        marginLeft: "auto",
                                        marginRight: "20px",
                                        marginBottom: "25px",
                                        border: "none",
                                        textTransform: "none",
                                    }}
                                    // component={Link}
                                    // to="/homeworks-per-lecture"

                                    onClick={() => {
                                        fetch(`http://localhost:8081/api/v1/homework/get-homework-id-file/idHomework=${homework.idHomework}/name=${nameFile}`, {
                                            method: 'GET',
                                            credentials: 'include',
                                            headers: {
                                                'Access-Control-Allow-Origin': '*',
                                                'Content-Type': 'application/json',
                                            }
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                console.log(data);
                                                uuid = data;
                                                return data;
                                            })

                                        Swal.fire({
                                            title: "Are you sure?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Yes, delete it!"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                //iau id ul din baza de date



                                                fetch(`http://localhost:8081/api/v1/homework/delete/${uuid}`, {
                                                    method: 'DELETE',
                                                    credentials: 'include',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        "Access-Control-Allow-Origin": "*",
                                                    },
                                                })
                                                    .then((response) => {
                                                        if (!response.ok) {
                                                            console.error(`Server responded with status code ${response.status}`);
                                                            throw new Error('Failed to delete the account');
                                                        }
                                                        const contentType = response.headers.get("content-type");
                                                        if (contentType && contentType.indexOf("application/json") !== -1) {
                                                            return response.json();
                                                        }else{
                                                            console.log("No JSON returned");
                                                        }

                                                    })
                                                    .then((data) => {
                                                        console.log(data);
                                                        Swal.fire({
                                                            title: "Deleted!",
                                                            text: "The file has been deleted.",
                                                            icon: "success"
                                                        });
                                                        //delete the file from the homework too



                                                        window.location.reload();
                                                    })
                                                    .catch((error) => {
                                                        console.error('Error:', error);
                                                    });
                                            }
                                        });
                                    }}

                                >
                                </Button>
                                </Tooltip>

                                <Tooltip title={"Download the homework"}>
                                    <Button
                                        variant="contained"
                                        endIcon={<DownloadIcon />}
                                        sx={{
                                            width: "50px",
                                            height: "50px",
                                            backgroundColor: "#F5F5F5",
                                            borderRadius: "20px",
                                            color: "rgba(0,0,0,0.75)",
                                            fontFamily: "Inter",
                                            fontSize: "12px",
                                            fontWeight: "semi-bold",
                                            alignSelf: "flex-end",
                                            marginLeft: "20px",
                                            marginRight: "20px",
                                            marginBottom: "25px",
                                            border: "none",
                                            textTransform: "none",
                                        }}
                                        // component={Link}
                                        // to="/homeworks-per-lecture"

                                        onClick={() => {
                                            if(nameFile === undefined){
                                                return;
                                            }
                                            fetch(`http://localhost:8081/api/v1/homework/download/${nameFile}`, {
                                                method: 'GET',
                                                credentials: 'include',
                                                headers: {
                                                    'Access-Control-Allow-Origin': '*',
                                                    // 'Content-Type': 'application/json',
                                                },
                                            })
                                                .then(response => response.blob())
                                                .then(blob => {
                                                    // Crearea unui URL pentru blob
                                                    const url = window.URL.createObjectURL(blob);
                                                    // Crearea unui link în document
                                                    const a = document.createElement('a');
                                                    a.style.display = 'none';
                                                    a.href = url;
                                                    // Numele fișierului pentru descărcare
                                                    a.download = nameFile;
                                                    // Adăugarea linkului în document
                                                    document.body.appendChild(a);
                                                    // Simularea unui click pe link
                                                    a.click();
                                                    // Curățarea referinței la URL
                                                    window.URL.revokeObjectURL(url);
                                                })
                                                .catch((error) => {
                                                    console.error('Error:', error);
                                                });

                                        }}

                                        >

                                    </Button>
                                </Tooltip>


                            </Box>
                        </Box>
                    </CardElongated>
                    )})}
            </div>
        </div>
    )
}

export default SeeUploadedHomeworkStudents;