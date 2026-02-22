import { useEffect, useRef } from 'react';
import './Banner.css';
import bannerImg from '../assets/banner.png';

const Banner = () => {
    const bannerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('banner--visible');
                    }
                });
            },
            { threshold: 0.15 }
        );

        if (bannerRef.current) {
            observer.observe(bannerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="banner section" id="about" ref={bannerRef}>
            <div className="container">
                <div className="banner__wrapper">
                    <img
                        src={bannerImg}
                        alt="MEEKU Brand Story"
                        className="banner__image"
                        loading="lazy"
                    />
                    <div className="banner__overlay">
                        <div className="banner__content">
                            <span className="banner__tag">Our Story</span>
                            <h2 className="banner__title">Wear What Feels Right</h2>
                            <p className="banner__text">
                                Born from a desire for simplicity and self-expression,<br />
                                MEEKU blends pastel palettes with streetwear silhouettes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
