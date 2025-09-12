import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io5';
import * as BiIcons from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';

interface IconSet {
  name: string;
  icons: Record<string, any>;
  prefix: string;
}

const IconsBrowser: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const iconSets: IconSet[] = [
    { name: 'Font Awesome', icons: FaIcons, prefix: 'Fa' },
    { name: 'Simple Icons', icons: SiIcons, prefix: 'Si' },
    { name: 'Material Design', icons: MdIcons, prefix: 'Md' },
    { name: 'Ionicons', icons: IoIcons, prefix: 'Io' },
    { name: 'BoxIcons', icons: BiIcons, prefix: 'Bi' },
    { name: 'Heroicons', icons: HiIcons, prefix: 'Hi' },
    { name: 'Feather', icons: FiIcons, prefix: 'Fi' },
    { name: 'Ant Design', icons: AiIcons, prefix: 'Ai' },
    { name: 'Bootstrap Icons', icons: BsIcons, prefix: 'Bs' },
    { name: 'Remix Icons', icons: RiIcons, prefix: 'Ri' },
  ];

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const filteredSets = activeTab === 'all' 
    ? iconSets 
    : iconSets.filter(set => set.prefix.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="icons-browser">
      <div className="browser-header">
        <h1>React Icons Browser</h1>
        <Link to="/" className="back-link">← Back to Home</Link>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Icons
          </button>
          {iconSets.map((set) => (
            <button
              key={set.prefix}
              className={`tab ${activeTab === set.prefix.toLowerCase() ? 'active' : ''}`}
              onClick={() => setActiveTab(set.prefix.toLowerCase())}
            >
              {set.name}
            </button>
          ))}
        </div>
      </div>

      <div className="icon-grid">
        {filteredSets.map((set) => (
          <div key={set.name} className="icon-set">
            <h2>{set.name} ({set.prefix})</h2>
            <div className="icons-container">
              {Object.entries(set.icons)
                .filter(([name]) => 
                  name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(([name, IconComponent]) => {
                  const importLine = `import { ${name} } from 'react-icons/${set.prefix.toLowerCase()}'`;
                  return (
                    <div 
                      key={name}
                      className={`icon-card ${copied === importLine ? 'copied' : ''}`}
                      onClick={() => copyToClipboard(importLine)}
                      title={`Click to copy: ${importLine}`}
                    >
                      <div className="icon-wrapper">
                        <IconComponent size={24} />
                      </div>
                      <div className="icon-name">{name}</div>
                      {copied === importLine && (
                        <div className="copy-notice">Copied!</div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconsBrowser;
