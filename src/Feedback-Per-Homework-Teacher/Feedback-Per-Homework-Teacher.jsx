import ReactStickyNotes from "@react-latest-ui/react-sticky-notes";
import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import styles from "./Feedback-Per-Homework-Teacher.module.css";
import PdfViewerHomework from "../PDF-viewer-homework/PDF-viewer-homework.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


function FeedbackPerHomeworkTeacher() {
    const {idHomeworkAnnouncement,idHomework} = useParams();
    const navigate = useNavigate();
    const [homework, setHomework] = useState({
        idHomework: "",
        idStudent: "",
        nrMatricol: "",
        firstNameStudent: "",
        lastNameStudent: "",
        grade: "",
        uploadedDate: "",
        fileName: []
    });
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/homework/idHomework=${idHomework}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Access-Control-Allow-Credentials": "true"
            }})
                .then(response => response.json())
                .then(data => {
                    setHomework(data);
                    console.log(data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                })
    }, []);

    const [type, setType] = useState([]);

    useEffect(() => {
        const newFiles = [];
        const fileTypes = [];
        for (let i = 0; i < homework.fileName.length; i++) {
            const name = homework.fileName[i].split("/")[1];
            const type = name.split(".").pop();
            newFiles.push(name);
            fileTypes.push(type);
        }

        setFiles(newFiles); // Assuming you have a state setter function called setFiles
        setType(fileTypes);

        // for (let i = 0; i < newFiles.length; i++) {
        //     console.log(newFiles[i], fileTypes[i]);
        // }
    }, [homework.fileName]); // Run this useEffect whenever homework.fileName changes


    const [fileUrls, setFileUrls] = useState([]); // Change to an array of strings

    useEffect(() => {
        const fetchPromises = files.map((file) => {
            // console.log("here : ", file, type[index]);
            const encodedURICOmponent = encodeURIComponent(file);
            return fetch(`http://localhost:8081/api/v1/homework/list/${encodedURICOmponent}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Credentials": "true"
                }
            })
                .then(response => response.blob())
                .then(blob => {
                     return URL.createObjectURL(blob);
                });
        });

        Promise.all(fetchPromises)
            .then(urls => {
                setFileUrls(urls)
                // console.log("urls : ", urls)
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    }, [files]);

    const [notesDB, setNotesDB] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/feedback/all/idHomework=${idHomework}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Access-Control-Allow-Credentials": "true"
            }
        })
            .then(response => response.json())
            .then(data => {
                const transformedNotes = data.map((note, index) => ({
                    id: String(index + 1),
                    position: { x: note.positionX, y: note.positionY },
                    text: note.noteText
                }));
                setNotesDB(transformedNotes);
                setIsLoading(false); // Set loading to false when the fetch request is done
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [idHomework]);

    // useEffect(() => {
    //     console.log(notesDB);
    // })

    // const pdfViewerRef = useRef(null);
    // const [coordinates, setCoordinates] = useState([]);
    //
    // useEffect(() => {
    //     if (pdfViewerRef.current) {
    //         const rect = pdfViewerRef.current.getBoundingClientRect();
    //         setCoordinates(prevCoordinates => [...prevCoordinates, rect]);
    //         // console.log("Coordinates: ", rect);
    //     }
    // }, [fileUrls]);

    // const [myNotes, setMyNotes] = useState([]);
    //
    // const [feedbackCreationDTO, setFeedbackCreationDTO] = useState([]);
    // const [newNotes, setNewNotes] = useState([]);

    // useEffect(() => {
    //     const jsonString = localStorage.getItem('react-sticky-notes');
    //     if (jsonString ) {
    //         const notes = JSON.parse(jsonString);
    //         const newNotes = notes.map(note => {
    //             return [
    //                 note.position.x,
    //                 note.position.y,
    //                 note.text
    //             ];
    //         });
    //         setMyNotes(prevNotes => [...prevNotes, ...newNotes]);
    //         setNewNotes(newNotes);
    //     } else {
    //         console.log('No notes found in local storage.');
    //     }
    // }, []);

    // useEffect(() => {
    //     if(newNotes.length !== 0) {
    //         const feedback = newNotes.map(note => ({
    //             positionX: note[0],
    //             positionY: note[1],
    //             noteText: note[2]
    //         }));
    //
    //         setFeedbackCreationDTO(feedback);
    //     }
    // }, [feedbackCreationDTO]);
    //
    // useEffect(() => {
    //     console.log("here", newNotes);
    // }, [newNotes]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Retrieve the notes from local storage
        const jsonString = localStorage.getItem('react-sticky-notes');
        if (jsonString) {
            const notes = JSON.parse(jsonString);

            // Transform notesDB into a comparable format
            const notesDBComparable = notesDB.map(note => ({
                positionX: note.position.x,
                positionY: note.position.y,
                noteText: note.text
            }));

            // Filter out the notes that are already in notesDB
            const uniqueNotes = notes.filter(note => {
                const comparableNote = {
                    positionX: note.position.x,
                    positionY: note.position.y,
                    noteText: note.text
                };
                return !notesDBComparable.some(dbNote => JSON.stringify(dbNote) === JSON.stringify(comparableNote));
            });

            // Parse the unique notes into the desired format
            const feedback = uniqueNotes.map(note => ({
                positionX: note.position.x,
                positionY: note.position.y,
                noteText: note.text
            }));

            // const notes = JSON.parse(jsonString);
            //
            // // Parse the notes into the desired format
            // const feedback = notes.map(note => ({
            //     positionX: note.position.x,
            //     positionY: note.position.y,
            //     noteText: note.text
            // }));

            fetch(`http://localhost:8081/api/v1/feedback/create/idHomework=${idHomework}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true"
                },
                body: JSON.stringify(feedback)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    if (data) {
                        return JSON.parse(data);
                    } else {
                        console.log('No data returned by the server');
                    }

                    Swal.fire({
                        icon: 'success',
                        title: 'Feedback submitted successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    //delete local storage
                    localStorage.removeItem('react-sticky-notes');
                })
                .catch((error) => {
                    console.error("Error:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Feedback submission failed!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                });


            navigate(`/see-submissions/${idHomeworkAnnouncement}`)
        } else {
            console.log('No notes found in local storage.');
        }



    }

    const handleBeforeChange = (type, payload) => {
        // Modify the payload if necessary
        // For example, you can add a timestamp to the payload
        payload.timestamp = Date.now();
        return payload;
    }

    const handleChange = (type, payload, notes) => {
        localStorage.setItem('react-sticky-notes', JSON.stringify(notes));
    }

    // const [notes, setNotes] = useState([
    //     {
    //         id: '1',
    //         position: { x: 100, y: 101 },
    //         text: 'This is a note'
    //     },
    //     {
    //         id: '2',
    //         position: { x: 300, y: 200 },
    //         text: 'This is another note'
    //     }
    // ]);

    // const handleOnChange2 = (type, payload, notesDB) => {
    //     if (notesDB !== undefined) {
    //         localStorage.setItem('react-sticky-notes', JSON.stringify(notesDB));
    //     } else {
    //         console.log('No notes to save in local storage.');
    //     }
    // };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div >
            <Header />
            <UpperHeader title="Homework" subtitle="Feedback Per Homework" />

            <div className={styles.container}>

                <div className={styles.divContainer}>
                    <form onSubmit={handleSubmit}>
                        <Button
                            variant="contained"
                            endIcon={<CreateOutlinedIcon />}
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
                            type={"submit"}
                        >
                            Submit Feedback
                        </Button>
                    </form>
                    <div>

                        {isLoading ? <div>Loading...</div> : <ReactStickyNotes notes={notesDB} onBeforeChange={handleBeforeChange} onChange={handleChange} />}
                        {/*        /!*<ReactStickyNotes onBeforeChange={handleBeforeChange} onChange={handleChange}/>*!/*/}
                        {/*<ReactStickyNotes onBeforeChange={handleBeforeChange} onChange={handleChange}/>*/}

                    </div>


                        {/*<ReactStickyNotes notes={notes} onChange={handleOnChange2}/>*/}

                </div>
                {
                    fileUrls.map((url, index) => {
                        return (
                            <div className={styles.fileContainer} key={index}>
                                <div >
                                    <PdfViewerHomework documentURL={url} fileType={type[index]}/>
                                </div>
                            </div>
                        )
                        // return <PdfViewerHomework documentURL={url} fileType={type[index]} key={index}/>
                    })
                }
                {/*<PdfViewerHomework documentURL={"/src/assets/help.txt"}/>*/}




            </div>


            {/*</div>*/}
        </div>
    );
}


export default FeedbackPerHomeworkTeacher;