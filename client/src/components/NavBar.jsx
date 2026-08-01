import { NavLink, Link } from "react-router-dom";
import './NavBar.css';
export function NavBar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                Library
            </Link>

            <ul className="navbar-links">
                <li>
                    <NavLink to="/" end>
                        Books
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/authors">
                        Authors
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}