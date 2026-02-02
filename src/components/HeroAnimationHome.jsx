import React from 'react';

const HeroAnimationHome = () => {
    return (
        <div className="w-full h-full relative overflow-hidden">
            <div
                className="absolute inset-0"
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    style={{
                        filter: 'brightness(0.8) contrast(1.1)',
                    }}
                >
                    <source src="/images/home1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default HeroAnimationHome;