import FormSection from "@/components/custom/FormSection";
import PreviewSection from "@/components/custom/PreviewSection";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "@/dummy/data";
import GlobalAPI from "@/API_Services/GlobalAPI";
const ResumeEditorPage = () => {
  const params = useParams();
  const [resumeInfo , setResumeInfo] = useState();

  useEffect(() => {
    GetResumeInfo();
  }, []);
  const GetResumeInfo = ()=>{
    GlobalAPI.GetResumeById(params.resumeID).then(resp=>{
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    })

  }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo , setResumeInfo ,params }}>
      <div className="grid grid-cols-1 md:grid-cols-2  p-10 gap-10">
        {/* form section */}
        <FormSection />

        {/* preview section  */}
        <PreviewSection />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ResumeEditorPage;
