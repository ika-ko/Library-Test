import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { getAllAuthors } from "../api/authors";
import { getBookById, createBook, updateBook } from "../api/books";
import { PageStatus } from "../components/PageStatus";
import "./BookForm.css";

export default function BookForm(){
    const {id} = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [title,setTitle] = useState("");
    const [genre,setGenre] = useState("");
    const [publishedYear,setPublishedYear] = useState("");
    const [authorId, setAuthorId] = useState("");

    const [loadingBook, setLoadingBook] = useState(isEdit);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const { data: authors, error: authorsError } = useApi(getAllAuthors);

    useEffect(()=>{
        if(!isEdit) return;
        let cancelled = false;
        
        getBookById(id).then((book)=>{
            if(cancelled) return;
            setTitle(book.title ?? "");
            setGenre(book.genre ?? "");
            setPublishedYear(book.publishedYear ?? "");
            setAuthorId(String(book.authorId ?? ""));
        }).catch((err)=>{
            if(!cancelled) setError(err.message);
        }).finally(()=>{
            if(!cancelled) setLoadingBook(false);
        });
        return () => {
        cancelled = true;
        };
    },[id,isEdit]);
    async function handleSubmit(event){
        event.preventDefault();
        setSubmitting(true);
        setError(null);
        const payload = {
            title : title.trim(),
            genre: genre.trim()||null,
            publishedYear: publishedYear ? Number(publishedYear) :null,
            authorId: Number(authorId)
        }
        try{
            const saved = isEdit ? await updateBook(id,payload) : await createBook(payload);
            navigate(`/books/${saved.id}`);
        }catch(err){
            setError(err.message);
            setSubmitting(false);
        }
    }
    if (loadingBook) {
        return <PageStatus label="Loading" title="Fetching book..." />;
    }

    return (
        <div className="book-form-page-div">
            <h1>{isEdit ? "Edit book" : "Add a book"}</h1>

            {error && <p className="form-error">{error}</p>}
            {authorsError && <p className="form-error">{authorsError}</p>}

            <form className="book-form" onSubmit={handleSubmit}>
                <label className="form-field">
                    <span>Title</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>

                <label className="form-field">
                    <span>Genre</span>
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </label>

                <label className="form-field">
                    <span>Published</span>
                    <input
                        type="number"
                        value={publishedYear}
                        onChange={(e) => setPublishedYear(e.target.value)}
                        min="1"
                        max="2099"
                    />
                </label>

                <label className="form-field">
                    <span>Author</span>
                    <select
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                        required
                    >
                        <option value="">Select an author</option>
                        {authors?.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="btn-row">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                    >
                        {submitting ? "Saving..." : isEdit ? "Save changes" : "Add book"}
                    </button>
                    <button
                        type="button"
                        className="btn btn-edit"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}