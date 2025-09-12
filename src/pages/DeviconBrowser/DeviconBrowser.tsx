import { useState, useCallback, useEffect } from 'react';
import './DeviconBrowser.css';

interface Devicon {
  name: string;
  iconClass: string;
  category: string;
}

const DeviconBrowser: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllIcons, setShowAllIcons] = useState(true);
  const [icons, setIcons] = useState<Devicon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load predefined list of popular devicon icons
  useEffect(() => {
    const loadIcons = () => {
      // List of popular devicon icons with their categories
      const popularIcons = [
        // JavaScript/TypeScript
        { name: 'javascript', category: 'plain-colored' },
        { name: 'typescript', category: 'plain-colored' },
        { name: 'nodejs', category: 'plain-colored' },
        { name: 'react', category: 'plain-colored' },
        { name: 'vuejs', category: 'plain-colored' },
        { name: 'angular', category: 'plain-colored' },
        { name: 'svelte', category: 'plain-colored' },
        { name: 'nextjs', category: 'plain-colored' },
        { name: 'nuxtjs', category: 'plain-colored' },
        
        // Backend
        { name: 'python', category: 'plain-colored' },
        { name: 'java', category: 'plain-colored' },
        { name: 'php', category: 'plain-colored' },
        { name: 'ruby', category: 'plain-colored' },
        { name: 'go', category: 'plain-colored' },
        { name: 'rust', category: 'plain-colored' },
        { name: 'csharp', category: 'plain-colored' },
        { name: 'cplusplus', category: 'plain-colored' },
        
        // Databases
        { name: 'mongodb', category: 'plain-colored' },
        { name: 'postgresql', category: 'plain-colored' },
        { name: 'mysql', category: 'plain-colored' },
        { name: 'redis', category: 'plain-colored' },
        { name: 'sqlite', category: 'plain-colored' },
        
        // Cloud & DevOps
        { name: 'docker', category: 'plain-colored' },
        { name: 'kubernetes', category: 'plain-colored' },
        { name: 'aws', category: 'plain-colored' },
        { name: 'azure', category: 'plain-colored' },
        { name: 'googlecloud', category: 'plain-colored' },
        { name: 'firebase', category: 'plain-colored' },
        { name: 'heroku', category: 'plain-colored' },
        
        // Tools & Other
        { name: 'git', category: 'plain-colored' },
        { name: 'github', category: 'plain-colored' },
        { name: 'gitlab', category: 'plain-colored' },
        { name: 'bitbucket', category: 'plain-colored' },
        { name: 'vscode', category: 'plain-colored' },
        { name: 'visualstudio', category: 'plain-colored' },
        { name: 'intellij', category: 'plain-colored' },
        { name: 'webstorm', category: 'plain-colored' },
        { name: 'sass', category: 'plain-colored' },
        { name: 'less', category: 'plain-colored' },
        { name: 'bootstrap', category: 'plain-colored' },
        { name: 'tailwindcss', category: 'plain-colored' },
        { name: 'materialui', category: 'plain-colored' },
        { name: 'redux', category: 'plain-colored' },
        { name: 'graphql', category: 'plain-colored' },
        { name: 'webpack', category: 'plain-colored' },
        { name: 'babel', category: 'plain-colored' },
        { name: 'jest', category: 'plain-colored' },
        { name: 'mocha', category: 'plain-colored' },
        { name: 'jasmine', category: 'plain-colored' },
        { name: 'karma', category: 'plain-colored' },
        { name: 'nginx', category: 'plain-colored' },
        { name: 'apache', category: 'plain-colored' },
        { name: 'linux', category: 'plain-colored' },
        { name: 'ubuntu', category: 'plain-colored' },
        { name: 'debian', category: 'plain-colored' },
        { name: 'windows', category: 'plain-colored' },
        { name: 'apple', category: 'plain-colored' },
        { name: 'android', category: 'plain-colored' }
      ];

      // Transform to the format expected by the component
      const deviconIcons = popularIcons.map(icon => ({
        name: icon.name,
        iconClass: `devicon-${icon.name}-${icon.category}`,
        category: icon.category
      }));
      
      setIcons(deviconIcons);
      setIsLoading(false);
    };

    // Small delay to ensure devicon CSS is loaded
    const timer = setTimeout(loadIcons, 100);
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const categories = ['all', 'plain-colored', 'original', 'line', 'wordmark', 'other'];
  
  const filteredIcons = icons.filter(icon => {
    const matchesSearch = searchTerm === '' || 
      icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.iconClass.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || icon.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Show all icons by default, or filtered results if search or category is active
  const displayIcons = showAllIcons && !searchTerm && activeCategory === 'all' 
    ? icons 
    : filteredIcons;

  const formatName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (isLoading) {
    return (
      <div className="devicon-browser loading">
        <div className="loading-spinner"></div>
        <p>Loading Devicon icons...</p>
      </div>
    );
  }

  return (
    <div className="devicon-browser">
      <div className="browser-header">
        <h1>Devicon Icons Browser</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search icons by name or class..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value) setShowAllIcons(false);
            }}
            className="search-input"
          />
          <button 
            className="clear-button"
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('all');
              setShowAllIcons(true);
            }}
            disabled={showAllIcons && !searchTerm && activeCategory === 'all'}
          >
            Show All Icons
          </button>
        </div>
        <div className="categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(category);
                if (category !== 'all') setShowAllIcons(false);
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              {activeCategory === category && (
                <span className="icon-count-badge">
                  {icons.filter(i => i.category === category).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="browser-info">
        {!isLoading && (
          <div className="results-count">
            Showing {displayIcons.length} of {icons.length} icons
            {(searchTerm || activeCategory !== 'all') && (
              <button 
                className="show-all-link" 
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                  setShowAllIcons(true);
                }}
              >
                Show all icons
              </button>
            )}
          </div>
        )}
      </div>
      <div className="icons-grid">
        {displayIcons.length > 0 ? (
          displayIcons.map((icon) => (
            <div key={`${icon.name}-${icon.category}`} className="icon-item">
              <div className="icon-container">
                <i className={icon.iconClass} />
              </div>
              <div className="icon-name">{formatName(icon.name)}</div>
              <div className="icon-actions">
                <button 
                  onClick={() => copyToClipboard(icon.iconClass)}
                  className="copy-button"
                  title="Copy class name"
                >
                  {copied === icon.iconClass ? 'Copied!' : 'Copy'}
                </button>
                <span className="icon-category">{icon.category}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            No icons found matching "{searchTerm}"
          </div>
        )}
      </div>
      
      <div className="browser-footer">
        <p>
          <span className="icon-count">{filteredIcons.length}</span> icons displayed
          {searchTerm && ` (filtered from ${icons.length} total)`}
        </p>
        <div className="usage-example">
          <h3>Usage Example:</h3>
          <code>
            {`<i class="devicon-${filteredIcons[0]?.name || 'react'}-plain colored"></i>`}
          </code>
        </div>
      </div>
    </div>
  );
};

export default DeviconBrowser;
