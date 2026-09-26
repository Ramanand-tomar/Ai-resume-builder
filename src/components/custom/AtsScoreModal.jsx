import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Sparkles, CheckCircle2, AlertCircle, Award } from "lucide-react";

const AtsScoreModal = ({ open, onOpenChange }) => {
  const { resumeInfo } = useContext(ResumeInfoContext);

  const calculateAudit = () => {
    const checks = [
      {
        id: "name",
        label: "Contact & Personal Information",
        passed: Boolean(resumeInfo?.firstName && resumeInfo?.lastName && resumeInfo?.email && resumeInfo?.phone),
        weight: 20,
        tip: "Add full name, email address, and phone number.",
      },
      {
        id: "summary",
        label: "Professional Executive Summary",
        passed: Boolean(resumeInfo?.summery && resumeInfo.summery.length > 40),
        weight: 20,
        tip: "Include a 3-4 sentence professional summary with key impact metrics.",
      },
      {
        id: "experience",
        label: "Work Experience & Action Verbs",
        passed: Boolean(resumeInfo?.experience && resumeInfo.experience.length > 0),
        weight: 25,
        tip: "List at least 1-2 past work roles with bullet points.",
      },
      {
        id: "projects",
        label: "Key Projects & Tech Stack",
        passed: Boolean(resumeInfo?.projects && resumeInfo.projects.length > 0),
        weight: 15,
        tip: "Add project titles, live links, and technologies used.",
      },
      {
        id: "skills",
        label: "Technical Skills & Competencies",
        passed: Boolean(resumeInfo?.skills && resumeInfo.skills.length >= 3),
        weight: 20,
        tip: "List at least 3-5 core technical or role-specific skills.",
      },
    ];

    const totalScore = checks.reduce((acc, c) => (c.passed ? acc + c.weight : acc), 0);
    return { checks, totalScore };
  };

  const { checks, totalScore } = calculateAudit();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-gray-900 border border-gray-200 shadow-2xl rounded-2xl p-6 max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900">
                ATS Score & Resume Audit
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500">
                Automated ATS readability and keyword analysis report
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Score gauge header */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 my-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase text-gray-500 tracking-wide block">
              Overall ATS Grade
            </span>
            <span className="text-2xl font-bold text-gray-900">
              {totalScore >= 90 ? "A+ Outstanding" : totalScore >= 70 ? "B+ Good" : "Needs Review"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-3xl font-extrabold text-[#F26522]">{totalScore}</span>
              <span className="text-xs font-semibold text-gray-500">/100</span>
            </div>
          </div>
        </div>

        {/* Checklist breakdown */}
        <div className="space-y-3 my-2">
          <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
            Audit Checklist
          </h4>

          {checks.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg border flex items-start gap-3 transition-colors ${
                item.passed
                  ? "bg-emerald-50/60 border-emerald-200 text-emerald-950"
                  : "bg-amber-50/60 border-amber-200 text-amber-950"
              }`}
            >
              {item.passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <span className="font-semibold block">{item.label}</span>
                <span className="text-gray-600 block mt-0.5">{item.tip}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2 border-t border-gray-100">
          <button
            onClick={() => onOpenChange(false)}
            className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium rounded-full px-5 py-2 cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AtsScoreModal;
