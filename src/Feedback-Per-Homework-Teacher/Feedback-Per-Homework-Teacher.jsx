import ReactStickyNotes from "@react-latest-ui/react-sticky-notes";
import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import styles from "./Feedback-Per-Homework-Teacher.module.css";
import PdfViewerHomework from "../PDF-viewer-homework/PDF-viewer-homework.tsx";


function FeedbackPerHomeworkTeacher() {
    const handleOnChange = (type, payload, notes) => {
        console.log(type);
        console.log(payload);
        console.log(notes);

        // Log the position of each note
        notes.forEach(note => {
            console.log(`Note ID: ${note.id}, Position: x=${note.position.x}, y=${note.position.y}`);
        });
    };


    return (
        <div >
            <Header />
            <UpperHeader title="Homework" subtitle="Feedback Per Homework" />

            <div className={styles.container}>
                <div className={styles.divContainer}>
                    <ReactStickyNotes onChange={handleOnChange}/>

                </div>
                <h2>Start POSTing!</h2>
                <PdfViewerHomework documentURL={"src/assets/C01_Course_Introduction-to-Automotive.pdf"}/>
            </div>
        </div>
    );
}


export default FeedbackPerHomeworkTeacher;