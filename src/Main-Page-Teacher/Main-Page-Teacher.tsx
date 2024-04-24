import Header from "../Header-teacher/Header.tsx";
import styles from './Main-Page-Teacher.module.css';
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardLarge from "../Card-Large/Card-Large.tsx";
import {Link} from "react-router-dom";
// import {useEffect, useState} from "react";
//
// interface Course {
//     name: string;
//     credits: number;
//     description: string;
// }

function MainPageTeacher() {
    // const [courses, setCourses] = useState<Course[]>([]);
    //
    // useEffect(() => {
    //     fetch('http://localhost:8081/api/v1/courses')
    //         .then(response => response.json())
    //         .then(data => setCourses(data));
    // }, []);

  return (
    <div>
      <Header />
        <UpperHeader title="Courses" subtitle="date" buttons={[{ key: 'A-Z', label: 'A-Z' }, { key: 'Z-A', label: 'Z-A' }]} />
        <div className={styles.cardContainer}>
            {/*{courses.map((course, index) => (*/}
            {/*    <CardLarge key={index} title={course.name} credits={course.credits} description={course.description} cardIndex={index}/>*/}
            {/*))}*/}
            <Link to={"/lecture-per-course"} className={styles.noDecoration}>
                <CardLarge title="Calcul numeric" credits={5} description="ceva descriere super smechera" cardIndex={1} />
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

export default MainPageTeacher;