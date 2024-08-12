import React, { useEffect, useState } from "react";
import "./Banner.scss";
import { Link } from "react-router-dom";

const Banner = ({ banner }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        handleClockTimer();
    }, [banner]);

    const handleClockTimer = () => {
        if (!banner || !banner.countdownTimer) return;

        const countdownDuration = parseInt(banner.countdownTimer, 10); // Countdown duration in seconds
        const targetTime = new Date().getTime() + countdownDuration * 1000;

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetTime - now;

            if (distance < 0) {
                setTimeLeft("Time's Up");
                return;
            }

            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(
                `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
                    2,
                    "0"
                )}:${String(seconds).padStart(2, "0")}`
            );
        };

        // Update countdown every second
        const intervalId = setInterval(updateCountdown, 1000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    };

    // Handle countdown timer
    useEffect(() => {}, [banner]);

    return (
        <div
            className="Hero"
            style={{ backgroundImage: `url(${banner?.bannerImage})` }}
        >
            <div className="hero-content center">
                <div className="hero-info">
                    <h2 className="heading">{banner?.heading}</h2>

                    <div className="banner-content">
                        <p className="subheading">{banner?.subheading}</p>
                        <p>{banner?.description}</p>
                        <div className="banner-link">
                            <Link className="btn-primary" to={banner ? banner?.link : ""} style={{textDecoration : 'none'}}>Click</Link>
                        </div>
                        <div>
                            <h1 className="heading">{timeLeft}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
