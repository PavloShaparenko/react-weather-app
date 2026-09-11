import React, { useState } from 'react';
import '../shared/styles/style.css';
import { translations } from '../translations';

const Header = ({ onSearch, lang = 'en', changeLang }) => { 
  const [langOpen, setLangOpen] = useState(false);
  const [friendsOpen, setFriendsOpen] = useState(false);
  

  const [inputValue, setInputValue] = useState('');


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (inputValue.trim()) {
        onSearch(inputValue); 
        setInputValue('');    
      }
    }
  };
  return (
    <header className="header glass-panel">
      <div className='logo-language-div'>
        <div className="logo">WeatherApp</div>

      
      </div>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder={translations[lang]?.search || 'Search city...'} 
          className="my-input"
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          onKeyDown={handleKeyDown} 
        />
      </div>

      <div className="nav-buttons">
        
        <div className="dropdown-container">
          <button onClick={() => setLangOpen(!langOpen)} className="nav-btn">
             Language
          </button>
          
          
          <div className={`lang-menu glass-panel ${langOpen ? 'active' : ''}`}>
              <button className="lang-item" onClick={() => { changeLang && changeLang('en'); setLangOpen(false); }}>
                <img src="https://flagcdn.com/w20/gb.png" alt="English" className="flag-img" />
                <span className="lang-name">English</span>
              </button>
                
              <button className="lang-item" onClick={() => { changeLang && changeLang('pl'); setLangOpen(false); }}>
                <img src="https://flagcdn.com/w20/pl.png" alt="Polski" className="flag-img" />
                <span className="lang-name">Polski</span>
              </button>
                
              <button className="lang-item" onClick={() => { changeLang && changeLang('ua'); setLangOpen(false); }}>
                <img src="https://flagcdn.com/w20/ua.png" alt="Українська" className="flag-img" />
                <span className="lang-name">Українська</span>
              </button>
                
              <button className="lang-item" onClick={() => { changeLang && changeLang('es'); setLangOpen(false); }}>
                <img src="https://flagcdn.com/w20/es.png" alt="Español" className="flag-img" />
                <span className="lang-name">Español</span>
              </button>
                
              <button className="lang-item" onClick={() => { changeLang && changeLang('fr'); setLangOpen(false); }}>
                <img src="https://flagcdn.com/w20/fr.png" alt="Français" className="flag-img" />
                <span className="lang-name">Français</span>
              </button>
          </div>
      </div>
      </div>

      
      


    </header>
  );
};

export default Header;
