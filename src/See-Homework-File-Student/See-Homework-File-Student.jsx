import {useParams} from "react-router-dom";
import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import {useEffect, useState} from "react";
import styles from "../Feedback-Per-Homework-Teacher/Feedback-Per-Homework-Teacher.module.css";
import PdfViewerHomework from "../PDF-viewer-homework/PDF-viewer-homework.tsx";
import ReactStickyNotes from "@react-latest-ui/react-sticky-notes";
import Swal from "sweetalert2";

function SeeHomeworkFileStudent() {
    const {idHomework } = useParams();

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
            .then(response => {
                // if (!response.ok) {
                //
                //     return response.json().then(err => {
                //         throw new Error(err.message);
                //     });
                // }
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
                    console.log("data : ", data);
                    const transformedNotes = data.map((note) => ({
                        id: note.idFeedback,
                        position: {x: note.positionX, y: note.positionY},
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

  return (
      <div>
          <Header/>
          <UpperHeader title={name ? name : "Homework"} subtitle={"date"}/>
          <div className={styles.container}>

              {isLoading ? <div>Loading...</div> :
                  <ReactStickyNotes notes={notesDB} />
              }
          <div className={styles.fileContainer} >
              {
                  fileUrls.map((url, index) => {
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
          </div>
          </div>
      </div>
  );
}

export default SeeHomeworkFileStudent;