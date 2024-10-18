import React, { useState } from 'react';
import { CompanyDetails } from './CompanyDetails';
import { PropertyDetails } from './PropertyDetails';
import { ServiceSelection } from './ServiceSelection';
import { SeasonalPricing } from './SeasonalPricing';
import { AIParaGenerator } from './AIParaGenerator';

export const ContractForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    company: {},
    property: {},
    services: [],
    pricing: {},
    customParagraphs: {}
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateFormData = (section, data) => {
    setFormData({ ...formData, [section]: data });
  };

  const saveParagraph = (topic, text) => {
    setFormData({
      ...formData,
      customParagraphs: { ...formData.customParagraphs, [topic]: text }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {step === 1 && <CompanyDetails onNext={nextStep} updateFormData={(data) => updateFormData('company', data)} />}
      {step === 2 && <PropertyDetails onNext={nextStep} onPrev={prevStep} updateFormData={(data) => updateFormData('property', data)} />}
      {step === 3 && <ServiceSelection onNext={nextStep} onPrev={prevStep} updateFormData={(data) => updateFormData('services', data)} />}
      {step === 4 && <SeasonalPricing onNext={nextStep} onPrev={prevStep} updateFormData={(data) => updateFormData('pricing', data)} />}
      {step === 5 && (
        <>
          <AIParaGenerator onSave={saveParagraph} />
          <div className="flex items-center justify-between mt-6">
            <button type="button" onClick={prevStep} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Previous
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Generate Contract
            </button>
          </div>
        </>
      )}
    </form>
  );
};