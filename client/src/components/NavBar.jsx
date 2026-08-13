import { NavLink, Link } from "react-router-dom";
import './NavBar.css';
import { useAuth } from '../context/AuthContext';
import { logOut } from "../api/auth";
export function NavBar() {
    const {user, loading} = useAuth();
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
                <li>
                    <NavLink to={"/randomPort"}>
                        {user ? user.username : 'GUEST'}
                    </NavLink>
                </li>
                <li>
                    <NavLink onClick={async ()=> {await logOut} }>
                        {user ? "Log-Out" : ""}
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}