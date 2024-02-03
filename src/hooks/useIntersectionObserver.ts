import { useEffect, useState, useRef, RefObject } from "react";

const useIntersectionObserver = (): [boolean, RefObject<HTMLDivElement>] => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsVisible(entry.isIntersecting));
    });

    const { current } = domRef;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return [isVisible, domRef];
};

export default useIntersectionObserver;
