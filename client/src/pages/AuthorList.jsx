import useApi from "../hooks/useApi";
import { getAllAuthors } from "../api/authors";
import './AuthorList.css';
import { AuthorCard } from "../components/AuthorCard";

function AuthorList() {
    const { data, loading, error } = useApi(getAllAuthors);

    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div className="authorlist-page-div">
            {data.map((author) => (
                <AuthorCard author={author} key={author.id} />
            ))}
        </div>
    );
}
export default AuthorList;