import React, { useState } from 'react';
import '../shared/styles/style.css';
import { translations } from '../translations';

const Header = ({ onSearch, lang = 'en', changeLang }) => { // Добавляем пропс onSearch
  const [langOpen, setLangOpen] = useState(false);
  const [friendsOpen, setFriendsOpen] = useState(false);
  
  // 1. Создаем стейт для хранения того, что пишет пользователь
  const [inputValue, setInputValue] = useState('');

  // 2. Функция-обработчик нажатия клавиш
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (inputValue.trim()) {
        onSearch(inputValue); // Отдаем данные наверх в родителя
        setInputValue('');    // Очищаем поиск после нажатия
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
          value={inputValue} // Связываем инпут со стейтом
          onChange={(e) => setInputValue(e.target.value)} // Обновляем стейт при каждом символе
          onKeyDown={handleKeyDown} // Слушаем нажатие Enter
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