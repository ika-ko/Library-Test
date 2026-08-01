import { useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { getBookById,deleteBook } from "../api/books";
import {use, useState} from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";


import './BookDetail.css';

function BookDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: book, loading, error } = useApi(() => getBookById(id));
    const [deleting,setDeleting] = useState(false);
    const [delError,setDelError] = useState(null);

    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <h1>{error}</h1>;
    }

    async function handleDelete() {
    if (!window.confirm(`Delete "${book.title}"? This can't be undone.`)) return;

    setDeleting(true);
    try {
        await deleteBook(id);
        navigate("/books", { replace: true });
    } catch (err) {
        setDelError(err.message);
        setDeleting(false);
    }
    }
    return (
        <div className="book-detail-page-div">
            <div className="mock-book-image-large"></div>

            <div className="book-detail-info-div">
                <h1>{book.title}</h1>
                <p className="book-detail-author">
                    {book.authorName ?? "Unknown author"}
                </p>

                <dl className="book-detail-meta">
                    <dt>Genre</dt>
                    <dd>{book.genre ?? "—"}</dd>

                    <dt>Published</dt>
                    <dd>{book.publishedYear ?? "—"}</dd>
                </dl>
            </div>

            <div className="book-detail-actions-div">
                <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
                <Link to={`/books/${book.id}/edit`} className="btn btn-edit">
                    Edit
                </Link>
            </div>
        </div>
    );
}
export default BookDetail;