import React from 'react';
import './Home.css'; 

const Home = () => {
    return (
        <div className="home-app-container">
            <main>
                <section className="home-hero-section">
                    <div className="home-container home-hero-content-wrapper">
                        <div className="home-hero-text-container">
                            <div className="home-hero-heading-group">
                                <h1 className="home-hero-title">Welcome to the Smart Attendance Portal</h1>
                                <h2 className="home-hero-subtitle">Anish Jadav Memorial Foundation Navgurukul Pune</h2>
                            </div>
                            <div className="home-hero-button-wrapper">
                                <button className="home-hero-button" aria-label="Get Started">
                                    <span>Get Started</span>
                                </button>
                            </div>
                        </div>
                        <div className="home-hero-image-wrapper">
                            <img
                                className="home-hero-image"
                                alt="girl with qr"
                                src="gairl_with_qr.png"
                            />
                        </div>
                    </div>
                </section>

                <section className="home-feature-section">
                    <div className="home-container feature-wrapper">
                        <div className="home-feature-header">
                            <h2 className="home-section-title">Features</h2>
                            <p className="home-section-description">
                                Our platform streamlines daily operations, making campus life more efficient for both students and administrators.
                            </p>
                        </div>
                        <div className="home-feature-grid">
                            <article className="home-feature-card">
                                <div className="home-feature-icon home-primary-color" aria-hidden="true">
                                    <span className="home-material-symbols-outlined">qr_code_scanner</span>
                                </div>
                                <div className="home-feature-text-group">
                                    <h3 className="home-card-title">Smart QR Attendance</h3>
                                    <p className="home-card-description">
                                        Students can quickly and securely mark their attendance using a simple QR code scan from their mobile device.
                                    </p>
                                </div>
                            </article>

                            <article className="home-feature-card">
                                <div className="home-feature-icon home-primary-color" aria-hidden="true">
                                    <span className="home-material-symbols-outlined">calendar_month</span>
                                </div>
                                <div className="home-feature-text-group">
                                    <h3 className="home-card-title">Leave & Kitchen Duty</h3>
                                    <p className="home-card-description">
                                        Easily apply for leave, manage kitchen duties, and view schedules all in one place, reducing manual paperwork.
                                    </p>
                                </div>
                            </article>

                            <article className="home-feature-card">
                                <div className="home-feature-icon home-primary-color" aria-hidden="true">
                                    <span className="home-material-symbols-outlined">dashboard</span>
                                </div>
                                <div className="home-feature-text-group">
                                    <h3 className="home-card-title">Personalized Dashboards</h3>
                                    <p className="home-card-description">
                                        Admins and students get access to dedicated dashboards for tracking attendance records, leave statuses, and more.
                                    </p>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
