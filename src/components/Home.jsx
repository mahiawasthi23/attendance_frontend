import React from 'react';
import './Home.css'; 

const Home = () => {
    return (
        <div className="app-container">
            <main>
                <section className="hero-section">
                    <div className="container hero-content-wrapper">
                        <div className="hero-text-container">
                            <div className="hero-heading-group">
                                <h1 className="hero-title">Welcome to the Smart Attendance Portal</h1>
                                <h2 className="hero-subtitle">AJMF + Navgurukul</h2>
                            </div>
                            <div className="hero-button-wrapper">
                                <button className="hero-button" aria-label="Get Started">
                                    <span>Get Started</span>
                                </button>
                            </div>
                        </div>
                        <div className="hero-image-wrapper">
                            <img
                                className="hero-image"
                                alt="A modern illustration of students on a campus using technology."
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL0W4Uc_n0bHKzOOKVyyBvNEGtlq3EXpi7-kG7n2cXhKeYQHF0elvjTzdLEFbPB56YB_Ig4ViMVP9dT_ffW5q7qCRjxY9_J9V2IHVOBq5LTsoiuk2-SpheSYWt8ECUXSp8bw0CKNl4AQoL-kTlqv1hcpWNoxF8fwP65-auZjrZuyeJWgYTCpSQFiVAWMWKF-e6YzJrTs41Lw_DWyfCn2TvdCbiAbjI_9VxM196h2oJMyqjUh2lKzLWOzoXzw9Hfl3zBGp0ADxPPA6C"
                            />
                        </div>
                    </div>
                </section>

                <section className="feature-section">
                    <div className="container feature-wrapper">
                        <div className="feature-header">
                            <h2 className="section-title">Features</h2>
                            <p className="section-description">
                                Our platform streamlines daily operations, making campus life more efficient for both students and administrators.
                            </p>
                        </div>
                        <div className="feature-grid">
                            <article className="feature-card">
                                <div className="feature-icon primary-color" aria-hidden="true">
                                    <span className="material-symbols-outlined">qr_code_scanner</span>
                                </div>
                                <div className="feature-text-group">
                                    <h3 className="card-title">Smart QR Attendance</h3>
                                    <p className="card-description">
                                        Students can quickly and securely mark their attendance using a simple QR code scan from their mobile device.
                                    </p>
                                </div>
                            </article>

                            <article className="feature-card">
                                <div className="feature-icon primary-color" aria-hidden="true">
                                    <span className="material-symbols-outlined">calendar_month</span>
                                </div>
                                <div className="feature-text-group">
                                    <h3 className="card-title">Leave & Kitchen Duty</h3>
                                    <p className="card-description">
                                        Easily apply for leave, manage kitchen duties, and view schedules all in one place, reducing manual paperwork.
                                    </p>
                                </div>
                            </article>
                        
                            <article className="feature-card">
                                <div className="feature-icon primary-color" aria-hidden="true">
                                    <span className="material-symbols-outlined">dashboard</span>
                                </div>
                                <div className="feature-text-group">
                                    <h3 className="card-title">Personalized Dashboards</h3>
                                    <p className="card-description">
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
