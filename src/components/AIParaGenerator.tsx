import React, { useState } from 'react';

export const AIParaGenerator = ({ onSave }) => {
  const [topic, setTopic] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const generateParagraph = async () => {
    // In a real application, this would be an API call to an AI service
    // For demonstration, we'll use a placeholder text
    const aiGeneratedText = `This is a placeholder for AI-generated legal text about ${topic}. In a real application, this would be replaced with actual AI-generated content that is clear, concise, and in appropriate legal terms.`;
    setGeneratedText(aiGeneratedText);
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">AI-Assisted Paragraph Generator</h3>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter paragraph topic"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
      />
      <button
        onClick={generateParagraph}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
      >
        Generate Paragraph
      </button>
      {generatedText && (
        <div>
          <textarea
            value={generatedText}
            onChange={(e) => setGeneratedText(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            rows={5}
          />
          <button
            onClick={() => onSave(topic, generatedText)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Paragraph
          </button>
        </div>
      )}
    </div>
  );
};