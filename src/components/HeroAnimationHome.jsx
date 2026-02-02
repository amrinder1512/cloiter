import React from 'react';

const HeroAnimationHome = () => {
    return (
        <div className="w-full h-full relative overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 15%, black 65%, black 100%)',
                    maskImage: 'linear-gradient(to right, transparent 0%, transparent 15%, black 65%, black 100%)',
                }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-105"
                    style={{
                        mixBlendMode: 'screen',
                        filter: 'brightness(1.2) contrast(1.1)',
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