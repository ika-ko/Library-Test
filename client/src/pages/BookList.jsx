import useApi from "../hooks/useApi";
import { BookCard } from "../components/BookCard";
import { PageStatus } from "../components/PageStatus";
import { getAllBooks } from "../api/books";
import { Link } from "react-router-dom";
import './BookList.css';

function BookList() {
    const { data, loading, error } = useApi(getAllBooks);

    if (loading) {
        return <PageStatus label="Loading" title="Fetching books..." />;
    }
    if (error) {
        return <PageStatus label="Error" title="Couldn't load books" message={error} />;
    }
    if (data.length === 0) {
        return (
            <PageStatus
                title="No books yet"
                message="The shelf is empty. Add the first one."
                action={{ to: "/books/new", label: "Add book" }}
            />
        );
    }

    return (
        <div className="booklist-page-div">
            {data.map((book) => (
                <BookCard book={book} key={book.id} />
            ))}
            <Link to="/books/new" className="fab">Add book</Link>
        </div>
    );
}
export default BookList;
