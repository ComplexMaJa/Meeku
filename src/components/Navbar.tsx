import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';
import logoImg from '../assets/logo.png';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { totalItems } = useCart();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // If we're on the bag page, use Link for anchor links to go back home
    const isHome = location.pathname === '/';

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
            <div className="navbar__inner container">
                <Link to="/" className="navbar__logo" id="navbar-logo">
                    <img src={logoImg} alt="MEEKU Logo" className="navbar__logo-img" />
                    <span className="navbar__brand">MEEKU</span>
                </Link>

                <button
                    className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    id="navbar-hamburger"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`navbar__right ${menuOpen ? 'navbar__right--open' : ''}`}>
                    <ul className="navbar__links" id="navbar-links">
                        {isHome ? (
                            <>
                                <li><Link to="/shop" className="navbar__link" onClick={() => setMenuOpen(false)}>Shop</Link></li>
                                <li><a href="#editorial" className="navbar__link" onClick={() => setMenuOpen(false)}>Collection</a></li>
                                <li><a href="#about" className="navbar__link" onClick={() => setMenuOpen(false)}>About</a></li>
                                <li><a href="#newsletter" className="navbar__link" onClick={() => setMenuOpen(false)}>Contact</a></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/shop" className="navbar__link" onClick={() => setMenuOpen(false)}>Shop</Link></li>
                                <li><Link to="/#editorial" className="navbar__link" onClick={() => setMenuOpen(false)}>Collection</Link></li>
                                <li><Link to="/#about" className="navbar__link" onClick={() => setMenuOpen(false)}>About</Link></li>
                                <li><Link to="/#newsletter" className="navbar__link" onClick={() => setMenuOpen(false)}>Contact</Link></li>
                            </>
                        )}
                    </ul>

                    <Link to="/bag" className="navbar__bag" id="navbar-bag" onClick={() => setMenuOpen(false)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 01-8 0"></path>
                        </svg>
                        {totalItems > 0 && (
                            <span className="navbar__bag-count" id="navbar-bag-count">{totalItems}</span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
