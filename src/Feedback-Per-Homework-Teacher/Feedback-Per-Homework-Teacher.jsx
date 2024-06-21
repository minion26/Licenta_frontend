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
    // Convert the percentages back to coordinates
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;


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
    const [noPermission, setNoPermission] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/homework/idHomework=${idHomework}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Access-Control-Allow-Credentials": "true"
            }})
                .then(response => {
                    if (!response.ok) {
                        setNoPermission(true);
                        return response.json().then(err => {
                            throw new Error(err.message);
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    setHomework(data);
                    console.log(data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                    Swal.fire({
                        icon: 'error',
                        title: error.message || 'An error occurred',
                        showConfirmButton: false,
                        // timer: 1500
                    });
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
        if (noPermission === false) {
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
        }else{
            console.log("No permission to view files");
        }
    }, [files]);

    const [notesDB, setNotesDB] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(noPermission === false) {
            fetch(`http://localhost:8081/api/v1/feedback/all/idHomework=${idHomework}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Credentials": "true"
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log("data : ", data);
                    const transformedNotes = data.map((note) => ({
                        id: note.idFeedback,
                        position: {
                            x: (note.positionX / 100) * screenWidth,
                            y: (note.positionY / 100) * screenHeight
                        },
                        text: note.noteText
                    }));
                    setNotesDB(transformedNotes);
                    setIsLoading(false); // Set loading to false when the fetch request is done
                    console.log(data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }else{
            console.log("No permission to view feedback");
        }
    }, [idHomework]);

    const [notesDBCopy, setNotesDBCopy] = useState([]);

    useEffect(() => {
        setNotesDBCopy(notesDB);
    }, [notesDB]);

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

        const notesUpdate = [];

        // Retrieve the notes from local storage
        const jsonString = localStorage.getItem('react-sticky-notes');

        // if (jsonString) {
        //     const notes = JSON.parse(jsonString);
        //
        //     // Iterate through the notes
        //     notes.forEach(note => {
        //         // Find the corresponding note in notesDBCopy
        //         const originalNote = notesDBCopy.find(n => n.id === note.id);
        //
        //         // If the original note exists and its position has changed, add it to notesUpdate
        //         if (originalNote && ((originalNote.position.x !== note.position.x || originalNote.position.y !== note.position.y)|| originalNote.text !== note.text)) {
        //             notesUpdate.push(note);
        //         }
        //     });
        //
        //     // Now, notesUpdate contains all the notes that have changed their positions
        //     console.log(notesUpdate);
        // } else {
        //     console.log('No notes found in local storage.');
        // }
        if (jsonString) {
            const notes = JSON.parse(jsonString);

            //FOR UPDATING NOTES
            notes.forEach(note => {
                // Find the corresponding note in notesDBCopy
                const originalNote = notesDBCopy.find(n => n.id === note.id);

                // If the original note exists and its position has changed, add it to notesUpdate
                if (originalNote && ((originalNote.position.x !== note.position.x || originalNote.position.y !== note.position.y)|| originalNote.text !== note.text)) {
                    notesUpdate.push(note);
                    //sterge din notesDBCopy
                    setNotesDBCopy(notesDBCopy.filter(n => n.id !== note.id));

                    //sterge si din notesDB
                    setNotesDB(notesDB.filter(n => n.id !== note.id));

                }
            });

            for(let i = 0; i < notesUpdate.length; i++) {
                fetch(`http://localhost:8081/api/v1/feedback/update/idFeedback=${notesUpdate[i].id}`, {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": "*"
                    },
                    body: JSON.stringify({
                        positionX: Math.round((notesUpdate[i].position.x / screenWidth) * 100),
                        positionY: Math.round((notesUpdate[i].position.y / screenHeight) * 100),
                        noteText: notesUpdate[i].text
                    })

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
                                title: 'Feedback updated successfully!',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            //delete local storage
                            // localStorage.removeItem('react-sticky-notes');
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Feedback update failed!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        });


            }

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

            console.log(uniqueNotes);

            // Parse the unique notes into the desired format
            const feedback = uniqueNotes.map(note => ({
                positionX: Math.round((note.position.x / screenWidth) * 100),
                positionY: Math.round((note.position.y / screenHeight) * 100),
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

        // Check if a note has been deleted
        const newNotesDBCopy = notesDBCopy.filter(note => {
            return notes.some(newNote => newNote.id === note.id);
        });

        // Find the deleted notes
        const deletedNotes = notesDBCopy.filter(note => !newNotesDBCopy.includes(note));

        if(noPermission === false){
            deletedNotes.forEach(note => {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Perform the deletion here
                        fetch(`http://localhost:8081/api/v1/feedback/delete/idFeedback=${note.id}`, {
                            method: "DELETE",
                            credentials: "include",
                            headers: {
                                "Access-Control-Allow-Credentials": "true"
                            }
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                console.log(`Note with id ${note.id} deleted successfully.`);
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                    }
                })
            });
        }else{
            console.log("No permission to delete notes");
        }


        // Update the copy of notesDB
        setNotesDBCopy(newNotesDBCopy);
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
                    {
                        !noPermission && (
                            <form onSubmit={handleSubmit}>
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
                                    type={"submit"}
                                >
                                    Submit Feedback
                                </Button>
                            </form>
                        )
                    }

                    <div>

                        {!noPermission && isLoading ? <div>Loading...</div> :
                            <ReactStickyNotes notes={notesDB} onBeforeChange={handleBeforeChange}
                                              onChange={handleChange}/>}
                        {/*        /!*<ReactStickyNotes onBeforeChange={handleBeforeChange} onChange={handleChange}/>*!/*/}
                        {/*<ReactStickyNotes onBeforeChange={handleBeforeChange} onChange={handleChange}/>*/}

                    </div>


                    {/*<ReactStickyNotes notes={notes} onChange={handleOnChange2}/>*/}

                </div>
                {
                    !noPermission && fileUrls.map((url, index) => {
                        return (
                            <div className={styles.fileContainer} key={index}>
                                <div>
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