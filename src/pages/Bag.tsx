import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Bag.css';

const Bag = () => {
    const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="bag-page" id="bag-page">
                <div className="container">
                    <div className="bag__empty">
                        <div className="bag__empty-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 01-8 0"></path>
                            </svg>
                        </div>
                        <h1 className="bag__empty-title">Your Bag is Empty</h1>
                        <p className="bag__empty-text">
                            Looks like you haven't added anything yet.<br />
                            Explore our collection and find something you love.
                        </p>
                        <Link to="/" className="bag__empty-cta" id="bag-continue-shopping">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bag-page" id="bag-page">
            <div className="container">
                <div className="bag__header">
                    <h1 className="bag__title">Your Bag</h1>
                    <span className="bag__count">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
                </div>

                <div className="bag__layout">
                    {/* Items List */}
                    <div className="bag__items">
                        {items.map((item) => (
                            <div className="bag-item" key={`${item.id}-${item.size}`} id={`bag-item-${item.id}-${item.size}`}>
                                <div className="bag-item__image-wrapper">
                                    <img src={item.image} alt={item.name} className="bag-item__image" />
                                </div>
                                <div className="bag-item__details">
                                    <div className="bag-item__top">
                                        <div>
                                            <h3 className="bag-item__name">{item.name}</h3>
                                            <span className="bag-item__size">Size: {item.size}</span>
                                        </div>
                                        <span className="bag-item__price">{item.price}</span>
                                    </div>
                                    <div className="bag-item__bottom">
                                        <div className="bag-item__quantity">
                                            <button
                                                className="bag-item__qty-btn"
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                aria-label="Decrease quantity"
                                            >
                                                −
                                            </button>
                                            <span className="bag-item__qty-value">{item.quantity}</span>
                                            <button
                                                className="bag-item__qty-btn"
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="bag-item__remove"
                                            onClick={() => removeItem(item.id, item.size)}
                                            aria-label="Remove item"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bag__summary">
                        <div className="bag__summary-card">
                            <h2 className="bag__summary-title">Order Summary</h2>

                            <div className="bag__summary-rows">
                                <div className="bag__summary-row">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="bag__summary-row">
                                    <span>Shipping</span>
                                    <span>{totalPrice >= 100 ? 'Free' : '$8.00'}</span>
                                </div>
                            </div>

                            <div className="bag__summary-divider"></div>

                            <div className="bag__summary-row bag__summary-row--total">
                                <span>Total</span>
                                <span>${(totalPrice + (totalPrice >= 100 ? 0 : 8)).toFixed(2)}</span>
                            </div>

                            {totalPrice < 100 && (
                                <p className="bag__summary-free-shipping">
                                    Add ${(100 - totalPrice).toFixed(2)} more for free shipping
                                </p>
                            )}

                            <button className="bag__checkout-btn" id="bag-checkout-btn">
                                Checkout
                            </button>

                            <button className="bag__clear-btn" onClick={clearCart} id="bag-clear-btn">
                                Clear Bag
                            </button>
                        </div>

                        <Link to="/" className="bag__continue-link" id="bag-continue-link">
                            ← Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bag;
