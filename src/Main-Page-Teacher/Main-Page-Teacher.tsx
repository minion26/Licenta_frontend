import Header from "../Header-teachers/Header.tsx";
import styles from './Main-Page-Teacher.module.css';
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import CardLarge from "../Card-Large/Card-Large.tsx";

function MainPageTeacher() {

  return (
    <div>
      <Header />
        <UpperHeader title="Courses" subtitle="date" buttons={[{ key: 'A-Z', label: 'A-Z' }, { key: 'Z-A', label: 'Z-A' }]} />
        <div className={styles.cardContainer}>
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

export default MainPageTeacher;