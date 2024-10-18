import React, { useState, useEffect } from 'react';

// Mock functions to simulate database queries (replace with actual API calls)
const fetchProperties = async () => {
  return [
    { PropertyID: '1', PropertyHeadline: 'Seaside Villa', NombreVia: 'Beach Road', NumeroVivienda: '42' },
    { PropertyID: '2', PropertyHeadline: 'Mountain Chalet', NombreVia: 'Alpine Way', NumeroVivienda: '15' },
  ];
};

const fetchOwners = async () => {
  return [
    { OwnerCode: 'OWN001', firstname: 'John', sirname: 'Doe', housename: 'Sunnydale', street: 'Main St', town: 'Springfield', county: 'State', postcode: '12345', country: 'USA', nif: '123456789', passport: 'AB1234567' },
    { OwnerCode: 'OWN002', firstname: 'Jane', sirname: 'Smith', housename: 'Meadow View', street: 'Oak Ave', town: 'Rivertown', county: 'County', postcode: '67890', country: 'UK', nif: '987654321', passport: 'CD7654321' },
  ];
};

const fetchOwnerProperties = async (propertyId) => {
  // This would typically be filtered by propertyId in a real application
  return [
    { owcode: 'OWN001', PropertyID: '1', PropertyHeadline: 'Seaside Villa', rentals: 60, expenses: 60 },
    { owcode: 'OWN002', PropertyID: '1', PropertyHeadline: 'Seaside Villa', rentals: 40, expenses: 40 },
  ];
};

export const PropertyDetails = ({ onNext, onPrev, updateFormData }) => {
  const [properties, setProperties] = useState([]);
  const [owners, setOwners] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedOwners, setSelectedOwners] = useState([]);
  const [ownerProperties, setOwnerProperties] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const fetchedProperties = await fetchProperties();
      const fetchedOwners = await fetchOwners();
      setProperties(fetchedProperties);
      setOwners(fetchedOwners);
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadOwnerProperties = async () => {
      if (selectedProperty) {
        const fetchedOwnerProperties = await fetchOwnerProperties(selectedProperty);
        setOwnerProperties(fetchedOwnerProperties);
        
        // Set initial selected owners based on the fetched data
        const initialSelectedOwners = fetchedOwnerProperties.map(op => ({
          OwnerCode: op.owcode,
          rentalParticipation: op.rentals,
          expenseParticipation: op.expenses
        }));
        setSelectedOwners(initialSelectedOwners);
      }
    };
    loadOwnerProperties();
  }, [selectedProperty]);

  const handlePropertyChange = (e) => {
    setSelectedProperty(e.target.value);
  };

  const handleOwnerToggle = (ownerCode) => {
    setSelectedOwners(prevOwners => {
      const isSelected = prevOwners.some(owner => owner.OwnerCode === ownerCode);
      if (isSelected) {
        return prevOwners.filter(owner => owner.OwnerCode !== ownerCode);
      } else {
        const newOwner = {
          OwnerCode: ownerCode,
          rentalParticipation: 100 / (prevOwners.length + 1),
          expenseParticipation: 100 / (prevOwners.length + 1)
        };
        const updatedOwners = prevOwners.map(owner => ({
          ...owner,
          rentalParticipation: 100 / (prevOwners.length + 1),
          expenseParticipation: 100 / (prevOwners.length + 1)
        }));
        return [...updatedOwners, newOwner];
      }
    });
  };

  const handleOwnerParticipationChange = (ownerCode, field, value) => {
    setSelectedOwners(prevOwners =>
      prevOwners.map(owner =>
        owner.OwnerCode === ownerCode ? { ...owner, [field]: parseFloat(value) } : owner
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedPropertyData = properties.find(p => p.PropertyID === selectedProperty);
    const propertyDetails = {
      PropertyID: selectedPropertyData.PropertyID,
      address: `${selectedPropertyData.NombreVia} ${selectedPropertyData.NumeroVivienda}`,
      owners: selectedOwners
    };
    updateFormData(propertyDetails);
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Property Details</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="property">
          Select Property
        </label>
        <select
          id="property"
          value={selectedProperty}
          onChange={handlePropertyChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a property</option>
          {properties.map(property => (
            <option key={property.PropertyID} value={property.PropertyID}>
              {property.PropertyHeadline} - {property.NombreVia} {property.NumeroVivienda}
            </option>
          ))}
        </select>
      </div>

      {selectedProperty && (
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Property Owners</h3>
          {owners.map(owner => (
            <div key={owner.OwnerCode} className="mb-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={selectedOwners.some(o => o.OwnerCode === owner.OwnerCode)}
                  onChange={() => handleOwnerToggle(owner.OwnerCode)}
                />
                <span className="ml-2 text-gray-700">{owner.firstname} {owner.sirname} ({owner.OwnerCode})</span>
              </label>
              {selectedOwners.some(o => o.OwnerCode === owner.OwnerCode) && (
                <div className="ml-6 mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Rental Participation (%)
                    </label>
                    <input
                      type="number"
                      value={selectedOwners.find(o => o.OwnerCode === owner.OwnerCode).rentalParticipation}
                      onChange={(e) => handleOwnerParticipationChange(owner.OwnerCode, 'rentalParticipation', e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Expense Participation (%)
                    </label>
                    <input
                      type="number"
                      value={selectedOwners.find(o => o.OwnerCode === owner.OwnerCode).expenseParticipation}
                      onChange={(e) => handleOwnerParticipationChange(owner.OwnerCode, 'expenseParticipation', e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-6">
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
          disabled={!selectedProperty || selectedOwners.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};