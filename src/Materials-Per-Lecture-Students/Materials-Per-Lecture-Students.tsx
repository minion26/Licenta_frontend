import styles from './Materials-Per-Lecture-Students.module.css';
import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardLarge from "../Card-Large/Card-Large.tsx";



function MaterialsPerLectureStudents() {
    return(
        <div>
            <Header />
            <UpperHeader title="WEEK 1" subtitle="introduction to programming"/>
            <div className={styles.container}>
                <CardLarge title="Curs" cardIndex={1} size={250}/>
                <CardLarge title="Suport" cardIndex={2} size={250}/>
                <CardLarge title="Video" cardIndex={3} size={250}/>
                <CardLarge title="Homework" cardIndex={4} size={250}/>
            </div>
        </div>
    );
}

export default MaterialsPerLectureStudents;