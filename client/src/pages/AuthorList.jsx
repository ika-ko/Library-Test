import useApi from "../hooks/useApi";
import { getAllAuthors } from "../api/authors";
import './AuthorList.css';
import { Link } from "react-router-dom";
import { AuthorCard } from "../components/AuthorCard";
import { PageStatus } from "../components/PageStatus";

function AuthorList() {
    const { data, loading, error } = useApi(getAllAuthors);

    if (loading) {
        return <PageStatus label="Loading" title="Fetching authors..." />;
    }
    if (error) {
        return <PageStatus label="Error" title="Couldn't load authors" message={error} />;
    }
    if (data.length === 0) {
        return (
            <PageStatus
                title="No authors yet"
                message="Add an author before adding their books."
                action={{ to: "/authors/new", label: "Add author" }}
            />
        );
    }

    return (
        <div className="authorlist-page-div">
            {data.map((author) => (
                <AuthorCard author={author} key={author.id} />
            ))}
            <Link to="/authors/new" className="fab">Add author</Link>
        </div>
    );
}
export default AuthorList;
