
import './Header.css';
function Header() {
    return (
        <header className="header">
            <h1 className="webApp">web app</h1>
            <nav>
                <ul>
                    <li><a href="/">My profile</a></li>
                    <li><a href="/">Courses</a></li>
                    <li><a href="/">Lectures</a></li>
                    <li><a href="/">Homework</a></li>
                    <li><a href="/">Tests</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;