import React from 'react';
import '../shared/styles/style.css';
import { translations } from '../translations';

const SearchLocation = ({ displayCountry, displayCity, lang = 'en' }) => {
    const t = translations[lang] || translations.en;
    return (
    <div className="location-item">
        <span className="location-value">{displayCountry}</span>
        <span className="location-value">{displayCity}</span>
      </div>
)
}

export default SearchLocation;