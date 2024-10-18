import React, { useState } from 'react';

export const CompanyDetails = ({ onNext, updateFormData }) => {
  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    address: '',
    representatives: [{ name: '', position: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const handleRepresentativeChange = (index, e) => {
    const { name, value } = e.target;
    const newRepresentatives = [...companyDetails.representatives];
    newRepresentatives[index] = { ...newRepresentatives[index], [name]: value };
    setCompanyDetails({ ...companyDetails, representatives: newRepresentatives });
  };

  const addRepresentative = () => {
    setCompanyDetails({
      ...companyDetails,
      representatives: [...companyDetails.representatives, { name: '', position: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData(companyDetails);
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Company Details</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Company Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          value={companyDetails.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          Company Address
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          name="address"
          value={companyDetails.address}
          onChange={handleChange}
          required
        />
      </div>
      <h3 className="text-xl font-bold mb-2">Legal Representatives</h3>
      {companyDetails.representatives.map((rep, index) => (
        <div key={index} className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            type="text"
            name="name"
            value={rep.name}
            onChange={(e) => handleRepresentativeChange(index, e)}
            placeholder="Representative Name"
            required
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="position"
            value={rep.position}
            onChange={(e) => handleRepresentativeChange(index, e)}
            placeholder="Position"
            required
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addRepresentative}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
      >
        Add Representative
      </button>
      <div className="flex items-center justify-between">
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