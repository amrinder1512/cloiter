import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

const HeroAnimation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('https://cdn.prod.website-files.com/650940518bc322ab5b65f32f/65155d49af81c4ed08831fb2_Fortuna%20Cysec%20Hero%20Section%20Animation.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  return (
    <div
      className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-auto"
      style={{
        mixBlendMode: 'screen',
        opacity: 0.9
      }}
    >
      {animationData && (
        <div style={{ filter: 'brightness(1.2) contrast(1.1)' }}>
          <Lottie animationData={animationData} loop autoplay />
        </div>
      )}
    </div>
  );
};

export default HeroAnimation;
