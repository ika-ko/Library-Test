import useApi from "../hooks/useApi";
import { BookCard } from "../components/BookCard";
import { getAllBooks } from "../api/books";
import './BookList.css';

function BookList() {
    const { data, loading, error } = useApi(getAllBooks);

    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div className="booklist-page-div">
            {data.map((book) => (
                <BookCard book={book} key={book.id} />
            ))}
        </div>
    );
}
export default BookList;