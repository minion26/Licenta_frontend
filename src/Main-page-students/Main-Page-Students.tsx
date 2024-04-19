import Header from "../Header-students/Header.tsx";
import './Main-Page-Students.css';
import MyCalendar from "../Calendar/Calendar.tsx";

function MainPageStudents(){
    return (
        <div>
            <Header/>
            <h1 className="title">Fii student la <em>FII</em>.</h1>
            <div className="main">
                <div className="buttons">
                    <button type="button" className="btn btn-outline-primary" data-mdb-ripple-init
                            data-mdb-ripple-color="dark">Semester 1
                    </button>
                    <button type="button" className="btn btn-outline-primary" data-mdb-ripple-init
                            data-mdb-ripple-color="dark">Semester 2
                    </button>
                </div>
                <div className="calendar-container">
                    <div className="calendar">
                    <MyCalendar/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPageStudents;