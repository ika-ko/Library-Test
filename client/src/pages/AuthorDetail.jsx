import { useParams } from "react-router-dom";
import './AuthorDetail.css';
import {useState} from 'react'
import useApi from "../hooks/useApi";
import { getAuthorById, getAuthorBooks, deleteAuthor } from "../api/authors";
import { BookCard } from "../components/BookCard";
import { PageStatus } from "../components/PageStatus";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AuthorDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const {
        data: author,
        loading: authorLoading,
        error: authorError,
    } = useApi(() => getAuthorById(id), [id]);

    const {
        data: books,
        loading: booksLoading,
        error: booksError,
    } = useApi(() => getAuthorBooks(id), [id]);
    
    const [deleting,setDeleting] = useState(false);
    const [delError,setDelError] = useState(null);
    if (authorLoading) {
        return <PageStatus label="Loading" title="Fetching author..." />;
    }
    if (authorError) {
        return (
            <PageStatus
                label="Error"
                title="Couldn't load this author"
                message={authorError}
                action={{ to: "/authors", label: "Back to authors" }}
            />
        );
    }

    async function handleDelete() {
    // ON DELETE CASCADE takes the author's books with them. Nothing else in the UI tells
    // the user that, so the confirm has to.
    const bookCount = books?.length ?? 0;
    const cascadeWarning =
        bookCount > 0
            ? ` This also deletes ${bookCount} book${bookCount === 1 ? "" : "s"} by this author.`
            : "";

    if (
        !window.confirm(
            `Delete "${author.name}"?${cascadeWarning} This can't be undone.`
        )
    )
        return;

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
                    <button className="btn btn-delete" disabled={deleting} onClick={handleDelete}>{deleting ? "Deleting..." : "Delete"}</button>
                    <Link to={`/authors/${author.id}/edit`} className="btn btn-edit">Edit</Link>
                    {delError && <p className="form-error">{delError}</p>}
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