import React, { useMemo, useState } from 'react';
import workExperienceData from '../../assets/data/work-experience.json';
import personalSkillsData from '../../assets/data/personal-skills.json';
import skillsYears from '../../assets/data/skills-years.json';
import './TechnologiesProgress.css';

interface WorkExperience {
  years: string;
  technologies: string;
}

interface TechnologyUsage {
  name: string;
  duration: number;
  percentage: number;
  color: string;
}

// Colors for different technology categories
const COLORS = {
  'JavaScript': '#f0db4f',
  'TypeScript': '#007acc',
  'React': '#61dafb',
  'Node.js': '#68a063',
  'HTML': '#e34c26',
  'CSS': '#264de4',
  'Sass': '#cc6699',
  'Redux': '#764abc',
  'GraphQL': '#e10098',
  'MongoDB': '#4db33d',
  'PostgreSQL': '#336791',
  'Docker': '#0db7ed',
  'Git': '#f34f29',
  'Webpack': '#8dd6f9',
  'Jest': '#c21325',
  'Cypress': '#17202C',
  'Photoshop': '#001e36',
  'Illustrator': '#330000',
  '3DMax': '#2d5f8d',
  'Figma': '#f24e1e',
  'Blender': '#ea7600',
  'Bootstrap': '#563d7c',
  'Tailwind': '#38b2ac',
  'Next.js': '#000000',
  'NestJS': '#e0234e',
  'Express': '#000000',
  'Mongoose': '#880000',
  'D3.js': '#f9a03c',
  'Three.js': '#000000',
  'PixiJS': '#f9a01b',
  'MobX': '#ff9955',
  'JWT': '#000000',
  'OAuth': '#eb5424',
  'REST': '#6e5494',
  'WebSockets': '#00e5ff',
  'WebRTC': '#333333',
  'PWA': '#5a0fc8',
  'Jira': '#0052cc',
  'Confluence': '#172b4d',
  'Trello': '#0079bf',
  'Slack': '#4a154b',
  'VS Code': '#0078d7',
  'WebStorm': '#00cdff',
  'GitHub': '#181717',
  'GitLab': '#fca121',
  'Bitbucket': '#0052cc',
  'npm': '#cb3837',
  'Yarn': '#2c8ebb',
  'Linux': '#fcc624',
  'Windows': '#0078d7',
  'macOS': '#000000',
  'AWS': '#ff9900',
  'Firebase': '#ffca28',
  'Vercel': '#000000',
  'Netlify': '#00c7b7',
  'Heroku': '#430098',
  'DigitalOcean': '#0080ff',
  'Nginx': '#009639',
  'Apache': '#d22128',
  'WordPress': '#21759b',
  'Shopify': '#7ab55c',
  'WooCommerce': '#96588a',
  'Magento': '#ee6723',
  'PrestaShop': '#df0067',
  'OpenCart': '#78cdd7',
  'BigCommerce': '#121212',
  'Squarespace': '#000000',
  'Wix': '#0c6efc',
  'Webflow': '#4353ff',
  'Bubble': '#e61d4c',
  'Zapier': '#ff4a00',
  'Make': '#00a9ff',
  'Airtable': '#18bfff',
  'Notion': '#000000',
  'ClickUp': '#7b68ee',
  'Asana': '#ff6b6b',
  'Monday': '#f62b54',
  'Basecamp': '#1d2d35',
  'Framer': '#0055ff',
  'Rive': '#ff7d00',
  'Lottie': '#00b0ff',
  'GSAP': '#88ce02',
  'Framer Motion': '#0055ff',
  'React Spring': '#ff6d6d',
  'React Three Fiber': '#000000',
  'React Three Drei': '#000000',
  'React Three Cannon': '#000000',
  'React Three A11y': '#000000',
  'React Three Postprocessing': '#000000',
  'React Three Fiber Drei': '#000000',
  'React Three Fiber Postprocessing': '#000000',
  'React Three Fiber A11y': '#000000',
  'React Three Fiber Cannon': '#000000',
  'React Three Fiber Drei Postprocessing': '#000000',
  'React Three Fiber Drei A11y': '#000000',
  'React Three Fiber Drei Cannon': '#000000',
  'default': '#6c757d', // Default color for technologies not in the list
} as const;

