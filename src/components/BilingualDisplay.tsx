import React, { useState } from 'react';

export const BilingualDisplay = ({ originalText }) => {
  const [translatedText, setTranslatedText] = useState('');

  const translateText = async () => {
    // In a real application, this would be an API call to a translation service
    // For demonstration, we'll use a placeholder translation
    const translation = `This is a placeholder for the translated version of: "${originalText}". In a real application, this would be replaced with an actual translation.`;
    setTranslatedText(translation);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h4 className="font-semibold mb-2">Original Text</h4>
        <p>{originalText}</p>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Translated Text</h4>
        {translatedText ? (
          <p>{translatedText}</p>
        ) : (
          <button
            onClick={translateText}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Translate
          </button>
        )}
      </div>
    </div>
  );
};