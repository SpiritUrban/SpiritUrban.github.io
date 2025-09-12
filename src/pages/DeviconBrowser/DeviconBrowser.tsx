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
  const [icons, setIcons] = useState<Devicon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load all devicon classes from the stylesheet
  useEffect(() => {
    const loadIcons = () => {
      const deviconIcons: Devicon[] = [];
      const processedIcons = new Set<string>();

      // Get all style rules from the document
      for (let i = 0; i < document.styleSheets.length; i++) {
        try {
          const styleSheet = document.styleSheets[i] as CSSStyleSheet;
          if (!styleSheet.href || !styleSheet.href.includes('devicon')) continue;
          
          const rules = styleSheet.cssRules || styleSheet.rules;
          
          for (let j = 0; j < rules.length; j++) {
            const rule = rules[j] as CSSStyleRule;
            const selector = rule.selectorText;
            
            if (selector && selector.startsWith('.devicon-') && !selector.startsWith('.devicon-:') && !selector.includes('::before')) {
              // Extract icon name and variant
              const match = selector.match(/\.devicon-(.+?)(?:-|$)/);
              if (!match) continue;
              
              const baseName = match[1];
              const iconKey = `${baseName}-${selector}`;
              
              // Skip if we've already processed this icon
              if (processedIcons.has(iconKey)) continue;
              processedIcons.add(iconKey);
              
              // Determine category based on class name
              let category = 'other';
              if (selector.includes('-plain-')) {
                category = 'plain-colored';
              } else if (selector.includes('-original-')) {
                category = 'original';
              } else if (selector.includes('-line-')) {
                category = 'line';
              } else if (selector.includes('-wordmark')) {
                category = 'wordmark';
              }
              
              // Add the icon if we haven't seen this base name in this category
              const iconExists = deviconIcons.some(
                icon => icon.name === baseName && icon.category === category
              );
              
              if (!iconExists) {
                deviconIcons.push({
                  name: baseName,
                  iconClass: `devicon-${baseName}-plain`,
                  category
                });
              }
            }
          }
        } catch (e) {
          console.warn('Could not read styles from stylesheet', e);
        }
      }
      
      setIcons(deviconIcons);
      setIsLoading(false);
    };

    // Small delay to ensure devicon CSS is loaded
    const timer = setTimeout(loadIcons, 500);
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const categories = ['all', 'plain-colored', 'original', 'line', 'wordmark', 'other'];
  
  const filteredIcons = icons.filter(icon => {
    const matchesSearch = icon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || icon.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
      
      <div className="icons-grid">
        {filteredIcons.length > 0 ? (
          filteredIcons.map((icon) => (
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
