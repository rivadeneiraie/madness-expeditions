import Image from 'next/image';
import styles from './GuidedRoutes.module.css';
import { Oswald } from 'next/font/google';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const GuidedRoutes = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.textContent}>
          <p className={styles.subtitle}>QUÉ TE ESPERA</p>
          <h2 className={`${styles.title} ${oswald.className}`}>RUTAS GUIADAS</h2>
          <ul className={styles.list}>
            <li>
              <span className={styles.bullet}>◎</span> CONDUCES TU BUGGY
            </li>
            <li>
              <span className={styles.bullet}>◎</span> DESCUBRIR EL DESIERTO DESDE DENTRO
            </li>
            <li>
              <span className={styles.bullet}>◎</span> RINCONES ESPECTACULARES
            </li>
          </ul>
          <button className={styles.button}>
            DESCUBRE NUESTRAS RUTAS <span>→</span>
          </button>
        </div>
      </div>
      <div
        className={styles.imageContainer}
        style={{ backgroundImage: `url('/images/IMG-20250420-WA0026.jpg')` }}
      ></div>
    </div>
  );
};

export default GuidedRoutes;
