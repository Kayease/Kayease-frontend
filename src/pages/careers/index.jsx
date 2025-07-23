import React, { useState, useEffect } from "react";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const jobOpenings = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote / Bangalore",
    type: "Full-time",
    experience: "3-5 years",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
    description:
      "Join our engineering team to build scalable web applications and innovative digital solutions.",
    requirements: [
      "3+ years of experience in full-stack development",
      "Proficiency in React, Node.js, and modern JavaScript",
      "Experience with cloud platforms (AWS/Azure)",
      "Strong problem-solving and communication skills",
    ],
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    location: "Hybrid / Mumbai",
    type: "Full-time",
    experience: "2-4 years",
    skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
    description:
      "Create beautiful and intuitive user experiences for our digital products and client projects.",
    requirements: [
      "2+ years of UI/UX design experience",
      "Proficiency in Figma and design systems",
      "Strong portfolio showcasing web and mobile designs",
      "Understanding of user-centered design principles",
    ],
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    experience: "1-3 years",
    skills: [
      "SEO",
      "Google Ads",
      "Social Media",
      "Analytics",
      "Content Marketing",
    ],
    description:
      "Drive digital marketing strategies and help our clients achieve their online growth goals.",
    requirements: [
      "1+ years of digital marketing experience",
      "Knowledge of SEO, SEM, and social media marketing",
      "Experience with Google Analytics and marketing tools",
      "Creative thinking and analytical mindset",
    ],
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Bangalore",
    type: "Full-time",
    experience: "2-4 years",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    description:
      "Build and maintain robust infrastructure to support our growing platform and client applications.",
    requirements: [
      "2+ years of DevOps/Infrastructure experience",
      "Experience with containerization and orchestration",
      "Knowledge of cloud platforms and automation tools",
      "Strong scripting and monitoring skills",
    ],
    posted: "5 days ago",
  },
  {
    id: 5,
    title: "Business Development Executive",
    department: "Sales",
    location: "Delhi / Remote",
    type: "Full-time",
    experience: "1-3 years",
    skills: [
      "Sales",
      "Client Relations",
      "CRM",
      "Negotiation",
      "Lead Generation",
    ],
    description:
      "Identify new business opportunities and build lasting relationships with potential clients.",
    requirements: [
      "1+ years of B2B sales experience",
      "Excellent communication and presentation skills",
      "Experience with CRM systems and sales processes",
      "Self-motivated with strong networking abilities",
    ],
    posted: "1 day ago",
  },
];

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

const departments = [
  { name: "Engineering", count: 8, color: "bg-blue-500" },
  { name: "Design", count: 3, color: "bg-purple-500" },
  { name: "Marketing", count: 4, color: "bg-green-500" },
  { name: "Sales", count: 2, color: "bg-orange-500" },
  { name: "Operations", count: 3, color: "bg-pink-500" },
];

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const [animatedElements, setAnimatedElements] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const filteredJobs =
    selectedDepartment === "All"
      ? jobOpenings
      : jobOpenings.filter((job) => job.department === selectedDepartment);

  const JobModal = ({ job, onClose }) => {
    if (!job) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  {job.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-slate-600">
                  <span className="flex items-center space-x-1">
                    <Icon name="Building" size={16} />
                    <span>{job.department}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="MapPin" size={16} />
                    <span>{job.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} />
                    <span>{job.type}</span>
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
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
                {job.description}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-3">
                Requirements
              </h4>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
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

            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-3">
                Required Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

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
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="absolute top-20 left-1/4 w-4 h-4 bg-primary/20 rounded-full geometric-float"></div>
        <div className="absolute top-40 right-1/3 w-3 h-3 bg-secondary/20 rounded-full geometric-float animation-delay-200"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            data-animate
            id="hero-content"
            className={`transition-all duration-700 ${
              animatedElements.has("hero-content")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              Join Our <span className="brand-gradient-text">Amazing Team</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Build the future of digital innovation with us. We're looking for
              passionate individuals who want to make a difference and grow
              their careers in a dynamic environment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="default"
                size="lg"
                className="cta-button text-white font-medium"
                iconName="Search"
                iconPosition="right"
                onClick={() => navigate("/careers")}
              >
                View Open Positions
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Users"
                iconPosition="left"
                onClick={() => navigate("/about")}
              >
                Learn About Culture
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-animate
            id="stats"
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 delay-200 ${
              animatedElements.has("stats")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold brand-gradient-text mb-2">
                50+
              </div>
              <div className="text-slate-600">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold brand-gradient-text mb-2">
                5
              </div>
              <div className="text-slate-600">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold brand-gradient-text mb-2">
                20+
              </div>
              <div className="text-slate-600">Open Positions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold brand-gradient-text mb-2">
                95%
              </div>
              <div className="text-slate-600">Employee Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-animate
            id="benefits-header"
            className={`text-center mb-16 transition-all duration-700 delay-300 ${
              animatedElements.has("benefits-header")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Why Work With <span className="brand-gradient-text">Kayease</span>
              ?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We believe in creating an environment where our team can thrive,
              grow, and make meaningful impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                data-animate
                id={`benefit-${index}`}
                className={`group bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover-lift transition-all duration-700 ${
                  animatedElements.has(`benefit-${index}`)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon
                      name={benefit.icon}
                      size={24}
                      className="text-primary"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-animate
            id="jobs-header"
            className={`text-center mb-12 transition-all duration-700 delay-500 ${
              animatedElements.has("jobs-header")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Open <span className="brand-gradient-text">Positions</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Find your next career opportunity and join our growing team of
              innovators.
            </p>

            {/* Department Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedDepartment("All")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedDepartment === "All"
                    ? "bg-primary text-white shadow-brand"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                All Departments
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
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.map((job, index) => (
              <div
                key={job.id}
                data-animate
                id={`job-${job.id}`}
                className={`group bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover-lift cursor-pointer transition-all duration-700 ${
                  animatedElements.has(`job-${job.id}`)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ animationDelay: `${600 + index * 100}ms` }}
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
                            <span>{job.experience}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">{job.posted}</div>
                    </div>

                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.slice(0, 4).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 4 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                          +{job.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mt-4 md:mt-0 md:ml-6">
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-1/4 w-6 h-6 bg-white/20 rounded-full geometric-float"></div>
        <div className="absolute bottom-10 right-1/3 w-4 h-4 bg-white/20 rounded-full geometric-float animation-delay-400"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            data-animate
            id="cta-content"
            className={`transition-all duration-700 delay-700 ${
              animatedElements.has("cta-content")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Don't See the Perfect Role?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              We're always looking for talented individuals. Send us your resume
              and let's explore opportunities together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-medium"
                iconName="Send"
                iconPosition="right"
              >
                Send Your Resume
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                iconName="Mail"
                iconPosition="left"
              >
                Contact HR Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Modal */}
      <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
};

export default CareersPage;
