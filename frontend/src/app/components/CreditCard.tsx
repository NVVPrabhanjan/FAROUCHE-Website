import React from 'react';
import { Twitter, Instagram, Linkedin, Github, Link } from 'lucide-react';

const CreditCard = ({ person }) => {
  // Function to render the correct social icon based on type
  const getSocialIcon = (type) => {
    switch(type) {
      case "twitter":
        return <Twitter size={16} className="hover:scale-110 transition-transform" />;
      case "instagram":
        return <Instagram size={16} className="hover:scale-110 transition-transform" />;
      case "linkedin":
        return <Linkedin size={16} className="hover:scale-110 transition-transform" />;
      case "github":
        return <Github size={16} className="hover:scale-110 transition-transform" />;
      case "website":
      default:
        return <Link size={16} className="hover:scale-110 transition-transform" />;
    }
  };

  return (
    <div className="flex flex-col bg-purple-900 rounded-lg shadow-lg overflow-hidden w-full max-w-xs transform hover:-translate-y-1 transition-transform duration-300">
      {/* Photo Section with INCREASED height */}
      <div className="w-full h-64 overflow-hidden bg-purple-800">
        <img 
          src={person.photo} 
          alt={person.name} 
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/api/placeholder/400/400";
          }}
        />
      </div>
      
      {/* Info Section */}
      <div className="p-4 w-full bg-black">
        <div className="text-center">
          <h3 className="text-lg font-bold text-purple-300">{person.name}</h3>
          <p className="text-xs text-purple-200 mt-1">{person.role}</p>
        </div>
        
        {/* Social Links */}
        <div className="flex justify-center space-x-4 mt-3">
          {person.socials.map((social, index) => (
            <a 
              key={index}
              href={social.url}
              className="text-purple-400 hover:text-purple-200 transition-colors duration-300 p-1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.type} profile`}
            >
              {getSocialIcon(social.type)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const CreditCardGrid = () => {
  // Sample data for multiple people
  const people = [
    {
      name: "Prabhanjan",
      role: "Developer",
      photo: "/d-1.jpg",
      socials: [
        { type: "twitter", url: "https://x.com/Venkatprabhanj2" },
        { type: "instagram", url: "https://www.instagram.com/venkataprabhanjan?igsh=MTliMDAzeXE5bTc1dw==" },
        { type: "linkedin", url: "https://www.linkedin.com/in/n-v-venkata-prabhanjan-740213248/" },
        { type: "github", url: "https://github.com/NVVPrabhanjan" },
        { type: "website", url: "https://prabhanjan.live" }
      ]
    },
    {
      name: "Hithesh R",
      role: "Developer",
      photo: "/d-2.jpg",
      socials: [
        { type: "twitter", url: "https://twitter.com/imaHelldiver" },
        { type: "github", url: "https://github.com/rhithesh" },
        { type: "website", url: "https://hithesh.live" }
      ]
    },
    {
      name: "Puli Darshan Reddy",
      role: "Project Manager",
      photo: "/d-3.jpg",
      socials: [
        { type: "twitter", url: "https://x.com/_DarshanReddy" },
        { type: "linkedin", url: "https://www.linkedin.com/in/puli-darshan-reddy-086a8530b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
        { type: "github", url: "https://github.com/DarshanPuli?tab=repositories" }
      ]
    },
    {
      name: "Akshanth Hanbal",
      role: "UI Designer ",
      photo: "/co-1.jpg",
      socials: [
        { type: "instagram", url: "https://www.instagram.com/akshanth_hanbal?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
        { type: "linkedin", url: "https://www.linkedin.com/in/akshanth-hanbal-891a6b238" }
      ]
    }
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-900 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-purple-300 text-center">Development Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {people.map((person, index) => (
          <CreditCard key={index} person={person} />
        ))}
      </div>
    </div>
  );
};

export default CreditCardGrid;