const TechnologiesProgress: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'percentage' | 'years'>('percentage');

  // Process work experience data to calculate technology usage
  const technologies = useMemo(() => {
    const techMap = new Map<string, number>();
    
    workExperienceData.forEach((job: WorkExperience) => {
      // Extract years from the 'years' field (e.g., '2014-2015' or '2014')
      const years = job.years.split('-').map(y => {
        const year = y.trim().match(/\d{4}/);
        return year ? parseInt(year[0], 10) : 0;
      }).filter(y => y > 0);
      
      // Calculate duration in years (minimum 1 year)
      const duration = years.length >= 2 ? years[1] - years[0] + 1 : 1;
      
      // Split technologies and add to the map
      const techs = job.technologies.split(',').map(t => t.trim());
      techs.forEach(tech => {
        if (tech) {
          techMap.set(tech, (techMap.get(tech) || 0) + duration);
        }
      });
    });

    // Convert to array and calculate relative percentages
    const techArray = Array.from(techMap.entries())
      .map(([name, duration]) => ({
        name,
        duration,
        color: COLORS[name as keyof typeof COLORS] || COLORS.default,
      }));
      
    // Find the maximum duration to use as 100%
    const maxDuration = Math.max(...techArray.map(tech => tech.duration));
    
    // Calculate relative percentages and sort
    const techArrayWithPercentages: TechnologyUsage[] = techArray
      .map(tech => ({
        ...tech,
        percentage: Math.round((tech.duration / maxDuration) * 1000) / 10, // One decimal place, relative to max
      }))
      .sort((a, b) => b.percentage - a.percentage); // Sort by percentage descending

    return techArrayWithPercentages;
  }, []);

  // Helper: parse a details string into years as number
  const parseYears = (detailsRaw: string): number => {
    if (!detailsRaw) return 0;
    const details = detailsRaw.toLowerCase();

    // e.g., "(13+)" inside parentheses
    const parenNumber = details.match(/\((\d+)\+?\)/);
    if (parenNumber) {
      return parseFloat(parenNumber[1]);
    }

    // e.g., "10+" or "10 +"
    const plusNumber = details.match(/\b(\d+)\s*\+\b/);
    if (plusNumber) {
      return parseFloat(plusNumber[1]);
    }

    // e.g., "10 years", "3 year"
    const yearsMatch = details.match(/\b(\d+)\s*(years|year)\b/);
    if (yearsMatch) {
      return parseFloat(yearsMatch[1]);
    }

    // e.g., "half year"
    if (/half\s*year/.test(details)) {
      return 0.5;
    }

    // e.g., "2 month", "3 months"
    const monthsMatch = details.match(/\b(\d+)\s*(months|month)\b/);
    if (monthsMatch) {
      return Math.round((parseFloat(monthsMatch[1]) / 12) * 10) / 10;
    }

    // e.g., "from 2016" -> approximate: currentYear - 2016
    const fromYear = details.match(/from\s*(\d{4})/);
    if (fromYear) {
      const year = parseInt(fromYear[1], 10);
      const currentYear = new Date().getFullYear();
      if (year <= currentYear) {
        return Math.max(0, currentYear - year);
      }
    }

    // Strict bare number or with 'y' suffix (e.g., "2" or "2 y")
    const strictBare = details.match(/^\s*(\d+)\s*(y|yr|yrs)?\s*$/);
    if (strictBare) {
      return parseFloat(strictBare[1]);
    }

    return 0;
  };

  // Normalize technology names for consistent coloring
  const normalizeTechName = (raw: string): string => {
    const name = raw.trim();
    const map: Record<string, string> = {
      'NodeJS': 'Node.js',
      'NodeJs': 'Node.js',
      'Node': 'Node.js',
      'Express.js': 'Express',
      'Next': 'Next.js',
      'NuxtJS': 'Nuxt',
      'ThreeJS': 'Three.js',
      'ReactJS': 'React',
      'AngularJs': 'AngularJS',
      '3DSMax': '3DMax',
      'CorelDrow': 'CorelDraw',
    };
    return map[name] || name;
  };

  // Build technologies by years (prefer flat list skills-years.json, fallback to personal-skills.json parsing)
  const yearsTechnologies = useMemo(() => {
    type Section = { type: string; data: { title: string; details: string }[] };
    const techMap = new Map<string, number>();

    // Allowed sections/categories where numeric values represent durations
    const allowedSet = new Set<string>([
      'Job-related skills',
      'Frameworks',
      'Server Administration',
      'Graphics',
      'Other experience',
      'Intensive practice during study',
      // For object schema (category keys)
      'Core Stack',
      'Frontend',
      'Backend',
    ]);

    // 1) Prefer explicit flat list if provided
    type FlatItem = { title: string; years: number };
    const flatList = (skillsYears as unknown as FlatItem[]) || [];
    flatList.forEach((it) => {
      if (!it || !it.title) return;
      const years = typeof it.years === 'number' ? it.years : 0;
      if (years > 0) {
        const key = normalizeTechName(it.title);
        const prev = techMap.get(key) || 0;
        techMap.set(key, Math.max(prev, years));
      }
    });

    // 2) If flat list is empty, fallback to legacy parsing
    if (techMap.size === 0) {
      const data: unknown = personalSkillsData as unknown;

      if (Array.isArray(data)) {
        // Array-of-sections schema
        (data as Section[]).forEach((section) => {
          if (!allowedSet.has(section.type)) return;
          section.data.forEach((item) => {
            const years = parseYears(item.details || '');
            if (years > 0) {
              const key = normalizeTechName(item.title);
              const prev = techMap.get(key) || 0;
              techMap.set(key, Math.max(prev, years));
            }
          });
        });
      } else if (data && typeof data === 'object') {
        // Object-with-categories schema
        const obj = data as Record<string, string[]>;
        Object.entries(obj).forEach(([category, entries]) => {
          if (!allowedSet.has(category)) return;
          if (!Array.isArray(entries)) return;
          entries.forEach((line) => {
            // Expect pattern like "Tech — details"
            const parts = String(line).split('—');
            const title = normalizeTechName((parts[0] || '').trim());
            const details = (parts[1] || '').trim();
            const years = parseYears(details);
            if (title && years > 0) {
              const prev = techMap.get(title) || 0;
              techMap.set(title, Math.max(prev, years));
            }
          });
        });
      }
    }

    const techArray = Array.from(techMap.entries()).map(([name, duration]) => ({
      name,
      duration,
      color: COLORS[name as keyof typeof COLORS] || COLORS.default,
    }));

    if (techArray.length === 0) return [] as TechnologyUsage[];

    const maxDuration = Math.max(...techArray.map((t) => t.duration));

    const withPercentages: TechnologyUsage[] = techArray
      .map((t) => ({
        ...t,
        percentage: Math.round((t.duration / maxDuration) * 1000) / 10,
      }))
      .sort((a, b) => b.duration - a.duration);

    return withPercentages;
  }, []);

  const formatYearsEn = (years: number) => {
    const n = Math.round(years * 10) / 10;
    const int = Math.floor(n);
    const frac = Math.round((n - int) * 10);
    if (frac !== 0) return `${n} years`;
    return `${int} ${int === 1 ? 'year' : 'years'}`;
  };

  return (
    <div className="technologies-progress">
      <h3>Technology Experience</h3>
      <div className="tech-tabs" role="tablist" aria-label="Technology experience view">
        <button
          type="button"
          className={`tech-tab ${activeTab === 'percentage' ? 'active' : ''}`}
          role="tab"
          aria-selected={activeTab === 'percentage' ? 'true' : 'false'}
          onClick={() => setActiveTab('percentage')}
        >
          Percentage
        </button>
        <button
          type="button"
          className={`tech-tab ${activeTab === 'years' ? 'active' : ''}`}
          role="tab"
          aria-selected={activeTab === 'years' ? 'true' : 'false'}
          onClick={() => setActiveTab('years')}
        >
          Years
        </button>
      </div>
      <div className="progress-bars">
        {(activeTab === 'percentage' ? technologies : yearsTechnologies).map((tech) => (
          <div key={`${activeTab}-${tech.name}`} className="progress-item">
            <div className="tech-info">
              <span className="tech-name">{tech.name}</span>
              {activeTab === 'percentage' ? (
                <span className="tech-percentage">{tech.percentage}%</span>
              ) : (
                <span className="tech-percentage">{formatYearsEn(tech.duration)}</span>
              )}
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${tech.percentage}%`,
                  backgroundColor: tech.color,
                }}
                role="progressbar"
                aria-valuenow={tech.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologiesProgress;
