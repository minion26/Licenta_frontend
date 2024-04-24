import styles from './Materials-Per-Lecture-Students.module.css';
import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardLarge from "../Card-Large/Card-Large.tsx";
import {Link} from "react-router-dom";
// import {useEffect, useState} from "react";
// interface Material{
//     key:string;
// }


function MaterialsPerLectureStudents() {
    // const [materials, setMaterial] = useState<Material[]>([]);
    //
    // useEffect(() => {
    //     fetch('http://localhost:8081/api/v1/materials/list')
    //         .then(response => response.json())
    //         .then(data => setMaterial(data));
    // }, []);

    // const handleCardClick = (title: string) => {
    //     window.open(`http://localhost:8081/api/v1/materials/download/${title}`, "_blank");
    // };

    return(
        <div>
            <Header />
            <UpperHeader title="WEEK 1" subtitle="introduction to programming"/>
            <div className={styles.container}>
                {/*{materials.map((material, index) => (*/}
                {/*    <CardLarge key={material.key} title={material.key} cardIndex={index} size={250} onCardClick={handleCardClick}/>*/}
                {/*))}*/}
                <Link to={"/view-course"} className={styles.noDecoration}>
                    <CardLarge title="Curs" cardIndex={1} size={250}/>
                </Link>

                <CardLarge title="Suport" cardIndex={2} size={250}/>
                <CardLarge title="Video" cardIndex={3} size={250}/>
                <CardLarge title="Homework" cardIndex={4} size={250}/>
            </div>
        </div>
    );
}

export default MaterialsPerLectureStudents;