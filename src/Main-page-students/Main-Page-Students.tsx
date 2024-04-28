import Header from "../Header-students/Header.tsx";
import styles from "./Main-Page-Students.module.css";
import MyCalendar from "../Calendar/Calendar.tsx";
import { Link } from "react-router-dom";

function MainPageStudents() {
  return (
    <div>
      <Header />
      <h1 className={styles.title}>
        Fii student la <em>FII</em>.
      </h1>
      <div className={styles.main}>
        <div className={styles.buttons}>
          <Link to="/semester1">
            <button
              type="button"
              className={`btn btn-outline-primary ${styles.btn}`}
              data-mdb-ripple-init
              data-mdb-ripple-color="dark"
            >
              Semester 1
            </button>
          </Link>

          <Link to="/semester2">
            <button
              type="button"
              className={`btn btn-outline-primary ${styles.btn}`}
              data-mdb-ripple-init
              data-mdb-ripple-color="dark"
            >
              Semester 2
            </button>
          </Link>
        </div>
        <div className={styles.calendarContainer}>
          <div className={styles.calendar}>
            <MyCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPageStudents;
