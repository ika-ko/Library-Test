import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logIn } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import "./AuthForm.css";

export default function LogIn() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const user = await logIn({ username: username.trim(), password });
            setUser(user);
            navigate("/", { replace: true });
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    }

    return (
        <div className="auth-form-page-div">
            <h1>Log in</h1>

            {error && <p className="form-error">{error}</p>}

            <form className="auth-form" onSubmit={handleSubmit}>
                <label className="form-field">
                    <span>Username</span>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>

                <label className="form-field">
                    <span>Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <div className="btn-row">
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? "Logging in..." : "Log in"}
                    </button>
                </div>
            </form>

            <p className="auth-form-switch">
                No account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
}