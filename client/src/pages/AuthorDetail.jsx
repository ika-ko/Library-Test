import { useParams } from "react-router-dom";
import './AuthorDetail.css';
import {useState} from 'react'
import useApi from "../hooks/useApi";
import { getAuthorById, getAuthorBooks, deleteAuthor } from "../api/authors";
import { BookCard } from "../components/BookCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AuthorDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const {
        data: author,
        loading: authorLoading,
        error: authorError,
    } = useApi(() => getAuthorById(id));

    const {
        data: books,
        loading: booksLoading,
        error: booksError,
    } = useApi(() => getAuthorBooks(id));
    
    const [deleting,setDeleting] = useState(false);
    const [delError,setDelError] = useState(null);
    if (authorLoading) {
        return <h1>Loading...</h1>;
    }
    if (authorError) {
        return <h1>{authorError}</h1>;
    }

    async function handleDelete() {
    if (!window.confirm(`Delete "${author.name}"? This can't be undone.`)) return;

    setDeleting(true);
    try {
        await deleteAuthor(id);
        navigate("/authors", { replace: true });
    } catch (err) {
        setDelError(err.message);
        setDeleting(false);
    }
}
    return (
        <div className="author-detail-page-div">
            <header className="author-detail-header-div">
                <div className="mock-author-image-large"></div>

                <div className="author-detail-info-div">
                    <h1>{author.name}</h1>
                    <p className="author-detail-born">
                        {author.bornYear ?? "Birth year unknown"}
                    </p>
                    <p className="author-detail-bio">
                        {author.bio ?? "No biography yet."}
                    </p>
                </div>

                <div className="author-detail-actions-div">
                    <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
                    <Link to={`/authors/${author.id}/edit`} className="btn btn-edit">Edit</Link>
                </div>
            </header>

            <section className="author-books-section">
                <h2>Books</h2>

                {booksLoading && <p>Loading books...</p>}
                {booksError && <p>{booksError}</p>}

                {books && books.length === 0 && (
                    <p>No books by this author yet.</p>
                )}

                <div className="author-books-list-div">
                    {books?.map((book) => (
                        <BookCard book={book} key={book.id} />
                    ))}
                </div>
            </section>
        </div>
    );
}
export default AuthorDetail;