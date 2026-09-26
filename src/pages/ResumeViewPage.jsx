import GlobalAPI from "@/API_Services/GlobalAPI";
import Header from "@/components/custom/Header";
import PreviewSection from "@/components/custom/PreviewSection";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Download, Share2, Sparkles, Check, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ResumeViewPage = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const [copied, setCopied] = useState(false);
  const params = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalAPI.GetResumeById(params.resumeID).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  const handleDownload = () => {
    window.print();
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Shareable link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="bg-[#F5F5F5] py-10 px-5 sm:px-10">
          <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center">
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Resume Optimized & Ready</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 mb-2">
              Congratulations! Your AI Resume is ready.
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-lg mb-8">
              Download your executive PDF resume or share a live link directly with recruiters.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link to="/dashboard">
                <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 text-sm font-medium rounded-full px-5 py-2.5 flex items-center gap-2 transition-colors cursor-pointer shadow-2xs">
                  <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
              </Link>
              <button
                onClick={handleDownload}
                className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-sm font-medium rounded-full px-6 py-2.5 flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <button
                onClick={handleShare}
                className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-full px-6 py-2.5 flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? "Link Copied!" : "Share Link"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="print-area" className="my-10 max-w-[900px] mx-auto px-4">
        <PreviewSection />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ResumeViewPage;
