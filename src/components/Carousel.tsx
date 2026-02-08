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
        showArrows={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        showStatus={false}
        showIndicators={false}
      >
        {images.map((src, index) => (
          <div key={index} className={styles.imageContainer}>
            <Image src={src} alt={`Slide ${index + 1}`} fill style={{ objectFit: 'cover' }} priority={index === 0} />
          </div>
        ))}
      </Carousel>
      <div className={styles.textOverlay}>
        <h1 className={styles.title}>Madness Expeditions</h1>
        <p className={styles.subtitle}>
          Vive la aventura de tu vida con nuestras expediciones de montaña guiadas por expertos. Descubre destinos icónicos como el Aconcagua, Mont Blanc y el Himalaya. Seguridad, profesionalismo y pasión por la montaña.
        </p>
      </div>
    </div>
  );
};

export default ImageCarousel;
