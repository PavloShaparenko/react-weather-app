import React from 'react';
import '../shared/styles/style.css';
import { translations } from '../translations';

const SearchLocation = ({ Searchcountry, Searchcity, lang = 'en' }) => {
    const t = translations[lang] || translations.en;
    return (
    <div className="location-item">
        
        <span className="location-value">{Searchcountry}</span>
        
        <span className="location-value">{Searchcity}</span>
      </div>
)
}

export default SearchLocation;