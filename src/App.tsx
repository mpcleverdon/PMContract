import React, { useState } from 'react';
import { ContractForm } from './components/ContractForm';
import { ContractSummary } from './components/ContractSummary';

function App() {
  const [contractData, setContractData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Property Management Contract Writer</h1>
      {!contractData ? (
        <ContractForm onSubmit={setContractData} />
      ) : (
        <ContractSummary data={contractData} onEdit={() => setContractData(null)} />
      )}
    </div>
  );
}

export default App;