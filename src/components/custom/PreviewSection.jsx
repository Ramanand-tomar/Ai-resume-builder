import React, { useContext } from 'react';
import PersonalDetailsPreview from './previewSection/PersonalDetailsPreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import SummaryPreview from './previewSection/SummaryPreview';
import ExperiencePreview from './previewSection/ExperiencePreview';
import EducationPreview from './previewSection/EducationPreview';
import SkillPreview from './previewSection/SkillPreview';
import ProjectsPreview from './previewSection/ProjectsPreview';

const PreviewSection = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const themeColor = resumeInfo?.themeColor || "#F26522";
  const isOnePage = resumeInfo?.isOnePage || false;

  return (
    <div
      style={{ borderTopColor: themeColor }}
      className={`bg-white shadow-2xl rounded-2xl border-t-[12px] border-x border-b border-gray-200/90 text-gray-900 relative transition-all duration-300 ${
        isOnePage
          ? "p-6 sm:p-8 min-h-[700px] leading-tight text-xs"
          : "p-8 sm:p-12 min-h-[842px] leading-normal"
      }`}
    >
      {/* Personal Details */}
      <PersonalDetailsPreview resumeInfo={resumeInfo} />

      {/* Summary */}
      <SummaryPreview resumeInfo={resumeInfo} />

      {/* Professional Experience */}
      <ExperiencePreview resumeInfo={resumeInfo} />

      {/* Key Projects */}
      <ProjectsPreview resumeInfo={resumeInfo} />

      {/* Education */}
      <EducationPreview resumeInfo={resumeInfo} />

      {/* Skills */}
      <SkillPreview resumeInfo={resumeInfo} />
    </div>
  );
};

export default PreviewSection;