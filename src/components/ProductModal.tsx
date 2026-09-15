import { useEffect, useRef, useState, useCallback } from 'react';
import { useCart } from '../context/useCart';
import type { Product } from '../data/products';
import './ProductModal.css';

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [animateIn, setAnimateIn] = useState(false);
    const [selectedSize, setSelectedSize] = useState('M');
    const [added, setAdded] = useState(false);
    const [prevProductId, setPrevProductId] = useState<number | null>(null);
    const { addItem } = useCart();

    // Adjust state when product prop changes (React recommended pattern)
    if (product && product.id !== prevProductId) {
        setPrevProductId(product.id);
        setSelectedSize(product.category === 'Accessories' ? 'One Size' : 'M');
        setAdded(false);
    }

    const handleClose = useCallback(() => {
        setAnimateIn(false);
        const timer = setTimeout(() => {
            setAdded(false);
            onClose();
        }, 300);
        return () => clearTimeout(timer);
    }, [onClose]);

    // Animate in smoothly when modal opens
    useEffect(() => {
        if (!isOpen || !product) return;

        const raf = requestAnimationFrame(() => {
            setAnimateIn(true);
        });
        return () => {
            cancelAnimationFrame(raf);
            setAnimateIn(false);
        };
    }, [isOpen, product]);

    // Keyboard navigation & accessibility: Escape to close and Tab focus trapping
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            } else if (e.key === 'Tab' && modalRef.current) {
                const focusable = modalRef.current.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    last.focus();
                    e.preventDefault();
                } else if (!e.shiftKey && document.activeElement === last) {
                    first.focus();
                    e.preventDefault();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen, handleClose]);

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
            priceNum: product.priceNum,
            image: product.image,
            size: selectedSize,
        });
        setAdded(true);
        setTimeout(() => {
            handleClose();
        }, 1200);
    };

    if (!isOpen || !product) return null;

    const sizeOptions = product.category === 'Accessories' ? ['One Size'] : ['XS', 'S', 'M', 'L', 'XL'];

    return (
        <div
            className={`modal-backdrop ${animateIn ? 'modal-backdrop--open' : ''}`}
            ref={modalRef}
            onClick={handleBackdropClick}
            id="product-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-product-name"
        >
            <div className={`modal ${animateIn ? 'modal--open' : ''}`} id="product-modal">
                {/* Close Button */}
                <button
                    className="modal__close"
                    onClick={handleClose}
                    aria-label="Close product details"
                    id="modal-close-btn"
                >
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
                            <span className="modal__category">{product.category}</span>
                            <h2 className="modal__product-name" id="modal-product-name">{product.name}</h2>
                            <span className="modal__product-price">{product.price}</span>

                            <div className="modal__divider"></div>

                            <p className="modal__product-description">
                                {product.description}
                            </p>

                            <div className="modal__size-section">
                                <span className="modal__size-label">
                                    {product.category === 'Accessories' ? 'Size' : 'Select Size'}
                                </span>
                                <div className="modal__size-options" role="group" aria-label="Available sizes">
                                    {sizeOptions.map((size) => (
                                        <button
                                            key={size}
                                            className={`modal__size-btn ${selectedSize === size ? 'modal__size-btn--active' : ''} ${size === 'One Size' ? 'modal__size-btn--onesize' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                            id={`modal-size-${size.toLowerCase().replace(/\s+/g, '-')}`}
                                            aria-pressed={selectedSize === size}
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
