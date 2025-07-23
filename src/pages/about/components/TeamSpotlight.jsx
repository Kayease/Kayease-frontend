import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const TeamSpotlight = () => {
  const teamImage = {
    chanda: "/team/chanda.png",
    pp: "/team/pp.png",
    rustam: "/team/rustam.png",
    manish: "/team/manish.png", // fallback since manish.png does not exist
    sunny: "/team/sunny.png",
    amit: "/team/amit.png",
  };

  const teamMembers = [
    {
      id: 1,
      name: "Sunny Dhalia",
      role: "Chief Technical Officer",
      expertise: ["Team Leadership", "Innovation Strategy"],
      experience: " 15 + years",
      avatar: teamImage.sunny,
    },
    {
      id: 2,
      name: "Amit Trivedi",
      role: "Chief Operations Officer",
      expertise: ["Workflow Automation", "Strategic Operations"],
      experience: " 12 + years",
      avatar: teamImage.amit,
    },
    {
      id: 3,
      name: "Chanda Kumawat",
      role: "Bussiness Analyst",
      expertise: ["Data Analysis", "Market Research"],
      experience: " 1 + years",
      avatar: teamImage.chanda,
    },
    {
      id: 4,
      name: "Rustam Khan",
      role: "Full-Stack Developer",
      expertise: ["React Development", "Full-Stack Development"],
      experience: " 4 + years",
      avatar: teamImage.rustam,
    },
    {
      id: 5,
      name: "Pradeependra Pratap",
      role: "Backend Developer",
      expertise: ["Code Optimization", "Backed Development"],
      experience: " 4 + years",
      avatar: teamImage.pp,
    },

    {
      id: 6,
      name: "Manish Kumar",
      role: "Backend Developer",
      expertise: ["Jango Framework", "PHP Development"],
      experience: " 5 + years",
      avatar: teamImage.manish,
    },
  ];

  return (
    <section className="py-10 sm:py-14 lg:py-18 xl:py-20 xxl:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 xxl:px-10 xxxl:px-16">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 mb-6 shadow-lg">
            <Icon name="User" size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              Meet the Experts
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl xxl:text-7xl font-bold text-slate-900 mb-2 sm:mb-3 lg:mb-4">
            The <span className="brand-gradient-text">Experts</span> Behind Your
            Success
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl  text-slate-600 max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
            Our team combines marketers, developers, designers, and analysts—all
            working together to drive growth and build technology that performs.
          </p>
        </div>

        {/* Team Snapshot Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-4 sm:p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-900 text-center mb-4">
            Team Snapshot
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 xl:gap-8">
            {[
              { number: "15+", label: "Team Members", icon: "Users" },
              { number: "50+", label: "Certifications", icon: "Award" },
              { number: "15+", label: "Technologies Mastered", icon: "Code" },
              { number: "5+", label: "Key Roles", icon: "Briefcase" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-md">
                  <Icon name={stat.icon} size={18} className="text-primary" />
                </div>
                <div className="text-xl sm:text-2xl font-bold brand-gradient-text mb-1">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Roles */}
        <div className="mb-8">
          <h4 className="text-base font-bold text-slate-900 text-center mb-3">
            Key Roles to Showcase
          </h4>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {[
              "Campaign Strategist",
              "SEO/Ads Specialist",
              "UX/UI Designer",
              "Full-Stack Developer",
              "Product Manager",
            ].map((role, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-50 text-primary text-xs font-medium rounded-full shadow"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

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
                    className="w-full h-72 object-cover object-top"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div> */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  {/* Experience Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      {member.experience} Experience
                    </span>
                  </div>
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
                  </div>
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
                onClick={() => (window.location.href = "/careers")}
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
