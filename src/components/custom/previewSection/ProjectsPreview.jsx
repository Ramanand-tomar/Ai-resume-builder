import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsPreview = ({ resumeInfo }) => {
  const themeColor = resumeInfo?.themeColor || "#F26522";

  if (!resumeInfo?.projects || resumeInfo.projects.length === 0) return null;

  return (
    <div className="my-5">
      <h2
        style={{ color: themeColor }}
        className="text-center font-bold text-sm tracking-wide uppercase mb-1"
      >
        Projects & Key Work
      </h2>
      <hr style={{ borderColor: themeColor }} className="border-t border-gray-300 mb-3" />

      <div className="flex flex-col gap-3">
        {resumeInfo.projects.map((project, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex justify-between items-baseline">
              <h3 className="font-semibold text-xs sm:text-sm text-gray-900 flex items-center gap-2">
                <span>{project?.title}</span>
                {project?.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-normal hover:underline text-blue-600"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Demo</span>
                  </a>
                )}
              </h3>
              {project?.techStack && (
                <span className="text-[11px] font-medium text-gray-500">
                  {project.techStack}
                </span>
              )}
            </div>

            {project?.description && (
              <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPreview;
