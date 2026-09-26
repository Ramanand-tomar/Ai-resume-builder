import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LayoutGrid, Check } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "@/API_Services/GlobalAPI";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function ThemeColor() {
  const colors = [
    { name: "Axion Orange", hex: "#F26522" },
    { name: "Deep Indigo", hex: "#1E293B" },
    { name: "Royal Blue", hex: "#2563EB" },
    { name: "Emerald Green", hex: "#059669" },
    { name: "Crimson Rose", hex: "#E11D48" },
    { name: "Violet Purple", hex: "#7C3AED" },
    { name: "Amber Gold", hex: "#D97706" },
    { name: "Teal Cyan", hex: "#0D9488" },
    { name: "Dark Charcoal", hex: "#334155" },
    { name: "Sky Blue", hex: "#0284C7" },
  ];

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState(
    resumeInfo?.themeColor || "#F26522"
  );
  const { resumeID } = useParams();

  const onColorChange = (color) => {
    setSelectedColor(color);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });
  };

  const onSaveColorSelect = (color) => {
    const targetColor = color || selectedColor;
    setSelectedColor(targetColor);
    setResumeInfo({
      ...resumeInfo,
      themeColor: targetColor,
    });
    const data = {
      data: {
        themeColor: targetColor,
      },
    };
    GlobalApi.UpdatreResumeDetails(resumeID, data).then(
      (resp) => {
        toast.success("Theme Color Updated Successfully");
      },
      (error) => {
        console.error("Theme color update error:", error);
        toast.error("Theme color saved locally");
      }
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 bg-white text-gray-900 border border-gray-200/90 hover:bg-gray-50 text-xs sm:text-sm font-medium rounded-full px-4 py-2 transition-all shadow-2xs cursor-pointer">
          <div
            className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
            style={{ backgroundColor: selectedColor || resumeInfo?.themeColor || "#F26522" }}
          />
          <LayoutGrid className="w-4 h-4 text-gray-600" />
          <span>Theme Color</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="bg-white text-gray-900 border border-gray-200 shadow-2xl rounded-2xl p-5 z-50 w-72">
        <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
          <h2 className="text-sm font-semibold text-gray-900">Theme Color</h2>
          <span className="text-[11px] text-gray-500 font-medium">Executive Palettes</span>
        </div>
        
        <p className="text-xs text-gray-500 mb-4">
          Select an accent color for your resume headers and borders.
        </p>

        <div className="grid grid-cols-5 gap-3 mb-5">
          {colors.map((item, index) => {
            const isSelected = (selectedColor || resumeInfo?.themeColor) === item.hex;
            return (
              <button
                key={index}
                title={item.name}
                onClick={() => onColorChange(item.hex)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer relative ${
                  isSelected
                    ? "ring-2 ring-gray-900 ring-offset-2 scale-105"
                    : "hover:scale-105 opacity-90 hover:opacity-100"
                }`}
                style={{ backgroundColor: item.hex }}
              >
                {isSelected && <Check className="w-4 h-4 text-white drop-shadow-xs" />}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end pt-2 border-t border-gray-100">
          <button
            onClick={() => onSaveColorSelect(selectedColor)}
            className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium rounded-full px-5 py-2 transition-colors cursor-pointer"
          >
            Apply & Save
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;