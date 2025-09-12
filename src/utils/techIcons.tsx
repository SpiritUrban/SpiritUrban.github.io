import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

// Default icon for technologies without a specific match
const DefaultIcon = ({ className = '', title = '' }: { className?: string; title?: string }) => (
  <div className={`${className} tech-icon`} title={title}>💻</div>
);

type IconComponentProps = {
  className?: string;
  title?: string;
};

type TechIconProps = {
  name: string;
  className?: string;
};

export const TechIcon: React.FC<TechIconProps> = ({ name, className = '' }) => {
  // Map of technology names to their icon components
  const iconMap: { [key: string]: React.ComponentType<IconComponentProps> } = {
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
    'next.js': SiIcons.SiNextdotjs,
    'nextjs': SiIcons.SiNextdotjs,
    'redux': SiIcons.SiRedux,
    'graphql': SiIcons.SiGraphql,
    'express': SiIcons.SiExpress,
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
    'photoshop': FaIcons.FaImage,  // Using image icon for Photoshop
    'illustrator': FaIcons.FaPaintBrush,  // Using paint brush for Illustrator
    'xd': FaIcons.FaVectorSquare,  // Using vector square for XD
    'adobe xd': FaIcons.FaVectorSquare,  // Using vector square for XD
    'adobe': FaIcons.FaImage,  // Using image icon for Adobe
    
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
      const [_, IconComponent] = entry;
      // Create a new component that wraps the icon and adds the title as a tooltip
      const IconWithTitle = () => (
        <div className="relative group" title={name}>
          <IconComponent className={`${className} tech-icon`} />
        </div>
      );
      return <IconWithTitle />;
    }
    
    // Fallback to default icon if no match found
    return <DefaultIcon className={className} title={name} />;
  } catch (error) {
    console.error(`Error rendering icon for ${name}:`, error);
    return <DefaultIcon className={className} title={name} />;
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
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {techArray.map((tech, index) => (
        <TechIcon key={`${tech}-${index}`} name={tech} className={iconClassName} />
      ))}
    </div>
  );
};
