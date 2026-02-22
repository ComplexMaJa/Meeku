import { useEffect, useRef, useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import './ProductModal.css';

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
}

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);
    const [selectedSize, setSelectedSize] = useState('M');
    const [added, setAdded] = useState(false);
    const { addItem } = useCart();

    const handleClose = useCallback(() => {
        setAnimateIn(false);
        setTimeout(() => {
            setVisible(false);
            setAdded(false);
            setSelectedSize('M');
            onClose();
        }, 350);
    }, [onClose]);

    // When isOpen changes to true, mount then animate in
    useEffect(() => {
        if (isOpen && product) {
            setVisible(true);
            setAdded(false);
            setSelectedSize('M');
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setAnimateIn(true);
                });
            });
        }
    }, [isOpen, product]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };

        if (visible) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [visible, handleClose]);

    // Close on backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && e.target === modalRef.current) {
            handleClose();
        }
    };

    const handleAddToBag = () => {
        if (!product) return;
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize,
        });
        setAdded(true);
        setTimeout(() => {
            handleClose();
        }, 1200);
    };

    if (!visible || !product) return null;

    return (
        <div
            className={`modal-backdrop ${animateIn ? 'modal-backdrop--open' : ''}`}
            ref={modalRef}
            onClick={handleBackdropClick}
            id="product-modal-backdrop"
        >
            <div className={`modal ${animateIn ? 'modal--open' : ''}`} id="product-modal">
                {/* Close Button */}
                <button className="modal__close" onClick={handleClose} aria-label="Close" id="modal-close-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="modal__body">
                    {/* Left — Product Image */}
                    <div className="modal__image-side">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="modal__image"
                        />
                    </div>

                    {/* Right — Product Details */}
                    <div className="modal__details-side">
                        <div className="modal__details-content">
                            <span className="modal__category">MEEKU Essentials</span>
                            <h2 className="modal__product-name">{product.name}</h2>
                            <span className="modal__product-price">{product.price}</span>

                            <div className="modal__divider"></div>

                            <p className="modal__product-description">
                                {product.description}
                            </p>

                            <div className="modal__size-section">
                                <span className="modal__size-label">Size</span>
                                <div className="modal__size-options">
                                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                        <button
                                            key={size}
                                            className={`modal__size-btn ${selectedSize === size ? 'modal__size-btn--active' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                            id={`modal-size-${size.toLowerCase()}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                className={`modal__buy-btn ${added ? 'modal__buy-btn--added' : ''}`}
                                onClick={handleAddToBag}
                                disabled={added}
                                id="modal-buy-btn"
                            >
                                {added ? '✓ Added to Bag' : 'Add to Bag'}
                            </button>

                            <p className="modal__shipping-note">
                                Free shipping on orders over $100
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
