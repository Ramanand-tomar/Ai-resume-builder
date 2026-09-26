import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import GlobalAPI from "@/API_Services/GlobalAPI";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddResume = () => {
  const navigate = useNavigate();
  const [ResumeTile, setResumeTitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    if (!ResumeTile) return;
    setLoading(true);
    const uuid = crypto.randomUUID();
    const data = {
      data: {
        title: ResumeTile,
        resumeID: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress || "user@example.com",
        userName: user?.fullName || "User",
      },
    };

    try {
      const res = await GlobalAPI.CreateNewResume(data);
      setLoading(false);
      setOpenDialog(false);
      const docId =
        res?.data?.data?.documentId ||
        res?.data?.data?.resumeID ||
        res?.data?.data?.id ||
        uuid;
      toast.success("Resume created successfully!");
      navigate(`/dashboard/resume/${docId}/edit`);
    } catch (err) {
      console.error("Error creating resume:", err);
      toast.error("Failed to create resume");
      setLoading(false);
      setOpenDialog(false);
    }
  };

  return (
    <div>
      <div
        onClick={() => setOpenDialog(true)}
        className="p-14 py-24 border border-dashed border-gray-300 items-center flex flex-col justify-center bg-white rounded-2xl h-[280px] hover:scale-[1.02] transition-all hover:shadow-md cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-gray-900 group-hover:text-white transition-colors">
          <PlusSquare className="w-6 h-6" />
        </div>
        <span className="text-sm font-medium text-gray-700 mt-3 group-hover:text-gray-900">
          Create New Resume
        </span>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white p-6 rounded-2xl border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Create New Resume
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-sm mt-1">
              Add a title for your new resume
            </DialogDescription>
          </DialogHeader>

          <div className="my-4">
            <Input
              onChange={(e) => setResumeTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && ResumeTile && !loading) {
                  onCreate();
                }
              }}
              className="bg-white border-gray-300 focus:border-gray-900 focus:bg-white text-gray-900 focus:ring-2 focus:ring-gray-900/20"
              placeholder="Ex. Full Stack Developer Resume"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setOpenDialog(false)}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={!ResumeTile || loading}
              onClick={onCreate}
              className="px-6 py-2 text-sm font-medium text-white bg-[#F26522] hover:bg-[#e05a1a] rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
