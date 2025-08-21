import React, { useState, useEffect, useRef } from 'react';

interface StatCounterProps {
  end: number;
  duration?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current!);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const endValue = end;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round((duration * 1000) / frameDuration);
    let frame = 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const counter = setInterval(() => {
      frame++;
      const progress = easeOutCubic(frame / totalFrames);
      const currentCount = Math.round(endValue * progress);

      setCount(currentCount);

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [isVisible, end, duration]);
  
  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('uk-UA').format(num);
  }

  return <span ref={ref}>{formatNumber(count)}</span>;
};

export default StatCounter;
