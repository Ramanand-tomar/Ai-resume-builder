import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "@/lib/Gemini_API";
import { toast } from "sonner";

const PROMPT = `Position title: {positionTitle}. 

Generate 3-4 concise bullet points for a resume experience section. 

REQUIREMENTS:
- Return ONLY valid JSON format with this structure: {"bullet_points": ["point 1", "point 2", "point 3"]}
- No HTML, no markdown, no plain text
- Each bullet point should be 1 line maximum
- Focus on achievements and quantifiable results
- Use strong action verbs
- Keep it professional and concise

Example response:
{"bullet_points": ["Managed team of 10 developers delivering projects 15% ahead of schedule", "Increased user engagement by 25% through feature implementation", "Reduced operational costs by 30% by optimizing workflows"]}`;

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue || "");
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      toast.error("Please add a position title first");
      return;
    }

    setLoading(true);

    try {
      const prompt = PROMPT.replace(
        "{positionTitle}",
        resumeInfo.experience[index].title
      );

      const result = await AIChatSession.sendMessage(prompt);
      let resp = await result.response.text();

      // Clean the response - remove any code blocks or extra text
      resp = resp
        .trim()
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      let bulletPoints = [];

      // Parse JSON response
      try {
        const parsed = JSON.parse(resp);
        if (parsed.bullet_points && Array.isArray(parsed.bullet_points)) {
          bulletPoints = parsed.bullet_points;
        } else if (Array.isArray(parsed)) {
          bulletPoints = parsed;
        }
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        // Fallback: try to extract bullet points from text
        const lines = resp
          .split("\n")
          .map((line) => line.trim())
          .filter(
            (line) =>
              line.length > 0 && !line.startsWith("{") && !line.startsWith("}")
          )
          .map((line) => line.replace(/^["']|["']$/g, "").replace(/^-\\s*/, ""))
          .slice(0, 4);

        bulletPoints =
          lines.length > 0
            ? lines
            : [
                "Managed key projects and delivered results on schedule",
                "Collaborated with cross-functional teams to achieve goals",
                "Implemented improvements that enhanced team productivity",
              ];
      }

      // Convert bullet points to rich text format with bullet points
      const richTextContent = bulletPoints
        .map((point) => `• ${point}`)
        .join("\n");

      setValue(richTextContent);
      onRichTextEditorChange({ target: { value: richTextContent } });

      toast.success("AI content generated successfully!");
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditorChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onRichTextEditorChange(e);
  };

  // Function to convert plain text with bullet points to proper HTML list
  const convertTextToHtmlList = (text) => {
    if (!text) return "<ul></ul>";

    const lines = text.split("\n").filter((line) => line.trim().length > 0);
    const listItems = lines.map((line) => {
      // Remove bullet points and clean the text
      const cleanLine = line.replace(/^[•\-]\s*/, "").trim();
      return `<li>${cleanLine}</li>`;
    });

    return `<ul>${listItems.join("")}</ul>`;
  };

  return (
    <div className="">
      <div className="flex justify-between items-center m-4">
        <label className="text-sm font-medium">Experience Summary</label>
        <Button
          type="button"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 items-center"
        >
          {loading ? (
            <LoaderCircle className="animate-spin h-4 w-4" />
          ) : (
            <Brain className="h-4 w-4" />
          )}
          {loading ? "Generating..." : "AI Generate"}
        </Button>
      </div>

      {/* <EditorProvider>
        <Editor
          value={value}
          onChange={handleEditorChange}
          className="flex justify-center items-center  border border-muted-foreground rounded-md p-2"
        >
          <Toolbar className="">
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider> */}
      <EditorProvider>
        <Editor
          value={value}
          onChange={handleEditorChange}
          placeholder="Write or generate 3-4 bullet points describing your achievements. Use bullet points (•) for each item."
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>

      <p className="text-xs text-muted-foreground">
        Write or generate 3-4 bullet points describing your achievements. Use
        bullet points (•) for each item.
      </p>
    </div>
  );
}

// Helper function to convert editor content to HTML for display/export
export const convertEditorContentToHTML = (content) => {
  if (!content) return "<ul></ul>";

  // If content already has HTML tags, return as is
  if (content.includes("<ul>") || content.includes("<li>")) {
    return content;
  }

  // Convert plain text with bullet points to HTML
  const lines = content.split("\n").filter((line) => line.trim().length > 0);
  const listItems = lines.map((line) => {
    const cleanLine = line.replace(/^[•\-]\s*/, "").trim();
    return `<li>${cleanLine}</li>`;
  });

  return `<ul>${listItems.join("")}</ul>`;
};

export default RichTextEditor;
