import styles from "./Upload-Homework-Students.module.css"
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Swal from "sweetalert2";
import {HomeworkAnnouncements, User} from "../types.ts";

function UploadHomeworkStudents({idHomeworkAnnouncement} : {idHomeworkAnnouncement : string | undefined}) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [files, setFiles] = useState<FileList | null>(null);
    const [status, setStatus] = useState<
        "initial" | "uploading" | "success" | "fail"
    >("initial");

    const [user , setUser] = useState<User>({
        idUsers: '',
        firstName: '',
        lastName: '',
        facultyEmail: '',
        personalEmail: '',
        password: '',
        role: '',
    });

    const [homeworkAnnouncement, setHomeworkAnnouncement] = useState<HomeworkAnnouncements>({
        idHomeworkAnnouncement: '',
        title: '',
        description: '',
        dueDate: '',
        score: 0,
        idTeacher: '',
        idLecture: ''
    });

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/homework-announcements/idHomeworkAnnouncement=${idHomeworkAnnouncement}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("due date: ", data.dueDate);
                setHomeworkAnnouncement(data);
            })
            .catch(err => {
                console.log("error: ", err);
                Swal.fire({
                    icon: 'error',
                    title: (err as Error).message || 'An error occurred',
                    showConfirmButton: false,
                    // timer: 1500
                });
            });
    }, []);



    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:8081/api/v1/username', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("email: " + data.username);
                    return fetch(`http://localhost:8081/api/v1/users/email/${data.username}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Origin": "*",
                        },
                    });
                })
                .then(userResponse => userResponse.json())
                .then(userData => {
                    console.log(userData);
                    setUser(userData);
                    console.log("user: " + userData.idUsers)
                })
                .catch(err => {
                    console.log("error: ", err);
                    Swal.fire({
                        icon: 'error',
                        title: (err as Error).message || 'An error occurred',
                        showConfirmButton: false,
                        // timer: 1500
                    });
                });
        };

        fetchData();
    }, []);




    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setStatus("initial");
            setFiles(e.target.files);
        }
    };

    const handleUpload = async () => {
        if (homeworkAnnouncement.dueDate) {
            const deadline = new Date(homeworkAnnouncement.dueDate);
            const currentDate = new Date();
            if (currentDate > deadline) {
                Swal.fire({
                    icon: 'error',
                    title: "The deadline has passed!",
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }else if(files){
                setStatus("uploading");

                const formData = new FormData();

                [...files].forEach((file) => {
                    formData.append("file", file);
                });

                try {
                    const result  = await fetch(`http://localhost:8081/api/v1/homework/upload/idHomeworkAnnouncement=${idHomeworkAnnouncement}/idStudent=${user.idUsers}`, {
                        method: "POST",
                        body: formData,
                        credentials: "include",
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                        }
                    });

                    if(!result.ok){
                        const errorData = await result.json();
                        await Swal.fire({
                            icon: 'error',
                            title: errorData.message || 'An error occurred',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }

                    if (result.headers.get("content-type")?.includes("application/json")) {
                        const text = await result.text();
                        if (text !== "") { // Check if the body is not empty
                            const data = JSON.parse(text);
                            console.log(data);
                        }
                    }
                    setStatus("success");
                } catch (error) {
                    console.error(error);
                    setStatus("fail");
                }

            }
        }
    };




  return (
      <>


                        <div className={styles["input-group"]}>

                            <label htmlFor="file" className={styles["sr-only"]}>
                                Choose files
                            </label>
                            <input id="file" type="file" multiple onChange={handleFileChange}/>
                        </div>
                    <div className={styles.container}>
                        {files &&
                            [...files].map((file, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        width: isSmallScreen ? '100%' : '250px',
                                        height: isSmallScreen ? '50%' : '200px',
                                        backgroundColor: "#FAFAF5",
                                        borderRadius: '24px',
                                        alignSelf: 'center',

                                    }}>
                                    <Box>
                                        <CardContent sx={{
                                            flex: '1 0 auto',
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}>
                                            <section key={file.name}>
                                                File number {index + 1} details:
                                                <ul>
                                                    <li>Name: {file.name}</li>
                                                    <li>Type: {file.type}</li>
                                                    <li>Size: {file.size} bytes</li>
                                                </ul>
                                            </section>

                                        </CardContent>

                                    </Box>

                                </Card>

                            ))}

                        <div>
                            {files && (
                                <Button variant="contained" endIcon={<SendIcon/>} onClick={handleUpload}
                                        className={styles["submit"]}>
                                    Upload {files.length > 1 ? "files" : "a file"}
                                </Button>
                            )}
                            <Result status={status} />
                        </div>
                    </div>

      </>
  );
}

const Result = ({ status }: { status: string }) => {
    if (status === "success") {
        return <p>✅ Uploaded successfully!</p>;
    } else if (status === "fail") {
        return <p>❌ Upload failed!</p>;
    } else if (status === "uploading") {
        return <p>⏳ Uploading started...</p>;
    } else {
        return null;
    }
};

export default UploadHomeworkStudents;