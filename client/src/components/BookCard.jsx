import './BookCard.css';
import { Link } from 'react-router-dom';

export function BookCard({ book }) {
  return (
    <Link to={`/books/${book.id}`} className="book-card-div">
      <div className="mock-book-image"></div>
      <div className="book-info-div">
        <h3>{book.title}</h3>
        <p>{book.genre}</p>
        <p>{book.publishedYear}</p>
        <p>{book.authorName ?? "Unknown author"}</p>
      </div>
    </Link>
  );
}