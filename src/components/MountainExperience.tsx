import styles from './MountainExperience.module.css';
import { Oswald, Roboto } from 'next/font/google';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const MountainExperience = () => {
  return (
    <section className={`${styles.buggySection} ${roboto.className}`}>
      <div className={styles.titleContainer}>
        <h2 className={`${styles.mainTitle} ${oswald.className}`}>
          VIVE UNA AVENTURA INOLVIDABLE EN LA MONTAÑA
        </h2>
        <div className={styles.subtitleContainer}>
          <hr className={styles.line} />
          <h3 className={`${styles.subtitle} ${oswald.className}`}>
            RUTAS DE SENDERISMO Y TREKKING
          </h3>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.leftColumn}>
          <p>
            <strong>¿Buscas una conexión profunda con la naturaleza?</strong>{' '}
            Descubre paisajes impresionantes y aire puro en nuestras rutas de
            montaña.
          </p>
          <p>
            Equípate con tus botas y mochila, y prepárate para la aventura,{' '}
            <strong>¡La cumbre te espera!</strong>
          </p>
        </div>
        <div className={styles.rightColumn}>
          <p>
            Nuestras expediciones de montaña te llevarán por valles escondidos,
            bosques frondosos y picos desafiantes. Ofrecemos rutas para todos
            los niveles, desde paseos familiares hasta trekking de alta montaña.
          </p>
          <p>
            Disfruta de cascadas, fauna local, y vistas panorámicas que te
            dejarán sin aliento. Una experiencia para el cuerpo y el alma que
            recordarás para siempre.
          </p>
        </div>
      </div>
      <div className={styles.contactButtonContainer}>
        <button className={`${styles.contactButton} ${oswald.className}`}>
          RESERVA TU AVENTURA &rarr;
        </button>
      </div>
    </section>
  );
};

export default MountainExperience;
