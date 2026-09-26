import React from "react";

const ExperiencePreview = ({ resumeInfo }) => {
  // Function to convert plain text with bullet points to HTML
  const convertToHtml = (content) => {
    if (!content) return "";
    
    // If content already contains HTML tags, return as is
    if (content.includes('<ul>') || content.includes('<li>') || content.includes('<p>')) {
      return content;
    }
    
    // Convert plain text with bullet points to HTML
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    
    if (lines.length === 0) return "";
    
    const listItems = lines.map(line => {
      // Remove bullet points symbols and clean the text
      const cleanLine = line.replace(/^[•\-]\s*/, '').trim();
      return `<li>${cleanLine}</li>`;
    });
    
    return `<ul>${listItems.join('')}</ul>`;
  };

  return (
    <div className="my-6">
      <h2
        style={{ color: resumeInfo?.themeColor }}
        className="text-center font-bold text-xm mb-2"
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.experience?.map((item, index) => (
        <div key={index} className="mb-4">
          <h2
            style={{ color: resumeInfo?.themeColor }}
            className="text-sm font-bold"
          >
            {item?.title}
          </h2>

          <h2 className="text-xm flex justify-between">
            <span>
              {item?.companyName}
              {item?.city && `, ${item?.city}`}
              {item?.state && `, ${item?.state}`}
            </span>
            <span>
              {item?.startDate} –{" "}
              {item?.currentlyWorking ? "Present" : item?.endDate}
            </span>
          </h2>

          {/* Render HTML or converted plain text bullet points */}
          <div
            className="text-sm my-3 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: convertToHtml(item?.workSummery) 
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ExperiencePreview;