import React, { useState, useEffect } from "react";
import { careerApi } from "../utils/careerApi";

const SimpleCareerTest = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError("");

    try {
      console.log("Starting API calls...");
      
      const [careersResponse, statsResponse] = await Promise.all([
        careerApi.getAll({ status: "active", limit: 50 }),
        careerApi.getStats(),
      ]);

      console.log("API responses received:", { careersResponse, statsResponse });

      const careers = careersResponse.careers || [];
      
      // Simple transformation
      const transformedCareers = careers.map((career) => ({
        id: career._id,
        title: career.title,
        department: career.department,
        location: career.location,
        jobType: career.jobType,
      }));

      setJobOpenings(transformedCareers);

      // Simple departments
      if (statsResponse.departments) {
        const transformedDepartments = statsResponse.departments.map((dept) => ({
          name: dept._id.charAt(0).toUpperCase() + dept._id.slice(1),
          count: dept.activeCount || dept.count,
        }));
        setDepartments(transformedDepartments);
      }

      setStats(statsResponse);
      
      console.log("Data set successfully:", {
        jobsCount: transformedCareers.length,
        departmentsCount: transformedDepartments?.length || 0
      });

    } catch (error) {
      console.error("Error loading careers:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Render state:", { 
    jobOpenings: jobOpenings.length, 
    departments: departments.length, 
    isLoading, 
    error 
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Simple Career Test</h1>
        <p>Loading careers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Simple Career Test</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
        <button 
          onClick={loadData}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Career Test</h1>
      
      {/* Stats */}
      <div className="bg-blue-100 p-4 rounded mb-6">
        <h2 className="font-semibold mb-2">Stats:</h2>
        <p>Total Jobs: {stats?.overview?.total || 0}</p>
        <p>Active Jobs: {stats?.overview?.active || 0}</p>
        <p>Departments: {departments.length}</p>
      </div>

      {/* Departments */}
      <div className="bg-green-100 p-4 rounded mb-6">
        <h2 className="font-semibold mb-2">Departments ({departments.length}):</h2>
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <span 
              key={dept.name}
              className="bg-white px-3 py-1 rounded border"
            >
              {dept.name} ({dept.count})
            </span>
          ))}
        </div>
      </div>

      {/* Jobs */}
      <div className="bg-yellow-100 p-4 rounded">
        <h2 className="font-semibold mb-2">Jobs ({jobOpenings.length}):</h2>
        <div className="space-y-2">
          {jobOpenings.map((job) => (
            <div key={job.id} className="bg-white p-3 rounded border">
              <h3 className="font-medium">{job.title}</h3>
              <p className="text-sm text-gray-600">
                {job.department} • {job.location} • {job.jobType}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={loadData}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Reload Data
      </button>
    </div>
  );
};

export default SimpleCareerTest;