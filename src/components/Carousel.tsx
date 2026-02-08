"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import styles from './Carousel.module.css';

const ImageCarousel = () => {
  const images = [
    '/images/IMG_20240315_160927217.jpg',
    '/images/IMG_20240316_093009604.jpg',
    '/images/IMG_20250418_074156273_HDR.jpg',
    '/images/IMG_20251231_131222541.jpg',
  ];

  return (
    <div className={styles.carouselContainer}>
      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        showStatus={false}
      >
        {images.map((src, index) => (
          <div key={index} className={styles.imageContainer}>
            <Image src={src} alt={`Slide ${index + 1}`} layout="fill" objectFit="cover" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
