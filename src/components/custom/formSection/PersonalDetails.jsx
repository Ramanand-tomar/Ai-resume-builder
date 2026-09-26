import GlobalAPI from '@/API_Services/GlobalAPI';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const PersonalDetails = ({ enableNext }) => {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo) {
      setFormData(resumeInfo);
    }
  }, [resumeInfo]);

  const handleInputchange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: formData,
    };

    GlobalAPI.UpdatreResumeDetails(params?.resumeID, data).then(
      (res) => {
        enableNext(true);
        setLoading(false);
        toast.success("Personal Details Updated Successfully");
      },
      (error) => {
        setLoading(false);
        toast.error("Failed to update personal details");
      }
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-lg text-gray-900">Personal Details</h2>
          <p className="text-xs text-gray-600">
            Basic contact details and professional social profile links.
          </p>
        </div>
      </div>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-700">First Name</label>
            <Input
              required
              name="firstName"
              value={formData?.firstName || ""}
              onChange={handleInputchange}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700">Last Name</label>
            <Input
              required
              name="lastName"
              value={formData?.lastName || ""}
              onChange={handleInputchange}
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label className="text-xs font-medium text-gray-700">Job Title</label>
            <Input
              required
              name="jobTitle"
              value={formData?.jobTitle || ""}
              onChange={handleInputchange}
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label className="text-xs font-medium text-gray-700">Address</label>
            <Input
              required
              name="address"
              value={formData?.address || ""}
              onChange={handleInputchange}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700">Phone</label>
            <Input
              required
              name="phone"
              value={formData?.phone || ""}
              onChange={handleInputchange}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700">Email</label>
            <Input
              required
              name="email"
              value={formData?.email || ""}
              onChange={handleInputchange}
            />
          </div>

          {/* Social Links */}
          <div>
            <label className="text-xs font-medium text-gray-700">LinkedIn URL</label>
            <Input
              name="linkedinUrl"
              placeholder="https://linkedin.com/in/username"
              value={formData?.linkedinUrl || ""}
              onChange={handleInputchange}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700">GitHub URL</label>
            <Input
              name="githubUrl"
              placeholder="https://github.com/username"
              value={formData?.githubUrl || ""}
              onChange={handleInputchange}
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label className="text-xs font-medium text-gray-700">Portfolio Website</label>
            <Input
              name="portfolioUrl"
              placeholder="https://myportfolio.com"
              value={formData?.portfolioUrl || ""}
              onChange={handleInputchange}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            disabled={loading}
            type="submit"
            className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs font-medium rounded-full px-6 py-2 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : "Save Personal Details"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;