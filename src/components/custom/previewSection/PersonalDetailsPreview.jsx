import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

const PersonalDetailsPreview = ({ resumeInfo }) => {
  const themeColor = resumeInfo?.themeColor || "#F26522";

  return (
    <div className="text-center flex flex-col items-center">
      <h1
        className="font-bold text-2xl sm:text-3xl tracking-tight uppercase"
        style={{ color: themeColor }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h1>

      <p className="text-sm font-semibold text-gray-800 tracking-wide uppercase mt-1">
        {resumeInfo?.jobTitle}
      </p>

      {resumeInfo?.address && (
        <p className="text-xs text-gray-600 mt-1 flex items-center justify-center gap-1">
          <MapPin className="w-3 h-3 text-gray-500" />
          <span>{resumeInfo.address}</span>
        </p>
      )}

      {/* Primary Contact Bar */}
      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-xs text-gray-700 mt-2 font-medium">
        {resumeInfo?.email && (
          <span className="flex items-center gap-1">
            <Mail className="w-3 h-3 text-gray-500" />
            <span>{resumeInfo.email}</span>
          </span>
        )}

        {resumeInfo?.phone && (
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-gray-500" />
            <span>{resumeInfo.phone}</span>
          </span>
        )}
      </div>

      {/* Social & Portfolio Links */}
      {(resumeInfo?.linkedinUrl || resumeInfo?.githubUrl || resumeInfo?.portfolioUrl) && (
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[11px] text-blue-600 font-medium mt-1.5">
          {resumeInfo?.linkedinUrl && (
            <a
              href={resumeInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline text-gray-700"
            >
              <Linkedin className="w-3 h-3 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </a>
          )}

          {resumeInfo?.githubUrl && (
            <a
              href={resumeInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline text-gray-700"
            >
              <Github className="w-3 h-3 text-gray-800" />
              <span>GitHub</span>
            </a>
          )}

          {resumeInfo?.portfolioUrl && (
            <a
              href={resumeInfo.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline text-gray-700"
            >
              <Globe className="w-3 h-3 text-[#F26522]" />
              <span>Portfolio</span>
            </a>
          )}
        </div>
      )}

      <hr style={{ borderColor: themeColor }} className="w-full border-t-[1.5px] my-3" />
    </div>
  );
};

export default PersonalDetailsPreview;