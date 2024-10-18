import React, { useState, useEffect } from 'react';

// Mock function to fetch predefined seasons (replace with actual API call)
const fetchPredefinedSeasons = async () => {
  // Simulated API response
  return [
    { id: 1, ChartName: 'Default 2023', Level: 1, DateStart: '2023-01-01', DateEnd: '2023-03-31', Description: 'Low Season' },
    { id: 2, ChartName: 'Default 2023', Level: 2, DateStart: '2023-04-01', DateEnd: '2023-06-30', Description: 'Mid Season' },
    { id: 3, ChartName: 'Default 2023', Level: 3, DateStart: '2023-07-01', DateEnd: '2023-08-31', Description: 'High Season' },
    { id: 4, ChartName: 'Default 2023', Level: 2, DateStart: '2023-09-01', DateEnd: '2023-12-31', Description: 'Mid Season' },
  ];
};

export const SeasonalPricing = ({ onNext, onPrev, updateFormData }) => {
  const [seasons, setSeasons] = useState([]);
  const [currency, setCurrency] = useState('GBP');
  const [predefinedSeasons, setPredefinedSeasons] = useState([]);
  const [selectedChart, setSelectedChart] = useState('');

  useEffect(() => {
    const loadPredefinedSeasons = async () => {
      const fetchedSeasons = await fetchPredefinedSeasons();
      setPredefinedSeasons(fetchedSeasons);
      const chartNames = [...new Set(fetchedSeasons.map(season => season.ChartName))];
      if (chartNames.length > 0) {
        setSelectedChart(chartNames[0]);
      }
    };
    loadPredefinedSeasons();
  }, []);

  const handleChartSelection = (chartName) => {
    setSelectedChart(chartName);
    const selectedSeasons = predefinedSeasons
      .filter(season => season.ChartName === chartName)
      .map(season => ({
        id: season.id,
        name: season.Description,
        startDate: season.DateStart,
        endDate: season.DateEnd,
        nightlyRate: '',
        weeklyRate: ''
      }));
    setSeasons(selectedSeasons);
  };

  const handleSeasonChange = (id, field, value) => {
    setSeasons(prevSeasons =>
      prevSeasons.map(season =>
        season.id === id ? { ...season, [field]: value } : season
      )
    );
  };

  const addCustomSeason = () => {
    const newId = Math.max(...seasons.map(s => s.id), 0) + 1;
    setSeasons([...seasons, { id: newId, name: 'Custom Season', startDate: '', endDate: '', nightlyRate: '', weeklyRate: '' }]);
  };

  const removeSeason = (id) => {
    setSeasons(seasons.filter(season => season.id !== id));
  };

  const calculateWeeklyRate = (nightlyRate) => {
    return (parseFloat(nightlyRate) * 7).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData({ seasons, currency, chartName: selectedChart });
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Seasonal Pricing</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currency">
          Currency
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="GBP">Pounds Sterling (£)</option>
          <option value="EUR">Euros (€)</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chartSelection">
          Select Predefined Season Chart
        </label>
        <select
          id="chartSelection"
          value={selectedChart}
          onChange={(e) => handleChartSelection(e.target.value)}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {[...new Set(predefinedSeasons.map(season => season.ChartName))].map(chartName => (
            <option key={chartName} value={chartName}>{chartName}</option>
          ))}
        </select>
      </div>

      {seasons.map((season) => (
        <div key={season.id} className="mb-6 p-4 border rounded">
          <div className="flex justify-between items-center mb-2">
            <input
              type="text"
              value={season.name}
              onChange={(e) => handleSeasonChange(season.id, 'name', e.target.value)}
              placeholder="Season Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              onClick={() => removeSeason(season.id)}
              className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={season.startDate}
              onChange={(e) => handleSeasonChange(season.id, 'startDate', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="date"
              value={season.endDate}
              onChange={(e) => handleSeasonChange(season.id, 'endDate', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nightly Rate ({currency === 'GBP' ? '£' : '€'})
              </label>
              <input
                type="number"
                value={season.nightlyRate}
                onChange={(e) => {
                  const nightlyRate = e.target.value;
                  handleSeasonChange(season.id, 'nightlyRate', nightlyRate);
                  handleSeasonChange(season.id, 'weeklyRate', calculateWeeklyRate(nightlyRate));
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Weekly Rate ({currency === 'GBP' ? '£' : '€'})
              </label>
              <input
                type="number"
                value={season.weeklyRate}
                readOnly
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addCustomSeason}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
      >
        Add Custom Season
      </button>

      <div className="flex items-center justify-between mt-6">
        <button
          type="button"
          onClick={onPrev}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Previous
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
};