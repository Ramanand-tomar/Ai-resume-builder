import React, { useContext, useState } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import PersonalDetails from './formSection/PersonalDetails';
import { ArrowLeft, ArrowRight, Home, Sparkles, CheckCircle2, FileText } from 'lucide-react';
import Summery from './formSection/Summery';
import Experience from './formSection/Experience';
import Education from './formSection/Education';
import Skills from './formSection/Skills';
import Projects from './formSection/Projects';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './Themecolor';
import AtsScoreModal from './AtsScoreModal';

const FormSection = () => {
  const { resumeID } = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const [openAtsModal, setOpenAtsModal] = useState(false);

  // One Page Mode toggle
  const isOnePage = resumeInfo?.isOnePage || false;
  const toggleOnePage = () => {
    setResumeInfo({
      ...resumeInfo,
      isOnePage: !isOnePage,
    });
  };

  // Calculate ATS Score completeness percentage dynamically
  const calculateAtsScore = () => {
    let score = 15;
    if (resumeInfo?.firstName && resumeInfo?.lastName) score += 20;
    if (resumeInfo?.jobTitle) score += 15;
    if (resumeInfo?.summery) score += 15;
    if (resumeInfo?.experience?.length > 0) score += 15;
    if (resumeInfo?.projects?.length > 0) score += 10;
    if (resumeInfo?.skills?.length > 0) score += 10;
    return Math.min(score, 100);
  };

  const atsScore = calculateAtsScore();

  const steps = [
    { index: 1, name: "Personal" },
    { index: 2, name: "Summary" },
    { index: 3, name: "Experience" },
    { index: 4, name: "Projects" },
    { index: 5, name: "Education" },
    { index: 6, name: "Skills" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header controls & step navigation */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-2xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link to={'/dashboard'}>
            <button
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
              title="Dashboard Home"
            >
              <Home className="w-4 h-4" />
            </button>
          </Link>
          <ThemeColor />

          {/* Test ATS Score Button */}
          <button
            onClick={() => setOpenAtsModal(true)}
            className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Test ATS ({atsScore}%)</span>
          </button>

          {/* One Page Mode Toggle */}
          <button
            onClick={toggleOnePage}
            className={`flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full border transition-colors cursor-pointer ${
              isOnePage
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isOnePage ? "One-Page: ON" : "One-Page Mode"}</span>
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {activeFormIndex > 1 && (
            <button
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs sm:text-sm font-medium rounded-full px-4 py-2 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}

          <button
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs sm:text-sm font-medium rounded-full px-5 py-2 flex items-center gap-2 transition-colors shadow-2xs cursor-pointer ml-auto"
          >
            <span>{activeFormIndex === 6 ? "Finish & Preview" : "Next Step"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Tracker Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200/90 shadow-2xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[500px]">
          {steps.map((step) => {
            const isActive = activeFormIndex === step.index;
            const isCompleted = activeFormIndex > step.index;
            return (
              <button
                key={step.index}
                onClick={() => setActiveFormIndex(step.index)}
                className={`flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "text-[#F26522] font-semibold"
                    : isCompleted
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold ${
                    isActive
                      ? "bg-[#F26522] text-white"
                      : isCompleted
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.index}
                </div>
                <span>{step.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Steps */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
        {activeFormIndex === 1 ? (
          <PersonalDetails enableNext={(v) => setEnableNext(v)} />
        ) : activeFormIndex === 2 ? (
          <Summery enableNext={(v) => setEnableNext(v)} />
        ) : activeFormIndex === 3 ? (
          <Experience enableNext={(v) => setEnableNext(v)} />
        ) : activeFormIndex === 4 ? (
          <Projects enableNext={(v) => setEnableNext(v)} />
        ) : activeFormIndex === 5 ? (
          <Education enableNext={(v) => setEnableNext(v)} />
        ) : activeFormIndex === 6 ? (
          <Skills enableNext={(v) => setEnableNext(v)} />
        ) : activeFormIndex === 7 ? (
          <Navigate to={"/my-resume/" + resumeID + "/view"} />
        ) : null}
      </div>

      {/* ATS Score Audit Modal */}
      <AtsScoreModal open={openAtsModal} onOpenChange={setOpenAtsModal} />
    </div>
  );
};

export default FormSection;