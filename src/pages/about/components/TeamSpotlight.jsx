import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const TeamSpotlight = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Alex Rodriguez",
      role: "Founder & CEO",
      expertise: [
        "Strategic Planning",
        "Business Development",
        "Team Leadership",
      ],
      certifications: ["AWS Solutions Architect", "Google Cloud Professional"],
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      funFact: "Can solve a Rubik's cube in under 2 minutes",
      favoriteTech: "React & Node.js",
      quote: "Every challenge is an opportunity to innovate and grow.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
      },
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Lead Designer",
      expertise: ["UI/UX Design", "Brand Identity", "Design Systems"],
      certifications: [
        "Adobe Certified Expert",
        "Google UX Design Certificate",
      ],
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      funFact: "Collects vintage design books from the 1960s",
      favoriteTech: "Figma & Framer",
      quote: "Great design is invisible—it just works beautifully.",
      social: {
        linkedin: "#",
        dribbble: "#",
        behance: "#",
      },
    },
    {
      id: 3,
      name: "Michael Thompson",
      role: "Senior Full-Stack Developer",
      expertise: ["React Development", "Node.js", "Database Architecture"],
      certifications: ["MongoDB Professional", "AWS Developer Associate"],
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      funFact: "Contributes to 5+ open source projects",
      favoriteTech: "TypeScript & GraphQL",
      quote: "Clean code is not just functional—it's poetry in motion.",
      social: {
        github: "#",
        stackoverflow: "#",
        linkedin: "#",
      },
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Digital Marketing Strategist",
      expertise: ["SEO Optimization", "Content Strategy", "Analytics"],
      certifications: [
        "Google Analytics Certified",
        "HubSpot Content Marketing",
      ],
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      funFact: "Speaks 4 languages fluently",
      favoriteTech: "Google Analytics & Semrush",
      quote: "Data tells stories, but strategy brings them to life.",
      social: {
        linkedin: "#",
        twitter: "#",
        medium: "#",
      },
    },
    {
      id: 5,
      name: "David Kim",
      role: "DevOps Engineer",
      expertise: ["Cloud Infrastructure", "CI/CD", "Security"],
      certifications: ["AWS DevOps Professional", "Kubernetes Administrator"],
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      funFact: "Built his first server at age 12",
      favoriteTech: "Docker & Kubernetes",
      quote: "Automation isn't just efficiency—it's reliability at scale.",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: 6,
      name: "Lisa Wang",
      role: "Project Manager",
      expertise: ["Agile Methodology", "Client Relations", "Quality Assurance"],
      certifications: ["PMP Certified", "Scrum Master", "Six Sigma Green Belt"],
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      funFact: "Marathon runner with 15+ races completed",
      favoriteTech: "Jira & Notion",
      quote: "Great projects aren't just delivered—they're orchestrated.",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-6 py-3 mb-6">
            <Icon name="Users" size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              Meet Our Team
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            The <span className="brand-gradient-text">Experts</span> Behind Your
            Success
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our diverse team of passionate professionals brings together decades
            of experience in technology, design, and strategy to deliver
            exceptional results.
          </p>
        </div>


        {/* Team Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Our Team by the Numbers
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "15+", label: "Team Members", icon: "Users" },
              { number: "50+", label: "Certifications", icon: "Award" },
              {
                number: "15+",
                label: "Years Combined Experience",
                icon: "Clock",
              },
              { number: "15+", label: "Technologies Mastered", icon: "Code" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon name={stat.icon} size={24} className="text-primary" />
                </div>
                <div className="text-3xl font-bold brand-gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Team CTA */}
        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer overflow-hidden"
            >
              <div>
                <div className="relative">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  {/* Social Links */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {Object.entries(member.social).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                      >
                        <Icon
                          name={
                            platform === "linkedin"
                              ? "Linkedin"
                              : platform === "github"
                              ? "Github"
                              : platform === "twitter"
                              ? "Twitter"
                              : "Globe"
                          }
                          size={16}
                        />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise.slice(0, 2).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-primary text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.expertise.length > 2 && (
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                        +{member.expertise.length - 2} more
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm italic">
                    "{member.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Want to Join Our Amazing Team?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals who share our
              vision of making digital transformation accessible and impactful.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="cta-button px-8 py-3 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300"
                onClick={() => window.location.href = "/careers"}
              >
                View Open Positions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSpotlight;
