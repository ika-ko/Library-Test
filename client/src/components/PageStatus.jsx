import { Link } from "react-router-dom";

/**
 * The shell every non-content state renders into: loading, error, empty, and 404.
 * Previously these were bare <h1>s outside the page wrapper, so no page CSS reached them.
 */
export function PageStatus({ label, title, message, action }) {
    return (
        <div className={`page-status${label === "Error" ? " page-status-error" : ""}`}>
            {label && <p className="page-status-label">{label}</p>}
            <h1>{title}</h1>
            {message && <p>{message}</p>}
            {action && (
                <Link to={action.to} className="btn btn-primary">
                    {action.label}
                </Link>
            )}
        </div>
    );
}
