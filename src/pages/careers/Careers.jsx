import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import { careerApi } from "../../utils/careerApi";

const benefits = [
  {
    icon: "Heart",
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs",
  },
  {
    icon: "GraduationCap",
    title: "Learning & Development",
    description: "Continuous learning opportunities and skill development",
  },
  {
    icon: "Home",
    title: "Remote Work",
    description: "Hybrid and remote work options available",
  },
  {
    icon: "Users",
    title: "Team Culture",
    description: "Collaborative and inclusive work environment",
  },
  {
    icon: "TrendingUp",
    title: "Career Growth",
    description: "Clear career progression paths and mentorship",
  },
];

const CareersFixed = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [jobOpenings, setJobOpenings] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalDepartments: 0,
    teamMembers: 50,
    satisfaction: 95
  });

  useEffect(() => {
    loadCareersData();
  }, []);

  const loadCareersData = async () => {
    setIsLoading(true);
    setError("");

    try {
      const [careersResponse, statsResponse] = await Promise.all([
        careerApi.getAll({ status: "active", limit: 50 }),
        careerApi.getStats(),
      ]);

      const careers = careersResponse.careers || [];

      // Transform careers data
      const transformedCareers = careers.map((career) => ({
        id: career._id,
        title: career.title,
        department: career.department.charAt(0).toUpperCase() + career.department.slice(1),
        location: career.location,
        type: career.jobType === 'remote' ? 'Remote' : career.jobType === 'hybrid' ? 'Hybrid' : 'In-office',
        experience: career.experience || 'Not specified',
        skills: career.skills || [],
        description: career.description,
        requirements: career.requirements || [],
        salary: career.salary || 'Competitive',
        posted: formatDate(career.createdAt || career.postedDate),
        status: career.status,
      }));

      setJobOpenings(transformedCareers);

      // Create departments from stats
      if (statsResponse.departments) {
        const departmentColors = {
          engineering: "bg-blue-500",
          design: "bg-purple-500",
          marketing: "bg-green-500",
          sales: "bg-orange-500",
          operations: "bg-pink-500",
          other: "bg-gray-500",
        };

        const transformedDepartments = statsResponse.departments.map((dept) => ({
          name: dept._id.charAt(0).toUpperCase() + dept._id.slice(1),
          count: dept.activeCount || dept.count,
          color: departmentColors[dept._id] || "bg-gray-500",
        }));

        setDepartments(transformedDepartments);
      }

      // Update stats
      setStats({
        totalJobs: statsResponse.overview?.total || 0,
        totalDepartments: statsResponse.departments?.length || 0,
        teamMembers: 50,
        satisfaction: 95
      });

    } catch (error) {
      console.error("Error loading careers:", error);
      setError("Failed to load career opportunities. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const filteredJobs = selectedDepartment === "All" 
    ? jobOpenings 
    : jobOpenings.filter((job) => job.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
            Join Our <span className="brand-gradient-text">Amazing Team</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Build the future of digital innovation with us. We're looking for
            passionate individuals who want to make a difference and grow
            their careers in a dynamic environment.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold brand-gradient-text mb-2">
                {stats.teamMembers}+
              </div>
              <div className="text-slate-600">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold brand-gradient-text mb-2">
                {stats.totalDepartments}
              </div>
              <div className="text-slate-600">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold brand-gradient-text mb-2">
                {stats.totalJobs}
              </div>
              <div className="text-slate-600">Open Positions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold brand-gradient-text mb-2">
                {stats.satisfaction}%
              </div>
              <div className="text-slate-600">Employee Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Open <span className="brand-gradient-text">Positions</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover exciting career opportunities and join our growing team of innovators.
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setSelectedDepartment("All")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedDepartment === "All"
                  ? "bg-primary text-white shadow-brand"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <span>All Departments</span>
              <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs ml-2">
                {jobOpenings.length}
              </span>
            </button>
            {departments.map((dept) => (
              <button
                key={dept.name}
                onClick={() => setSelectedDepartment(dept.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  selectedDepartment === dept.name
                    ? "bg-primary text-white shadow-brand"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${dept.color}`}></div>
                <span>{dept.name}</span>
                <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                  {dept.count}
                </span>
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3">
                  <Icon name="Loader2" size={20} className="animate-spin text-primary" />
                  <span className="text-slate-600">Loading career opportunities...</span>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <Icon name="AlertCircle" size={24} className="text-red-500 mx-auto mb-3" />
                  <p className="text-red-700 mb-4">{error}</p>
                  <Button
                    variant="outline"
                    onClick={loadCareersData}
                    iconName="RefreshCw"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Briefcase" size={48} className="text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No positions available</h3>
                <p className="text-slate-600">
                  {selectedDepartment === "All" 
                    ? "We don't have any open positions at the moment. Check back soon!"
                    : `No positions available in ${selectedDepartment} department.`
                  }
                </p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg transition-all duration-200 cursor-pointer"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 group-hover:text-primary transition-colors duration-200">
                            {job.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                            <span className="flex items-center space-x-1">
                              <Icon name="Building" size={14} />
                              <span>{job.department}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Icon name="MapPin" size={14} />
                              <span>{job.location}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Icon name="Clock" size={14} />
                              <span>{job.type}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Icon name="Calendar" size={14} />
                              <span>{job.posted}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-600 mb-4 line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.slice(0, 4).map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 4 && (
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                            +{job.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-4 md:mt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Eye"
                        iconPosition="left"
                      >
                        View Details
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="cta-button text-white"
                        iconName="Send"
                        iconPosition="right"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Job Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    {selectedJob.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <span className="flex items-center space-x-1">
                      <Icon name="Building" size={16} />
                      <span>{selectedJob.department}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="MapPin" size={16} />
                      <span>{selectedJob.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={16} />
                      <span>{selectedJob.type}</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-3">
                  Job Description
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              {selectedJob.requirements.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">
                    Requirements
                  </h4>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Icon
                          name="Check"
                          size={16}
                          className="text-green-500 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-slate-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedJob.skills.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">
                    Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <Button
                  variant="default"
                  className="cta-button text-white font-medium flex-1"
                  iconName="Send"
                  iconPosition="right"
                >
                  Apply Now
                </Button>
                <Button variant="outline" iconName="Share2" iconPosition="right">
                  Share Job
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersFixed;