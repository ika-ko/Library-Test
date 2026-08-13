import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../api/auth";
import "./AuthForm.css";

export default function SignUp() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            await signUp({ username: username.trim(), password });
            navigate("/login", { replace: true });
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    }

    return (
        <div className="auth-form-page-div">
            <h1>Sign up</h1>

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
                        minLength={8}
                    />
                </label>

                <div className="btn-row">
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? "Signing up..." : "Sign up"}
                    </button>
                </div>
            </form>

            <p className="auth-form-switch">
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    );
}