// module description:
// 

import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as RiIcons from 'react-icons/ri';
import styles from '../components/TechIcons/TechIcons.module.css';

// Default icon for technologies without a specific match
const DefaultIcon = ({ className = '' }: { className?: string; title?: string }) => (
  <div className={`${styles.defaultIcon} ${className}`}>💻</div>
);

type IconComponentProps = {
  className?: string;
  title?: string;
  style?: React.CSSProperties;
};

type IconComponent = React.ComponentType<IconComponentProps>;

type TechIconProps = {
  name: string;
  className?: string;
};

export const TechIcon: React.FC<TechIconProps> = ({ name, className = '' }) => {
  // Map of technology names to their icon components
  const iconMap: { [key: string]: IconComponent } = {

    // ...
    'writing': FaIcons.FaPencilAlt,
    'mentorship': FaIcons.FaUserGraduate,
    'mentoring': FaIcons.FaUserGraduate,
    'ai tools': FaIcons.FaRobot,
    'ai apis': FaIcons.FaRobot,
    'ai assistant': FaIcons.FaRobot,
    'web publishing': FaIcons.FaGlobe,
    'vercel': SiIcons.SiVercel,
    'render': SiIcons.SiRender,
    'netlify': SiIcons.SiNetlify,
    'rtk': SiIcons.SiRedux,
    'cloud apis': SiIcons.SiGooglecloud,
    'google apps script': SiIcons.SiGoogleappsscript,
    'google sheets': SiIcons.SiGoogleappsscript,
    'mongoosejs': SiIcons.SiMongoose,
    'passport.js': SiIcons.SiPassport,
    'pwa': SiIcons.SiPwa,
    'vps': FaIcons.FaServer,
    'ssl': FaIcons.FaLock,
    'centos': FaIcons.FaCentos,
    'ubuntu': FaIcons.FaUbuntu,
    'pm2': SiIcons.SiPm2,
    'webrtc': SiIcons.SiWebrtc,
    'whatsapp api': SiIcons.SiWhatsapp,
    'telegram api': SiIcons.SiTelegram,
    'web3.js': SiIcons.SiWeb3Dotjs,
    'security': SiIcons.SiSpringsecurity,
    'optimization': FaIcons.FaDev,
    'blockchain': SiIcons.SiHiveBlockchain,
    'cryptocurrency': SiIcons.SiEthereum,
    'c++': FaIcons.FaPlus,
    'electron.js': SiIcons.SiElectron,
    'webgl': SiIcons.SiWebgl,
    'ethereum': SiIcons.SiEthereum,
    'matter.js': SiIcons.SiMaterialdesign ,
    'metamask': SiIcons.SiEthereum,
    'web-design': RiIcons.RiPaintBrushFill ,
    'jade': SiIcons.SiHtml5 ,
    'wordpress': SiIcons.SiWordpress,
    'livescript': SiIcons.SiAwslambda ,
    '3dmax': SiIcons.SiNintendogamecube ,
    'coreldraw': SiIcons.SiCoreldraw,
    'photoshop': SiIcons.SiAdobephotoshop  ,
    'illustrator': SiIcons.SiAdobeillustrator ,
    'adobe': SiIcons.SiAdobe,
    'godot': SiIcons.SiGodotengine ,
    // 'unity': SiIcons.SiUnity,


    // Core Web
    'react': FaIcons.FaReact,
    'node': FaIcons.FaNode,
    'node.js': FaIcons.FaNode,
    'nodejs': FaIcons.FaNode,
    'javascript': FaIcons.FaJs,
    'typescript': SiIcons.SiTypescript,
    'html': FaIcons.FaHtml5,
    'html5': FaIcons.FaHtml5,
    'css': FaIcons.FaCss3Alt,
    'css3': FaIcons.FaCss3Alt,
    'sass': FaIcons.FaSass,
    'scss': FaIcons.FaSass,
    'git': FaIcons.FaGitAlt,
    'github': FaIcons.FaGithub,
    'npm': FaIcons.FaNpm,
    'yarn': FaIcons.FaYarn,
    
    // Frameworks & Libraries
    'next': SiIcons.SiNextdotjs,
    'nuxt': SiIcons.SiNuxtdotjs,
    'nuxt.js':  SiIcons.SiNuxtdotjs,
    'nuxtjs':  SiIcons.SiNuxtdotjs,
    'next.js': SiIcons.SiNextdotjs,
    'nextjs': SiIcons.SiNextdotjs,
    'redux': SiIcons.SiRedux,
    'graphql': SiIcons.SiGraphql,
    'express': SiIcons.SiExpress,
    'expressjs': SiIcons.SiExpress,
    'express.js': SiIcons.SiExpress,
    'nest': SiIcons.SiNestjs,
    'nestjs': SiIcons.SiNestjs,
    'vue': FaIcons.FaVuejs,
    'vue.js': FaIcons.FaVuejs,
    'vuejs': FaIcons.FaVuejs,
    'angular': FaIcons.FaAngular,
    'jquery': SiIcons.SiJquery,
    'three.js': SiIcons.SiThreedotjs,
    'threejs': SiIcons.SiThreedotjs,
    'socket.io': SiIcons.SiSocketdotio,
    'socketio': SiIcons.SiSocketdotio,
    
    // Styling
    'bootstrap': FaIcons.FaBootstrap,
    'tailwind': SiIcons.SiTailwindcss,
    'tailwindcss': SiIcons.SiTailwindcss,
    'material-ui': SiIcons.SiMaterialdesign,
    'materialui': SiIcons.SiMaterialdesign,
    'material design': SiIcons.SiMaterialdesign,
    'chakra': SiIcons.SiChakraui,
    'chakraui': SiIcons.SiChakraui,
    'styled-components': SiIcons.SiStyledcomponents,
    'styledcomponents': SiIcons.SiStyledcomponents,
    
    // Backend & Databases
    'python': FaIcons.FaPython,
    'java': FaIcons.FaJava,
    'php': FaIcons.FaPhp,
    'laravel': FaIcons.FaLaravel,
    'mongodb': SiIcons.SiMongodb,
    'postgres': SiIcons.SiPostgresql,
    'postgresql': SiIcons.SiPostgresql,
    'mysql': SiIcons.SiMysql,
    'redis': SiIcons.SiRedis,
    'database': FaIcons.FaDatabase,
    'sql': FaIcons.FaDatabase,
    
    // DevOps & Cloud
    'docker': SiIcons.SiDocker,
    'kubernetes': SiIcons.SiKubernetes,
    'k8s': SiIcons.SiKubernetes,
    'aws': FaIcons.FaAws,
    'amazon web services': FaIcons.FaAws,
    'google cloud': SiIcons.SiGooglecloud,
    'gcp': SiIcons.SiGooglecloud,
    'azure': FaIcons.FaMicrosoft,
    'microsoft azure': FaIcons.FaMicrosoft,
    'firebase': SiIcons.SiFirebase,
    'server': FaIcons.FaServer,
    
    // Testing & Tools
    'jest': SiIcons.SiJest,
    'cypress': SiIcons.SiCypress,
    'webpack': SiIcons.SiWebpack,
    'babel': SiIcons.SiBabel,
    'eslint': SiIcons.SiEslint,
    'prettier': SiIcons.SiPrettier,
    'vscode': FaIcons.FaMicrosoft,
    'vs code': FaIcons.FaMicrosoft,
    'visual studio code': FaIcons.FaMicrosoft,
    'microsoft': FaIcons.FaMicrosoft,
    
    // Design
    'figma': FaIcons.FaFigma,
    // 'photoshop': FaIcons.FaImage,  // Using image icon for Photoshop
    // 'illustrator': FaIcons.FaPaintBrush,  // Using paint brush for Illustrator
    'xd': FaIcons.FaVectorSquare,  // Using vector square for XD
    'adobe xd': FaIcons.FaVectorSquare,  // Using vector square for XD
    // 'adobe': FaIcons.FaImage,  // Using image icon for Adobe
    
    // OS
    'linux': FaIcons.FaLinux,
    'windows': FaIcons.FaWindows,
    'macos': FaIcons.FaApple,
    'android': FaIcons.FaAndroid,
    'ios': FaIcons.FaApple,
  };

  // Normalize the technology name for matching
  const normalizedTechName = name.trim().toLowerCase();
  
  try {
    // Find the first matching icon
    const entry = Object.entries(iconMap).find(([key]) => 
      normalizedTechName === key || 
      normalizedTechName.includes(key) ||
      key.includes(normalizedTechName)
    );

    if (entry && entry[1]) {
      const [_, Icon] = entry;
      return (
        <div className={styles.iconContainer} title={name}>
          <Icon className={`${styles.icon} ${className}`} />
        </div>
      );
    }
    
    // Fallback to default icon if no match found
    return (
      <div className={styles.iconContainer} title={name}>
        <DefaultIcon />
      </div>
    );
  } catch (error) {
    console.error(`Error rendering icon for ${name}:`, error);
    return (
      <div className={styles.iconContainer} title={name}>
        <div className={styles.icon}>💻</div>
      </div>
    );
  }
};

// Component to render multiple tech icons
type TechIconsProps = {
  techs: string | string[];
  className?: string;
  iconClassName?: string;
};

export const TechIcons: React.FC<TechIconsProps> = ({ 
  techs, 
  className = '', 
  iconClassName = '' 
}) => {
  // Convert single string to array and split by comma if needed
  const techArray = Array.isArray(techs) 
    ? techs 
    : techs.split(',').map(t => t.trim()).filter(Boolean);

  return (
    <div className={`${styles.iconsList} ${className}`}>
      {techArray.map((tech, index) => (
        <TechIcon 
          key={`${tech}-${index}`} 
          name={tech} 
          className={iconClassName}
        />
      ))}
    </div>
  );
};
