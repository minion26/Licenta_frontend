import './Courses-Page-Students.css';
import Header from "../Header-students/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardLarge from "../Card-Large/Card-Large.tsx";

function CoursesPageStudents(){
    return (
        <div>
            <Header />
            <UpperHeader title="Courses" subtitle="date" buttons={[{ key: 'A-Z', label: 'A-Z' }, { key: 'Z-A', label: 'Z-A' }]} />
            <div className="card-container">
                <CardLarge title="Calcul numeric" credits={5} description="ceva descriere super smechera" cardIndex={1}/>
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