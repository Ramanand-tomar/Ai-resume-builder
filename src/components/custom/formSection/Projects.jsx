import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalAPI from "@/API_Services/GlobalAPI";
import { useParams } from "react-router-dom";
import { LoaderCircle, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Projects = ({ enableNext }) => {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [projectList, setProjectList] = useState([
    {
      title: "",
      techStack: "",
      link: "",
      description: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.projects && resumeInfo.projects.length > 0) {
      setProjectList(resumeInfo.projects);
    }
  }, []);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updated = [...projectList];
    updated[index][name] = value;
    setProjectList(updated);
    setResumeInfo({
      ...resumeInfo,
      projects: updated,
    });
  };

  const addNewProject = () => {
    setProjectList([
      ...projectList,
      {
        title: "",
        techStack: "",
        link: "",
        description: "",
      },
    ]);
  };

  const removeProject = (index) => {
    const updated = projectList.filter((_, i) => i !== index);
    setProjectList(updated);
    setResumeInfo({
      ...resumeInfo,
      projects: updated,
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        projects: projectList,
      },
    };

    GlobalAPI.UpdatreResumeDetails(params?.resumeID, data).then(
      (res) => {
        setLoading(false);
        enableNext(true);
        toast.success("Projects updated successfully!");
      },
      (err) => {
        setLoading(false);
        toast.error("Failed to update projects");
      }
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-lg text-gray-900">Key Projects</h2>
          <p className="text-xs text-gray-600">
            Showcase your best projects, tech stacks, and live links.
          </p>
        </div>
        <button
          type="button"
          onClick={addNewProject}
          className="bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-medium rounded-full px-3.5 py-1.5 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Project
        </button>
      </div>

      <form onSubmit={onSave} className="space-y-4">
        {projectList.map((item, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 space-y-3 relative group"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-700">
                Project #{index + 1}
              </span>
              {projectList.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-700">Project Title</label>
                <Input
                  name="title"
                  value={item.title}
                  placeholder="e.g. AI Resume Builder"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700">Tech Stack</label>
                <Input
                  name="techStack"
                  value={item.techStack}
                  placeholder="e.g. React, Node.js, Tailwind"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="text-xs font-medium text-gray-700">Project / Demo Link</label>
                <Input
                  name="link"
                  value={item.link}
                  placeholder="https://github.com/username/project"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="text-xs font-medium text-gray-700">Description & Key Highlights</label>
                <Textarea
                  name="description"
                  value={item.description}
                  rows={3}
                  placeholder="• Architected full-stack application with real-time rendering&#10;• Achieved 98% ATS compliance rating"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs font-medium rounded-full px-6 py-2 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : "Save Projects"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Projects;
