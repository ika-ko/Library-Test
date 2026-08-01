import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthorById, updateAuthor, createAuthor } from "../api/authors";
import "./AuthorForm.css";

export default function AuthorForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [bornYear, setBornYear] = useState("");
    const [bio, setBio] = useState("");

    const [loading, setLoading] = useState(isEdit);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isEdit) return;

        let cancelled = false;

        getAuthorById(id)
            .then((author) => {
                if (cancelled) return;
                setName(author.name);
                setBornYear(author.bornYear ?? "");
                setBio(author.bio ?? "");
            })
            .catch((err) => {
                if (!cancelled) setError(err.message);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [id, isEdit]);

    async function handleSubmit(event) {
        event.preventDefault();
        setSubmitting(true);
        setError(null);

        const payload = {
            name: name.trim(),
            bornYear: bornYear ? Number(bornYear) : null,
            bio: bio.trim() || null,
        };

        try {
            const saved = isEdit
                ? await updateAuthor(id, payload)
                : await createAuthor(payload);

            navigate(`/authors/${saved.id}`);
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="author-form-page-div">
            <h1>{isEdit ? "Edit author" : "Add an author"}</h1>

            {error && <p className="form-error">{error}</p>}

            <form className="author-form" onSubmit={handleSubmit}>
                <label className="form-field">
                    <span>Name</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>

                <label className="form-field">
                    <span>Born</span>
                    <input
                        type="number"
                        value={bornYear}
                        onChange={(e) => setBornYear(e.target.value)}
                        min="1"
                        max="2099"
                    />
                </label>

                <label className="form-field">
                    <span>Bio</span>
                    <textarea
                        rows="5"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </label>

                <div className="btn-row">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                    >
                        {submitting
                            ? "Saving..."
                            : isEdit
                              ? "Save changes"
                              : "Add author"}
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