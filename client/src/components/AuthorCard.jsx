import './AuthorCard.css';
import {Link} from 'react-router-dom'
export function AuthorCard({ author }) {
    return (
        <Link to={`/authors/${author.id}`} className="author-card-div">
            <div className="mock-author-image"></div>
            <div className="author-info-div">
                <h3>{author.name}</h3>
                <p>{author.bornYear}</p>
            </div>
        </Link>
    );
}