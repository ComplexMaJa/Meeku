import { useState, useEffect, useRef } from 'react';
import './Newsletter.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('newsletter--visible');
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail('');
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    return (
        <section className="newsletter section" id="newsletter" ref={sectionRef}>
            <div className="container">
                <div className="newsletter__inner">
                    <div className="newsletter__content">
                        <h2 className="newsletter__title">Join the Movement</h2>
                        <p className="newsletter__text">
                            Subscribe for early access to drops, exclusive pieces,<br />
                            and stories behind the collection.
                        </p>
                        <form className="newsletter__form" onSubmit={handleSubmit} id="newsletter-form">
                            <div className="newsletter__input-wrapper">
                                <input
                                    type="email"
                                    className="newsletter__input"
                                    placeholder="Your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    id="newsletter-email"
                                />
                                <button type="submit" className="newsletter__btn" id="newsletter-submit">
                                    {submitted ? 'Welcome ✓' : 'Subscribe'}
                                </button>
                            </div>
                        </form>
                        <p className="newsletter__disclaimer">
                            No spam. Unsubscribe anytime.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
