import { useEffect, useRef } from 'react';
import './Editorial.css';
import editorial1Img from '../assets/editorial1.png';
import editorial2Img from '../assets/editorial2.png';

const Editorial = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('editorial--visible');
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

    return (
        <section className="editorial section" id="editorial" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title">Editorial</h2>
                <p className="section-subtitle">
                    A closer look at the pieces that define our vision.
                </p>
                <div className="editorial__grid">
                    <div className="editorial__card editorial__card--large">
                        <div className="editorial__image-wrapper">
                            <img
                                src={editorial1Img}
                                alt="MEEKU Editorial - Collection Lookbook"
                                className="editorial__image"
                                loading="lazy"
                            />
                        </div>
                        <div className="editorial__caption">
                            <span className="editorial__tag">Lookbook</span>
                            <h3 className="editorial__card-title">Spring / Summer 2026</h3>
                            <p className="editorial__card-text">
                                Exploring the intersection of comfort and expression.
                            </p>
                        </div>
                    </div>
                    <div className="editorial__card editorial__card--small">
                        <div className="editorial__image-wrapper">
                            <img
                                src={editorial2Img}
                                alt="MEEKU Editorial - Fabric Details"
                                className="editorial__image"
                                loading="lazy"
                            />
                        </div>
                        <div className="editorial__caption">
                            <span className="editorial__tag">Behind the Craft</span>
                            <h3 className="editorial__card-title">Material Study</h3>
                            <p className="editorial__card-text">
                                Quality fabrics chosen with intention.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Editorial;
