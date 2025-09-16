import React from 'react';
import styles from './Cart1.module.css';
import photo from '@/assets/images/photo.jpg';

interface Cart1Props {
    title?: string;
    description?: string;
    price?: number;
    onAddToCart?: () => void;
}

const Cart1: React.FC<Cart1Props> = ({
    title = 'Dyachuk Vitaliy',
    description = 'Fullstack JS Developer\n(React, Vue, Angular, NodeJS, Web-Design, Web-3D, AI)',
    onAddToCart = () => { window.open('https://github.com/SpiritUrban', '_blank'); },
}) => {
    return (
        <div className={styles.cart}>
            {/* Background SVG */}
            <svg
                viewBox="0 0 518 219"
                fill="none"
                className={styles.backgroundSvg}
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <path fillRule="evenodd" clipRule="evenodd" d="M230.939 13.3297H504.209L517.619 26.7397V205.21L503.969 218.86H169.409L149.849 199.3H12.0294L1.10938 188.38C1.10938 188.38 1.61937 23.9197 1.22937 23.9197L23.9994 1.17969H218.789L230.939 13.3297ZM24.2394 1.77969L1.85938 24.1597C1.91938 24.9097 1.91937 26.6797 1.94937 31.0897C1.97937 35.3797 1.97937 41.6797 1.97937 49.7797C1.97937 63.4297 1.97937 82.4497 1.91937 106.3C1.82937 145.24 1.70938 184.63 1.70938 188.14L12.2994 198.7H150.119L150.299 198.88L169.649 218.26H503.729L517.019 204.97V26.9797L503.969 13.9297H230.699L230.519 13.7497L218.549 1.77969H24.2394Z" fill="#0BA0F9" />
                <g opacity="0.1">
                    <path d="M1.22937 23.9197L23.9994 1.17969H218.789L230.939 13.3297H504.209L517.619 26.7097V205.21L503.969 218.86H169.409L149.849 199.3H12.0294L1.10938 188.38C1.10938 188.38 1.61937 23.5297 1.22937 23.9197Z" fill="#0BA0F9" />
                </g>
                <path opacity="0.1" d="M253.5 13.9L243.27 24.13H197.19L180.9 7.80996H40.5896L24.4196 23.98V181.3L30.9596 187.84H116.19L127.2 198.85H12.0296L1.34961 188.14V23.92L24.0596 1.20996H218.79L230.91 13.36C230.91 13.36 253.11 13.9 253.5 13.9Z" fill="#0BA0F9" />
                <path opacity="0.1" d="M517.321 48.9997L508.471 57.8797V165.49L472.021 201.94H390.031L373.561 218.44H503.971L517.411 205C517.411 205 517.321 47.8297 517.321 48.9997Z" fill="#0BA0F9" />
                <path d="M0.989682 19.8102L19.8897 0.910156H10.2297L0.929688 10.2402C0.929688 10.2402 0.959682 19.8402 0.989682 19.8102Z" fill="#0BA0F9" />
                <path d="M230.37 2.70979L235.56 7.9298H503.07L497.16 2.0498H229.68L230.37 2.70979Z" fill="#0BA0F9" />
                <path d="M147.72 204.37L160.83 217.48H152.01L138.9 204.37" fill="#0BA0F9" />
                <path d="M132.42 204.37L145.53 217.48H136.71L123.6 204.37" fill="#0BA0F9" />
                <path d="M117.121 204.37L130.231 217.48H121.411L108.301 204.37" fill="#0BA0F9" />
                <path d="M101.82 204.37L114.93 217.48H106.11L93 204.37" fill="#0BA0F9" />
                <path d="M86.5192 204.37L99.6292 217.48H90.8092L77.6992 204.37" fill="#0BA0F9" />
                <path d="M71.2204 204.37L84.3304 217.48H75.5104L62.4004 204.37" fill="#0BA0F9" />
                <path d="M517.321 185.68L492.391 210.61H344.791L336.811 218.59H503.971L517.471 205.09C517.471 205.09 517.831 186.19 517.321 185.68Z" fill="#0BA0F9" />
            </svg>

            {/* Content */}
            <div className={styles.content}>
                {/* Left Section - Image */}
                <div className={styles.leftSection}>
                    <div className={styles.shadowWrap}>
                        <div className={styles.imageContainer}>
                            <img
                                src={photo}
                                alt="Profile"
                                className={styles.image}
                            />
                        </div>
                    </div>

                </div>

                {/* Right Section - Text and Button */}
                <div className={styles.rightSection}>
                    <div>
                        <h2 className={styles.title}>{title}</h2>
                        <p className={styles.description}>
                            {description}
                        </p>
                    </div>
                    <button
                        className={`${styles.button} glitch-button glitch-6 `}
                        onClick={onAddToCart}
                    >
                        My GitHub
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart1;
