import React, { useState, useEffect } from 'react';
import { careerApi } from '../utils/careerApi';
import { portfolioApi } from '../utils/portfolioApi';

const TestData = () => {
  const [careerData, setCareerData] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [careerStats, setCareerStats] = useState(null);
  const [portfolioStats, setPortfolioStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Starting data fetch...');
      
      const [careers, portfolio, careerStatsRes, portfolioStatsRes] = await Promise.all([
        careerApi.getAll({ status: 'active', limit: 50 }),
        portfolioApi.getAll({ limit: 50 }),
        careerApi.getStats(),
        portfolioApi.getStats()
      ]);

      console.log('Raw career data:', careers);
      console.log('Raw portfolio data:', portfolio);
      console.log('Raw career stats:', careerStatsRes);
      console.log('Raw portfolio stats:', portfolioStatsRes);

      setCareerData(careers);
      setPortfolioData(portfolio);
      setCareerStats(careerStatsRes);
      setPortfolioStats(portfolioStatsRes);
      
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading test data...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Data Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Career Data */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Career Data</h2>
          <div className="space-y-2">
            <p><strong>Total Careers:</strong> {careerData?.careers?.length || 0}</p>
            <p><strong>API Response Keys:</strong> {careerData ? Object.keys(careerData).join(', ') : 'None'}</p>
            {careerData?.careers?.length > 0 && (
              <div>
                <p><strong>Sample Career:</strong></p>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(careerData.careers[0], null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Career Stats */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Career Stats</h2>
          <div className="space-y-2">
            <p><strong>Stats Keys:</strong> {careerStats ? Object.keys(careerStats).join(', ') : 'None'}</p>
            <p><strong>Total:</strong> {careerStats?.overview?.total || 0}</p>
            <p><strong>Active:</strong> {careerStats?.overview?.active || 0}</p>
            <p><strong>Departments:</strong> {careerStats?.departments?.length || 0}</p>
            {careerStats && (
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                {JSON.stringify(careerStats, null, 2)}
              </pre>
            )}
          </div>
        </div>

        {/* Portfolio Data */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Portfolio Data</h2>
          <div className="space-y-2">
            <p><strong>Total Projects:</strong> {portfolioData?.portfolios?.length || 0}</p>
            <p><strong>API Response Keys:</strong> {portfolioData ? Object.keys(portfolioData).join(', ') : 'None'}</p>
            {portfolioData?.portfolios?.length > 0 && (
              <div>
                <p><strong>Sample Project:</strong></p>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(portfolioData.portfolios[0], null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Portfolio Stats</h2>
          <div className="space-y-2">
            <p><strong>Stats Keys:</strong> {portfolioStats ? Object.keys(portfolioStats).join(', ') : 'None'}</p>
            <p><strong>Total:</strong> {portfolioStats?.totalProjects || 0}</p>
            <p><strong>Featured:</strong> {portfolioStats?.featuredProjects || 0}</p>
            <p><strong>Categories:</strong> {portfolioStats?.categoryStats?.length || 0}</p>
            {portfolioStats && (
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                {JSON.stringify(portfolioStats, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button 
          onClick={loadData}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Reload Data
        </button>
      </div>
    </div>
  );
};

export default TestData;