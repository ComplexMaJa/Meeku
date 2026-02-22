import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';
import ProductModal from './ProductModal';
import { getFeaturedProducts, type Product } from '../data/products';

const featuredProducts = getFeaturedProducts();

const Products = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('products--visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <>
            <section className="products section" id="products" ref={sectionRef}>
                <div className="container">
                    <h2 className="section-title">Featured Collection</h2>
                    <p className="section-subtitle">
                        Curated essentials crafted with care and intention.
                    </p>
                    <div className="products__grid">
                        {featuredProducts.map((product, index) => (
                            <article
                                className={`product-card product-card--delay-${index + 1}`}
                                key={product.id}
                                id={`product-${product.id}`}
                            >
                                <div className="product-card__image-wrapper">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="product-card__image"
                                        loading="lazy"
                                    />
                                    <div className="product-card__overlay">
                                        <button
                                            className="product-card__quick-view"
                                            onClick={() => handleQuickView(product)}
                                            id={`quick-view-${product.id}`}
                                        >
                                            Quick View
                                        </button>
                                    </div>
                                </div>
                                <div className="product-card__info">
                                    <h3 className="product-card__name">{product.name}</h3>
                                    <span className="product-card__price">{product.price}</span>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Browse All Button */}
                    <div className="products__browse-all">
                        <Link to="/shop" className="products__browse-btn" id="browse-all-btn">
                            Browse All
                        </Link>
                    </div>
                </div>
            </section>

            <ProductModal
                product={selectedProduct}
                isOpen={modalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default Products;
