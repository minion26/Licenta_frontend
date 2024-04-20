import Header from "../Header-teachers/Header.tsx";
import './Main-Page-Teacher.css';
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
function MainPageTeacher() {
  return (
    <div>
      <Header />
        <UpperHeader title="Courses" subtitle="date" buttons={[{ key: 'A-Z', label: 'A-Z' }, { key: 'Z-A', label: 'Z-A' }]} />
    </div>
  );
}

export default MainPageTeacher;