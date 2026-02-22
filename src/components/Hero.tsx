import { useEffect, useRef } from 'react';
import './Hero.css';
import logoImg from '../assets/logo.png';
import heroImg from '../assets/hero.png';

const Hero = () => {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('hero--visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Subtle parallax on mouse move
    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 12;
            const y = (clientY / innerHeight - 0.5) * 8;
            const bg = hero.querySelector('.hero__bg') as HTMLElement;
            if (bg) {
                bg.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
            }
        };

        hero.addEventListener('mousemove', handleMouseMove);
        return () => hero.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="hero" id="hero" ref={heroRef}>
            {/* Background Image */}
            <div className="hero__bg-wrapper">
                <img
                    src={heroImg}
                    alt=""
                    className="hero__bg"
                    aria-hidden="true"
                />
                <div className="hero__overlay" />
            </div>

            {/* Foreground Content */}
            <div className="hero__content container">
                <div className="hero__text">
                    <img
                        src={logoImg}
                        alt="MEEKU Logo"
                        className="hero__logo"
                    />
                    <h1 className="hero__title">MEEKU</h1>
                    <p className="hero__subtitle">
                        Minimal pastel streetwear<br />
                        designed with precision and softness.
                    </p>
                    <a href="#products" className="hero__cta" id="hero-shop-btn">
                        Shop Now
                    </a>
                </div>
            </div>

            {/* Bottom fade into page background */}
            <div className="hero__bottom-fade" />
        </section>
    );
};

export default Hero;
