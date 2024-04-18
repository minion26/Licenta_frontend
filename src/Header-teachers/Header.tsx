import './Header.css';
import {useState} from "react";
function Header() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        console.log('Burger icon clicked'); // Add this line
        setShowMenu(!showMenu);
    };

    return (
        <div className="nav flex-column">
            <div className="burger" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <header className={`header ${showMenu ? 'show' : ''}`} onClick={toggleMenu}>
                <h1 className="webApp">web app</h1>
                <nav>
                    <ul>
                        <li><a href="/">My profile</a></li>
                        <li><a href="/">Courses</a></li>
                        <li><a href="/">Lectures</a></li>
                        <li><a href="/">Tests</a></li>
                        <li><a href="/">Notifications</a></li>
                    </ul>
                </nav>
            </header>
        </div>

);
}

export default Header;