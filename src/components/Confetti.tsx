
'use client';

import {useState, useEffect} from 'react';

const Confetti = () => {
  const [pieces, setPieces] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const confettiPieces = Array.from({length: 100}).map((_, i) => {
      const style: React.CSSProperties = {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 3 + 4}s`,
        backgroundColor: ['#F4B4C4', '#E4D00A', '#FFFFFF'][
          Math.floor(Math.random() * 3)
        ],
      };
      const dimensions = Math.random() * 0.5 + 0.25;
      style.width = `${dimensions}rem`;
      style.height = `${dimensions}rem`;
      return (
        <div
          key={i}
          className="animate-fall absolute top-[-20px]"
          style={style}
        ></div>
      );
    });
    setPieces(confettiPieces);
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-50 h-full w-full overflow-hidden">
      {pieces}
    </div>
  );
};

export default Confetti;
