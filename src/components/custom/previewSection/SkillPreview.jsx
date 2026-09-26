import React from 'react';

const SkillPreview = ({ resumeInfo }) => {
  const themeColor = resumeInfo?.themeColor || "#F26522";

  if (!resumeInfo?.skills || resumeInfo.skills.length === 0) return null;

  return (
    <div className="my-5">
      <h2
        style={{ color: themeColor }}
        className="text-center font-bold text-sm tracking-wide uppercase mb-1"
      >
        Skills & Core Competencies
      </h2>
      <hr style={{ borderColor: themeColor }} className="border-t border-gray-300 mb-3" />

      <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
        {resumeInfo.skills.map((item, index) => {
          // Normalize rating safely so it never overflows or scales erroneously
          const rawRating = Number(item?.rating) || 80;
          const percentage = Math.min(Math.max(rawRating > 5 ? rawRating : rawRating * 20, 10), 100);

          return (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-xs font-medium text-gray-800">
                <span className="truncate pr-2">{item?.name || "Skill"}</span>
                <span className="text-[11px] text-gray-500 font-medium shrink-0">{percentage}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: themeColor,
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillPreview;