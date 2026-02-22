import { useState, useMemo, useEffect, useRef } from 'react';
import { products, categories, type Product } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductModal from '../components/ProductModal';
import './Shop.css';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

const Shop = () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortBy, setSortBy] = useState<SortOption>('default');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);
    const { totalItems } = useCart();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Search filter
        if (search.trim()) {
            const q = search.toLowerCase().trim();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q)
            );
        }

        // Category filter
        if (activeCategory !== 'All') {
            result = result.filter((p) => p.category === activeCategory);
        }

        // Sort
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.priceNum - b.priceNum);
                break;
            case 'price-desc':
                result.sort((a, b) => b.priceNum - a.priceNum);
                break;
            case 'name-asc':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }

        return result;
    }, [search, activeCategory, sortBy]);

    // Animate grid items when filters change
    useEffect(() => {
        if (gridRef.current) {
            gridRef.current.classList.remove('shop__grid--animate');
            void gridRef.current.offsetWidth; // trigger reflow
            gridRef.current.classList.add('shop__grid--animate');
        }
    }, [filteredProducts]);

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    const clearFilters = () => {
        setSearch('');
        setActiveCategory('All');
        setSortBy('default');
    };

    const hasActiveFilters = search.trim() !== '' || activeCategory !== 'All' || sortBy !== 'default';

    // Force re-render when totalItems changes (for bag count reactivity)
    void totalItems;

    return (
        <>
            <div className="shop-page" id="shop-page">
                <div className="container">
                    {/* Header */}
                    <div className="shop__header">
                        <h1 className="shop__title">Shop</h1>
                        <p className="shop__subtitle">
                            Browse the full MEEKU collection. Curated pieces designed with intention.
                        </p>
                    </div>

                    {/* Controls Bar */}
                    <div className="shop__controls">
                        {/* Search */}
                        <div className="shop__search-wrapper">
                            <svg className="shop__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="M21 21l-4.35-4.35"></path>
                            </svg>
                            <input
                                type="text"
                                className="shop__search"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                id="shop-search"
                            />
                            {search && (
                                <button className="shop__search-clear" onClick={() => setSearch('')} aria-label="Clear search">
                                    ×
                                </button>
                            )}
                        </div>

                        {/* Category Filters */}
                        <div className="shop__filters">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`shop__filter-btn ${activeCategory === cat ? 'shop__filter-btn--active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                    id={`shop-filter-${cat.toLowerCase()}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Sort + Clear */}
                        <div className="shop__sort-wrapper">
                            <select
                                className="shop__sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                id="shop-sort"
                            >
                                <option value="default">Sort by</option>
                                <option value="price-asc">Price: Low → High</option>
                                <option value="price-desc">Price: High → Low</option>
                                <option value="name-asc">Name: A → Z</option>
                                <option value="name-desc">Name: Z → A</option>
                            </select>

                            {hasActiveFilters && (
                                <button className="shop__clear-filters" onClick={clearFilters} id="shop-clear-filters">
                                    Clear All
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="shop__results-bar">
                        <span className="shop__results-count">
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                        </span>
                    </div>

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="shop__grid shop__grid--animate" ref={gridRef}>
                            {filteredProducts.map((product) => (
                                <article className="shop__card" key={product.id} id={`shop-product-${product.id}`}>
                                    <div className="shop__card-image-wrapper">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="shop__card-image"
                                            loading="lazy"
                                        />
                                        <div className="shop__card-overlay">
                                            <button
                                                className="shop__card-quick-view"
                                                onClick={() => handleQuickView(product)}
                                            >
                                                Quick View
                                            </button>
                                        </div>
                                        {product.featured && (
                                            <span className="shop__card-badge">Featured</span>
                                        )}
                                    </div>
                                    <div className="shop__card-info">
                                        <span className="shop__card-category">{product.category}</span>
                                        <h3 className="shop__card-name">{product.name}</h3>
                                        <span className="shop__card-price">{product.price}</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="shop__empty">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="M21 21l-4.35-4.35"></path>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                            <h3 className="shop__empty-title">No products found</h3>
                            <p className="shop__empty-text">
                                Try adjusting your search or filters.
                            </p>
                            <button className="shop__empty-clear" onClick={clearFilters}>
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <ProductModal
                product={selectedProduct}
                isOpen={modalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default Shop;
