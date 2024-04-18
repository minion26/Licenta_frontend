import Header from "../Header-students/Header.tsx";
import './Main-Page-Students.css';
import MyCalendar from "../Calendar/Calendar.tsx";

function MainPageStudents(){
    return (
        <div>
            <Header/>
            <h1 className="title">Fii student la <em>FII</em>.</h1>
            <div className="main">

                <div className="calendar">
                    <MyCalendar/>
                </div>
            </div>
        </div>
    )
}

export default MainPageStudents;