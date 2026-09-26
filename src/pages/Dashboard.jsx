import GlobalAPI from '@/API_Services/GlobalAPI';
import AddResume from '@/components/custom/AddResume';
import ResumeCardItems from '@/components/custom/ResumeCardItems';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    user && GetResumeList();
  }, [user]);

  const GetResumeList = () => {
    GlobalAPI.GetResumes(user?.primaryEmailAddress?.emailAddress).then(
      (res) => {
        console.log(res.data);
        toast.success('Resumes fetched successfully');
        setResumeList(res.data.data);
      },
      (err) => {
        console.log(err);
        toast.error('Something went wrong');
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-12 px-5 sm:px-10 md:px-16 lg:px-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-7 rounded-full bg-gray-900 text-white text-[12px] font-semibold flex items-center justify-center shrink-0">
            AX
          </div>
          <span className="text-[13px] font-medium border border-gray-300 rounded-full px-3.5 py-1 text-gray-900 bg-white">
            Studio Workspace
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900 mb-3">
          My Resumes
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-10 max-w-xl">
          Craft high-impact AI resumes tailored to dominate your next career milestone.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <AddResume />
          {resumeList.length > 0
            ? resumeList.map((resume, index) => (
                <ResumeCardItems resume={resume} key={index} refreshData={GetResumeList} />
              ))
            : [1, 2, 3, 4].map((item, index) => (
                <div
                  key={index}
                  className="h-[280px] rounded-2xl bg-white border border-gray-200/80 animate-pulse shadow-2xs"
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;