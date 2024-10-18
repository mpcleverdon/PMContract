import React from 'react';
import { BilingualDisplay } from './BilingualDisplay';

export const ContractSummary = ({ data, onEdit }) => {
  const { company, property, services, pricing, customParagraphs } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Contract Summary</h2>
      
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Company Details</h3>
        <BilingualDisplay originalText={`Name: ${company.name}\nAddress: ${company.address}`} />
        <h4 className="text-lg font-semibold mt-2">Legal Representatives</h4>
        <ul>
          {company.representatives.map((rep, index) => (
            <li key={index}>
              <BilingualDisplay originalText={`${rep.name} - ${rep.position}`} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Property Details</h3>
        <BilingualDisplay originalText={`Property ID: ${property.PropertyID}\nAddress: ${property.address}`} />
        <h4 className="text-lg font-semibold mt-2">Property Owners</h4>
        <ul>
          {property.owners.map((owner, index) => (
            <li key={index}>
              <BilingualDisplay originalText={`Owner Code: ${owner.OwnerCode}\nRental Participation: ${owner.rentalParticipation}%\nExpense Participation: ${owner.expenseParticipation}%`} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Selected Services</h3>
        <ul>
          {services.map((service, index) => (
            <li key={index}>
              <BilingualDisplay originalText={service} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Seasonal Pricing</h3>
        <p>Currency: {pricing.currency === 'GBP' ? 'Pounds Sterling (£)' : 'Euros (€)'}</p>
        {pricing.seasons.map((season, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-lg font-semibold">{season.name}</h4>
            <BilingualDisplay originalText={`
              Start Date: ${season.startDate}
              End Date: ${season.endDate}
              Nightly Rate: ${pricing.currency === 'GBP' ? '£' : '€'}${season.nightlyRate}
              Weekly Rate: ${pricing.currency === 'GBP' ? '£' : '€'}${season.weeklyRate}
            `} />
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Custom Paragraphs</h3>
        {Object.entries(customParagraphs).map(([topic, text]) => (
          <div key={topic} className="mb-4">
            <h4 className="text-lg font-semibold">{topic}</h4>
            <BilingualDisplay originalText={text} />
          </div>
        ))}
      </section>

      <button
        onClick={onEdit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Edit Contract
      </button>
    </div>
  );
};