import React, { useState } from 'react';

const availableServices = [
  { id: 'maintenance', name: 'Maintenance' },
  { id: 'cleaning', name: 'Cleaning' },
  { id: 'gardening', name: 'Gardening' },
  { id: 'poolCleaning', name: 'Pool Cleaning' },
];

export const ServiceSelection = ({ onNext, onPrev, updateFormData }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prevServices =>
      prevServices.includes(serviceId)
        ? prevServices.filter(id => id !== serviceId)
        : [...prevServices, serviceId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData(selectedServices);
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Services</h2>
      <div className="mb-4">
        {availableServices.map(service => (
          <div key={service.id} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={selectedServices.includes(service.id)}
                onChange={() => handleServiceToggle(service.id)}
              />
              <span className="ml-2 text-gray-700">{service.name}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
};