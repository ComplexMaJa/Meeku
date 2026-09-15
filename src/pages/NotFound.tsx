import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-page" id="not-found-page">
            <div className="container">
                <div className="not-found__content">
                    <span className="not-found__code">404</span>
                    <h1 className="not-found__title">Page Not Found</h1>
                    <p className="not-found__text">
                        The piece you are looking for cannot be found or has moved.<br />
                        Let's get you back to the collection.
                    </p>
                    <div className="not-found__actions">
                        <Link to="/" className="not-found__btn not-found__btn--primary" id="not-found-home-btn">
                            Return Home
                        </Link>
                        <Link to="/shop" className="not-found__btn not-found__btn--secondary" id="not-found-shop-btn">
                            Explore Shop
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
