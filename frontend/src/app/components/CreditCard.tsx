import React from "react";
import { Twitter, Instagram, Linkedin, Github, Globe } from "lucide-react";
import Image from "next/image";

interface Social {
  type: string;
  url: string;
}

interface Person {
  name: string;
  role: string;
  photo: string;
  socials: Social[];
}

const CreditCard = ({ person }: { person: Person }) => {

  const getSocialIcon = (type: string) => {
    const iconProps = { size: 14, className: "group-hover:scale-110 transition-transform" };
    switch (type.toLowerCase()) {
      case "twitter":
        return <Twitter {...iconProps} />;
      case "instagram":
        return <Instagram {...iconProps} />;
      case "linkedin":
        return <Linkedin {...iconProps} />;
      case "github":
        return <Github {...iconProps} />;
      case "website":
      default:
        return <Globe {...iconProps} />;
    }
  };

  return (
    <div className="group relative bg-black border border-white/10 hover:border-purple-500/50 transition-colors duration-500 overflow-hidden flex flex-col">
      
      <div className="absolute top-0 right-0 p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="w-2 h-2 bg-purple-500 rounded-full" />
      </div>

      
      <div className="relative aspect-[4/5] overflow-hidden transition-all duration-700 opacity-80 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />
        <img
          src={person.photo}
          alt={person.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/api/placeholder/400/500";
          }}
        />
      </div>

      
      <div className="p-6 relative z-20 -mt-20">
        <h3 className="text-xl font-bold font-cinzel text-white uppercase tracking-tight mb-1 group-hover:text-purple-400 transition-colors">
          {person.name}
        </h3>
        <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-6 border-l-2 border-purple-500 pl-3">
          {person.role}
        </p>

        
        <div className="flex gap-4 border-t border-white/10 pt-4">
          {person.socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              className="text-neutral-500 hover:text-white transition-colors duration-300 p-1"
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

  const people = [
    {
      name: "Prabhanjan",
      role: "Backend Lead",
      photo: "/d-1.jpg",
      socials: [
        { type: "twitter", url: "https://x.com/Venkatprabhanj2" },
        { type: "instagram", url: "https://www.instagram.com/venkataprabhanjan?igsh=MTliMDAzeXE5bTc1dw==" },
        { type: "linkedin", url: "https://www.linkedin.com/in/n-v-venkata-prabhanjan-740213248/" },
        { type: "github", url: "https://github.com/NVVPrabhanjan" },
        { type: "website", url: "https://prabhanjan.live" },
      ],
    },
    {
      name: "Vinay Yele",
      role: "Full Stack Dev",
      photo: "/developer4.webp",
      socials: [
        { type: "github", url: "https://github.com/Vinay-yele" },
        { type: "linkedin", url: "https://www.linkedin.com/in/vinay-yele-08ab08295/" },
        { type: "twitter", url: "https://x.com/vinayyele2013" },
      ],
    },
    {
      name: "Hithesh R",
      role: "Frontend Dev",
      photo: "/d-2.jpg",
      socials: [
        { type: "twitter", url: "https://twitter.com/imaHelldiver" },
        { type: "github", url: "https://github.com/rhithesh" },
        { type: "website", url: "https://hithesh.live" },
      ],
    },
    {
      name: "Puli Darshan Reddy",
      role: "Frontend Dev",
      photo: "/d-3.jpg",
      socials: [
        { type: "twitter", url: "https://x.com/_DarshanReddy" },
        { type: "linkedin", url: "https://www.linkedin.com/in/puli-darshan-reddy-086a8530b" },
        { type: "github", url: "https://github.com/DarshanPuli?tab=repositories" },
      ],
    },
  ];

  return (
    <section className="container mx-auto px-6 py-20 relative">
       
       <div className="flex flex-col items-center mb-16 text-center">
          <p className="text-purple-500 font-mono text-xs uppercase tracking-widest mb-4">

          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-cinzel uppercase tracking-tighter text-white">
              Development Team
          </h2>
       </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {people.map((person, index) => (
          <CreditCard key={index} person={person} />
        ))}
      </div>
    </section>
  );
};

export default CreditCardGrid;
