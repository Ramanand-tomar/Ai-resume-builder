import axios from "axios";
import dummyData from "@/dummy/data";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Helper for local storage persistence fallback
const STORAGE_KEY = "ai_resume_builder_resumes";

const getLocalResumes = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn("LocalStorage error:", e);
    return [];
  }
};

const saveLocalResumes = (resumes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
  } catch (e) {
    console.warn("LocalStorage save error:", e);
  }
};

const CreateNewResume = async (data) => {
  try {
    const response = await axiosClient.post("/user-resumes", data);
    return response;
  } catch (err) {
    console.warn("Backend API unavailable, using local storage fallback:", err.message);
    const localResumes = getLocalResumes();
    const resumeData = data.data || data;
    const docId = resumeData.resumeID || crypto.randomUUID();
    const newResume = {
      id: docId,
      documentId: docId,
      resumeID: docId,
      title: resumeData.title || "Untitled Resume",
      userEmail: resumeData.userEmail || "",
      userName: resumeData.userName || "",
      themeColor: "#F26522",
      ...dummyData,
      ...resumeData,
    };
    localResumes.unshift(newResume);
    saveLocalResumes(localResumes);
    return { data: { data: newResume } };
  }
};

const GetResumes = async (userEmail) => {
  try {
    const response = await axiosClient.get(
      "/user-resumes?filters[userEmail][$eq]=" + userEmail
    );
    return response;
  } catch (err) {
    console.warn("Backend API unavailable, fetching resumes from local storage:", err.message);
    const localResumes = getLocalResumes();
    const filtered = userEmail
      ? localResumes.filter(
          (r) => r.userEmail === userEmail || !r.userEmail
        )
      : localResumes;
    return { data: { data: filtered } };
  }
};

const GetResumeById = async (id) => {
  try {
    const response = await axiosClient.get("/user-resumes/" + id + "?populate=*");
    return response;
  } catch (err) {
    console.warn("Backend API unavailable, loading resume by ID from local storage:", err.message);
    const localResumes = getLocalResumes();
    const found = localResumes.find(
      (r) => r.documentId === id || r.resumeID === id || String(r.id) === String(id)
    );
    if (found) {
      return { data: { data: found } };
    }
    // Fallback if resume ID is newly generated or not in array yet
    const fallbackResume = {
      id: id,
      documentId: id,
      resumeID: id,
      title: "My AI Resume",
      themeColor: "#F26522",
      ...dummyData,
    };
    return { data: { data: fallbackResume } };
  }
};

const UpdatreResumeDetails = async (id, data) => {
  try {
    const response = await axiosClient.put("/user-resumes/" + id, data);
    return response;
  } catch (err) {
    console.warn("Backend API unavailable, updating resume in local storage:", err.message);
    const localResumes = getLocalResumes();
    const index = localResumes.findIndex(
      (r) => r.documentId === id || r.resumeID === id || String(r.id) === String(id)
    );
    const payload = data.data || data;
    if (index !== -1) {
      localResumes[index] = { ...localResumes[index], ...payload };
      saveLocalResumes(localResumes);
      return { data: { data: localResumes[index] } };
    } else {
      const updated = { id, documentId: id, resumeID: id, ...dummyData, ...payload };
      localResumes.push(updated);
      saveLocalResumes(localResumes);
      return { data: { data: updated } };
    }
  }
};

const DeleteResumeById = async (id) => {
  try {
    const response = await axiosClient.delete("/user-resumes/" + id);
    return response;
  } catch (err) {
    console.warn("Backend API unavailable, deleting resume from local storage:", err.message);
    const localResumes = getLocalResumes();
    const filtered = localResumes.filter(
      (r) => r.documentId !== id && r.resumeID !== id && String(r.id) !== String(id)
    );
    saveLocalResumes(filtered);
    return { data: { data: id } };
  }
};

export default {
  CreateNewResume,
  GetResumes,
  UpdatreResumeDetails,
  GetResumeById,
  DeleteResumeById,
};
