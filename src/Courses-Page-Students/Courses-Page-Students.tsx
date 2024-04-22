import styles from './Courses-Page-Students.module.css';
import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardLarge from "../Card-Large/Card-Large.tsx";
import {Link} from "react-router-dom";

function CoursesPageStudents(){
    return (
        <div>
            <Header />
            <UpperHeader title="Courses" subtitle="date" buttons={[{ key: 'A-Z', label: 'A-Z' }, { key: 'Z-A', label: 'Z-A' }]} />
            <div className={styles.cardContainer}>
                <Link to={"/lecture-per-course"} className={styles.noDecoration}>
                    <CardLarge title="Calcul numeric" credits={5} description="ceva descriere super smechera" cardIndex={1}/>
                </Link>

                <CardLarge title="Calcul numeric" credits={5} description="ceva descriere super smechera" cardIndex={2}/>
                <CardLarge title="Calcul numeric" credits={5} description="ceva descriere super smechera" cardIndex={3}/>
                <CardLarge title="Calcul numeric" credits={5} description="ceva descriere super smechera" cardIndex={4}/>
                <CardLarge title="Calcul numeric" credits={5} description="ceva descriere super smechera" cardIndex={5}/>
                <CardLarge title="Calcul numeric" credits={5} description="ceva descriere super smechera" cardIndex={1}/>
            </div>
        </div>
    );
}

export default CoursesPageStudents;