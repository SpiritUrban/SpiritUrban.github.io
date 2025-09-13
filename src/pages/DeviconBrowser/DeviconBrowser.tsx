import React, { useState, useCallback, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import './DeviconBrowser.css';

// Import Devicon CSS directly from CDN in index.html

interface Devicon {
  name: string;
  iconClass: string;
  category: string;
  key: string;
}

const DeviconBrowser: React.FC = () => {
  // State hooks must be called at the top level
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllIcons, setShowAllIcons] = useState(true);
  const [icons, setIcons] = useState<Devicon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [testIconClass, setTestIconClass] = useState('devicon-rust-plain colored');
  const [testResult, setTestResult] = useState<{success: boolean, message: string} | null>(null);
  const [useReactIcons, setUseReactIcons] = useState(false);

  // List of available Devicon icons with their correct classes
  useEffect(() => {
    // Comprehensive list of Devicon icons with their correct classes
    const iconList = [
      // Programming Languages
      'devicon-javascript-plain colored',
      'devicon-typescript-plain colored',
      'devicon-html5-plain colored',
      'devicon-css3-plain colored',
      'devicon-sass-original colored',
      'devicon-java-plain colored',
      'devicon-python-plain colored',
      'devicon-php-plain colored',
      'devicon-ruby-plain colored',
      'devicon-c-plain colored',
      'devicon-cplusplus-plain colored',
      'devicon-csharp-plain colored',
      'devicon-go-plain colored',
      'devicon-rust-plain colored',
      'devicon-swift-plain colored',
      'devicon-kotlin-plain colored',
      'devicon-dart-plain colored',
      'devicon-scala-plain colored',
      'devicon-perl-plain colored',
      'devicon-haskell-plain colored',
      'devicon-elixir-plain colored',
      'devicon-clojure-plain colored',
      'devicon-erlang-plain colored',
      'devicon-r-plain colored',
      
      // Frontend Frameworks
      'devicon-react-original colored',
      'devicon-vuejs-plain colored',
      'devicon-angularjs-plain colored',
      'devicon-svelte-plain colored',
      'devicon-bootstrap-plain colored',
      'devicon-tailwindcss-plain colored',
      'devicon-materialui-plain colored',
      'devicon-jquery-plain colored',
      'devicon-redux-original colored',
      'devicon-graphql-plain colored',
      'devicon-nextjs-plain colored',
      'devicon-nuxtjs-plain colored',
      'devicon-gatsby-plain colored',
      'devicon-grunt-plain colored',
      'devicon-gulp-plain colored',
      'devicon-webpack-plain colored',
      'devicon-babel-plain colored',
      'devicon-jest-plain colored',
      'devicon-mocha-plain colored',
      'devicon-jasmine-plain colored',
      
      // Backend
      'devicon-nodejs-plain colored',
      'devicon-express-original colored',
      'devicon-django-plain colored',
      'devicon-flask-original colored',
      'devicon-rails-plain colored',
      'devicon-laravel-plain colored',
      'devicon-symfony-original colored',
      'devicon-codeigniter-plain colored',
      'devicon-dot-net-plain colored',
      'devicon-dotnetcore-plain colored',
      'devicon-nestjs-plain colored',
      'devicon-spring-plain colored',
      'devicon-fastapi-plain colored',
      'devicon-apache-plain colored',
      
      // Databases
      'devicon-mongodb-plain colored',
      'devicon-mysql-plain colored',
      'devicon-postgresql-plain colored',
      'devicon-redis-plain colored',
      'devicon-sqlite-plain colored',
      'devicon-firebase-plain colored',
      'devicon-oracle-original colored',
      'devicon-microsoftsqlserver-plain colored',
      'devicon-couchdb-plain colored',
      'devicon-mariadb-plain colored',
      'devicon-cassandra-plain colored',
      'devicon-couchbase-plain colored',
      'devicon-neo4j-plain colored',
      
      // DevOps & Cloud
      'devicon-docker-plain colored',
      'devicon-kubernetes-plain colored',
      'devicon-git-plain colored',
      'devicon-github-original colored',
      'devicon-gitlab-plain colored',
      'devicon-bitbucket-original colored',
      'devicon-amazonwebservices-original colored',
      'devicon-googlecloud-plain colored',
      'devicon-azure-plain colored',
      'devicon-heroku-original colored',
      'devicon-digitalocean-plain colored',
      'devicon-vagrant-plain colored',
      'devicon-ansible-plain colored',
      'devicon-terraform-plain colored',
      'devicon-jenkins-line colored',
      'devicon-travis-plain colored',
      'devicon-circleci-plain colored',
      
      // Operating Systems
      'devicon-linux-plain colored',
      'devicon-ubuntu-plain colored',
      'devicon-debian-plain colored',
      'devicon-fedora-plain colored',
      'devicon-centos-plain colored',
      'devicon-redhat-plain colored',
      'devicon-windows8-original colored',
      'devicon-apple-original colored',
      'devicon-android-plain colored',
      
      // Other
      'devicon-raspberrypi-line colored',
      'devicon-arduino-plain colored',
      'devicon-tensorflow-original colored',
      'devicon-pytorch-original colored',
      'devicon-numpy-original colored',
      'devicon-pandas-original colored',
      'devicon-d3js-plain colored',
      'devicon-threejs-original colored',
      'devicon-webgl-plain colored',
      'devicon-unity-original colored',
      'devicon-unrealengine-original colored',
      'devicon-blender-original colored',
      'devicon-figma-plain colored',
      'devicon-xd-plain colored',
      'devicon-photoshop-plain colored',
      'devicon-illustrator-plain colored',
      'devicon-inkscape-plain colored',
      'devicon-gimp-plain colored',
      'devicon-slack-plain colored',
      'devicon-discord-plain colored',
      'devicon-trello-plain colored',
      'devicon-jira-plain colored',
      'devicon-confluence-original colored',
      'devicon-vscode-plain colored',
      'devicon-intellij-plain colored',
      'devicon-webstorm-plain colored',
      'devicon-pycharm-plain colored',
      'devicon-atom-original colored',
      'devicon-sublime-text-original colored',
      'devicon-vim-plain colored',
      'devicon-ssh-original colored'
    ];
    
    // Track unique icons and duplicates
    const uniqueIcons = new Map<string, string>();
    const duplicates: string[] = [];
    
    const deviconIcons = iconList
      .filter(iconClass => {
        const key = iconClass.replace(/ /g, '-');
        if (uniqueIcons.has(key)) {
          duplicates.push(`Duplicate: ${key} (${uniqueIcons.get(key)} and ${iconClass})`);
          return false;
        }
        uniqueIcons.set(key, iconClass);
        return true;
      })
      .map(iconClass => ({
        name: iconClass.split(' ')[0].replace('devicon-', '').replace(/-/g, ' '),
        iconClass,
        category: 'plain-colored',
        key: iconClass.replace(/ /g, '-')
      }));
    
    // Log any duplicates found
    if (duplicates.length > 0) {
      console.group('Duplicate Icons Removed');
      duplicates.forEach(dup => console.warn(dup));
      console.groupEnd();
    }
    
    setIcons(deviconIcons);
    setIsLoading(false);
  }, []);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const categories = ['all', 'plain-colored', 'original', 'line', 'wordmark', 'other'];
  
  const filteredIcons = icons.filter(icon => 
    searchTerm === '' || 
    icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.iconClass.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show all icons by default, or filtered results if search or category is active
  const displayIcons = showAllIcons && !searchTerm && activeCategory === 'all' 
    ? icons 
    : filteredIcons;

  // Test if Devicon CSS is loaded when component mounts
  useEffect(() => {
    const testIcon = document.createElement('i');
    testIcon.className = 'devicon-react-original colored';
    testIcon.style.position = 'absolute';
    testIcon.style.left = '-9999px';
    document.body.appendChild(testIcon);
    
    const isLoaded = window.getComputedStyle(testIcon, '::before').content !== 'normal';
    console.log('Devicon CSS loaded:', isLoaded);
    
    // Clean up
    setTimeout(() => document.body.removeChild(testIcon), 100);
  }, []);

  // Test panel functions
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

  const testIcon = () => {
    // Create a test element to check if the icon renders
    const testElement = document.createElement('i');
    testElement.className = testIconClass;
    testElement.style.visibility = 'hidden';
    testElement.style.position = 'absolute';
    document.body.appendChild(testElement);
    
    // Check if the icon has content
    const hasContent = window.getComputedStyle(testElement, '::before').content !== 'none';
    const hasFontFamily = window.getComputedStyle(testElement, '::before').fontFamily.includes('devicon');
    
    // Clean up
    document.body.removeChild(testElement);
    
    const isIconValid = hasContent && hasFontFamily;
    
    setTestResult({
      success: isIconValid,
      message: isIconValid 
        ? '✅ Icon is valid and should display correctly!'
        : '❌ Icon not found or not displaying correctly. Try a different class or check Devicon CSS.'
    });
  };

  // Toggle between icon sets
  const toggleIconSet = () => {
    setUseReactIcons(!useReactIcons);
  };

  return (
    <div className="devicon-browser">
      <div className="icon-set-toggle">
        <button 
          onClick={toggleIconSet}
          className={`toggle-button ${!useReactIcons ? 'active' : ''}`}
        >
          Devicon Icons
        </button>
        <button 
          onClick={toggleIconSet}
          className={`toggle-button ${useReactIcons ? 'active' : ''}`}
        >
          React Icons
        </button>
      </div>
      
      {/* Test Panel */}
      <div className="test-panel">
        <h3>Test Icon Classes</h3>
        <div className="test-controls">
          <input
            type="text"
            value={testIconClass}
            onChange={(e) => setTestIconClass(e.target.value)}
            placeholder="devicon-rust-plain colored"
            className="test-input"
          />
          <button onClick={testIcon} className="test-button">
            Test Icon
          </button>
        </div>
        {testResult && (
          <div className={`test-result ${testResult.success ? 'success' : 'error'}`}>
            {testResult.message}
            <div className="test-icon-preview">
              <i className={`${testIconClass} test-icon-display`}></i>
              <div className="test-icon-classes">
                {testIconClass.split(' ').map((cls, i) => (
                  <span key={i} className="test-icon-class">{cls}</span>
                ))}
              </div>
              {testResult.success && (
                <div className="test-icon-html">
                  HTML: <code>{`<i class="${testIconClass}"></i>`}</code>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="test-suggestions">
          <p>Try these Rust variants:</p>
          <div className="suggestion-buttons">
            {[
              'devicon-rust-plain',
              'devicon-rust-plain colored',
              'devicon-rust-original',
              'devicon-rust-original colored',
              'devicon-rust-line',
              'devicon-rust-line colored',
              'devicon-rust-plain-wordmark',
              'devicon-rust-original-wordmark'
            ].map(variant => (
              <button 
                key={variant}
                className="suggestion-button"
                onClick={() => {
                  setTestIconClass(variant);
                  setTimeout(testIcon, 100);
                }}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>
      </div>

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
        {useReactIcons ? (
          // Render React Icons
          Object.entries({
            // Core Web
            'React': <FaIcons.FaReact />,
            'Node.js': <FaIcons.FaNode />,
            'JavaScript': <FaIcons.FaJs />,
            'TypeScript': <SiIcons.SiTypescript />,
            'HTML5': <FaIcons.FaHtml5 />,
            'CSS3': <FaIcons.FaCss3Alt />,
            'Sass': <FaIcons.FaSass />,
            'Git': <FaIcons.FaGitAlt />,
            'GitHub': <FaIcons.FaGithub />,
            'NPM': <FaIcons.FaNpm />,
            'Yarn': <FaIcons.FaYarn />,
            // Add more as needed
          }).map(([name, Icon]) => (
            <div key={name} className="icon-item">
              <div className="icon-container">
                {React.cloneElement(Icon, { size: '2.5em' })}
              </div>
              <div className="icon-name">{name}</div>
              <div className="icon-actions">
                <button 
                  onClick={() => copyToClipboard(name)}
                  className="copy-button"
                  title="Copy name"
                >
                  {copied === name ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ))
        ) : displayIcons.length > 0 ? (
          // Render Devicon Icons
          (() => {
            console.log('Rendering', displayIcons.length, 'icons');
            const seenKeys = new Set();
            return displayIcons.map((icon) => {
              if (seenKeys.has(icon.key)) {
                console.error(`❌ Duplicate key in render: ${icon.key} (${icon.iconClass})`);
              } else {
                seenKeys.add(icon.key);
              }
              return (
                <div key={icon.key} className="icon-item">
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
              );
            });
          })()
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
