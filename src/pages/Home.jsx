import React, { useState, useEffect } from "react";
import { ArrowRight, Clock, Menu, X, Sparkles, FileText, CheckCircle2, Zap } from "lucide-react";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [londonTime, setLondonTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const timeStr = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setLondonTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#EFEFEF] font-sans antialiased text-gray-900 selection:bg-[#F26522] selection:text-white">
      {/* SECTION 1: HERO (Full viewport height) */}
      <section className="relative h-screen min-h-[680px] max-h-[1080px] flex flex-col justify-between overflow-hidden bg-[#EFEFEF]">
        {/* Shader Background Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Shader className="w-full h-full">
            <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
            <ChromaFlow
              baseColor="#ffffff"
              downColor="#ff5f03"
              leftColor="#ff5f03"
              rightColor="#ff5f03"
              upColor="#ff5f03"
              momentum={13}
              radius={3.5}
            />
            <FlutedGlass
              aberration={0.61}
              angle={31}
              frequency={8}
              highlight={0.12}
              highlightSoftness={0}
              lightAngle={-90}
              refraction={4}
              shape="rounded"
              softness={1}
              speed={0.15}
            />
            <FilmGrain strength={0.05} />
          </Shader>
        </div>

        {/* Navigation Bar */}
        <header className="relative z-20 w-full max-w-[1440px] mx-auto p-2 sm:p-3">
          <div className="bg-white rounded-full p-[5px] flex items-center justify-between shadow-sm">
            {/* LEFT */}
            <div className="flex items-center gap-6 pl-1">
              <Link to="/" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-900 rounded-full flex items-center justify-center text-white text-[10px] sm:text-[11px] font-bold tracking-tight shrink-0">
                AX
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-[14px] text-gray-900 font-medium">
                <a href="#features" className="hover:text-gray-500 transition-colors duration-300">
                  AI Features
                </a>
                <a href="#about" className="hover:text-gray-500 transition-colors duration-300">
                  How It Works
                </a>
                <a href="#demos" className="hover:text-gray-500 transition-colors duration-300">
                  Templates
                </a>
                <Link to="/dashboard" className="hover:text-gray-500 transition-colors duration-300">
                  Dashboard
                </Link>
              </nav>
            </div>

            {/* RIGHT */}
            <div className="hidden md:flex items-center gap-5 lg:gap-6 pr-1">
              <span className="text-[13px] text-gray-600 hidden lg:block font-medium">
                Optimized for Q1 2026 hiring
              </span>
              <div className="flex items-center gap-1.5 text-[13px] text-gray-600 font-medium">
                <Clock className="w-3.5 h-3.5 text-gray-600" />
                <span>{londonTime || "10:12"} in London</span>
              </div>
              <button 
                onClick={() => navigate("/dashboard")}
                className="bg-gray-900 text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 group flex items-center gap-3 cursor-pointer"
              >
                <div className="h-[20px] overflow-hidden">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                    <span className="h-[20px] flex items-center">Create resume now</span>
                    <span className="h-[20px] flex items-center">Create resume now</span>
                  </div>
                </div>
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-900 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
                </div>
              </button>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden bg-gray-900 text-white rounded-full p-2.5 flex items-center justify-center cursor-pointer mr-1"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 transition-opacity duration-300">
            <div className="bg-white rounded-2xl mx-3 mb-3 p-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-1.5 text-[13px] text-gray-600 font-medium bg-gray-100 rounded-full px-3 py-1">
                  <Clock className="w-3.5 h-3.5 text-gray-600" />
                  <span>{londonTime || "10:12"} in London</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 mb-8">
                <a
                  href="#features"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[28px] sm:text-[32px] font-medium text-gray-900 border-b border-gray-100 pb-3"
                >
                  AI Features
                </a>
                <a
                  href="#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[28px] sm:text-[32px] font-medium text-gray-900 border-b border-gray-100 pb-3"
                >
                  How It Works
                </a>
                <a
                  href="#demos"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[28px] sm:text-[32px] font-medium text-gray-900 border-b border-gray-100 pb-3"
                >
                  Templates
                </a>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[28px] sm:text-[32px] font-medium text-gray-900 pb-2"
                >
                  Dashboard
                </Link>
              </nav>

              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/dashboard");
                }}
                className="w-full bg-[#F26522] text-white rounded-full py-3 px-6 flex items-center justify-between font-medium text-base"
              >
                <span>Build your resume</span>
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-[#F26522] -rotate-45" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Hero Content */}
        <div className="flex-1 flex flex-col justify-end max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20 relative z-20 pointer-events-auto">
          <p className="text-[13px] sm:text-[14px] text-gray-900 tracking-wide font-medium mb-5 sm:mb-8 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F26522]" />
            <span>AI Resume Builder • Axion Engine</span>
          </p>

          <h1 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 max-w-5xl">
            We craft AI-powered resumes <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>for professionals ready to dominate <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>their category online.
          </h1>

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            {/* Orange Button */}
            <button 
              onClick={() => navigate("/dashboard")}
              className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 group inline-flex items-center gap-3 transition-colors duration-300 cursor-pointer"
            >
              <div className="h-[20px] overflow-hidden">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                  <span className="h-[20px] flex items-center">Build your resume</span>
                  <span className="h-[20px] flex items-center">Build your resume</span>
                </div>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
              </div>
            </button>

            {/* Partner Badge */}
            <div className="bg-white text-gray-900 rounded-[4px] px-3.5 py-2 flex items-center gap-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-300 cursor-pointer">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#E8704E] shrink-0"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
              </svg>
              <span className="text-[13px] sm:text-[14px] font-medium text-gray-900">
                ATS-Optimized Partner
              </span>
              <span className="text-[10px] sm:text-[11px] bg-gray-900 text-white px-1.5 sm:px-2 py-0.5 rounded font-medium ml-1">
                Featured
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT / HOW IT WORKS (White background) */}
      <section id="about" className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          {/* Badge row */}
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center shrink-0">
              1
            </div>
            <span className="text-[12px] sm:text-[13px] font-medium border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-gray-900">
              Introducing AI Engine
            </span>
          </div>

          {/* Heading h2 */}
          <h2 className="px-5 sm:px-8 lg:px-12 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 lg:mb-28">
            Strategy-led AI formatting, delivering <br className="hidden sm:block" />
            3x more interview callbacks.
          </h2>

          {/* Content Area */}
          {/* MOBILE/TABLET (lg:hidden) */}
          <div className="lg:hidden px-5 sm:px-8 flex flex-col gap-8">
            <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-900 max-w-xl">
              Through deep learning, real-time ATS optimization and intelligent iteration we help ambitious professionals realize their full career potential.
            </p>

            <div>
              <button 
                onClick={() => navigate("/dashboard")}
                className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 group inline-flex items-center gap-3 transition-colors duration-300 cursor-pointer"
              >
                <div className="h-[20px] overflow-hidden">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                    <span className="h-[20px] flex items-center">Explore AI Features</span>
                    <span className="h-[20px] flex items-center">Explore AI Features</span>
                  </div>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shrink-0">
                  <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
                </div>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-4">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85"
                alt="AI Resume Builder Interface"
                className="sm:w-[45%] aspect-[438/346] rounded-xl sm:rounded-2xl object-cover w-full shadow-sm"
              />
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85"
                alt="AI Resume Builder Showcase"
                className="sm:w-[55%] aspect-[900/600] rounded-xl sm:rounded-2xl object-cover w-full shadow-sm"
              />
            </div>
          </div>

          {/* DESKTOP (hidden lg:grid) */}
          <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8 px-5 sm:px-8 lg:px-12">
            {/* Left column */}
            <div className="self-end">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85"
                alt="AI Resume Builder Interface"
                className="aspect-[438/346] rounded-2xl object-cover w-full shadow-sm"
              />
            </div>

            {/* Center column */}
            <div className="self-start flex flex-col justify-end items-end pr-2 xl:pr-4">
              <p className="text-[16px] xl:text-[18px] leading-[1.65] font-medium text-gray-900 whitespace-nowrap mb-8 text-left">
                Through deep learning, real-time ATS optimization<br />
                and intelligent iteration we help ambitious professionals<br />
                realize their full career potential.
              </p>

              <button 
                onClick={() => navigate("/dashboard")}
                className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 group inline-flex items-center gap-3 transition-colors duration-300 cursor-pointer"
              >
                <div className="h-[20px] overflow-hidden">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                    <span className="h-[20px] flex items-center">Explore AI Features</span>
                    <span className="h-[20px] flex items-center">Explore AI Features</span>
                  </div>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shrink-0">
                  <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
                </div>
              </button>
            </div>

            {/* Right column */}
            <div className="self-end">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85"
                alt="AI Resume Showcase"
                className="aspect-[3/2] rounded-2xl object-cover w-full shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DEMOS & CAPABILITIES (Light gray background) */}
      <section id="demos" className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-[1440px] mx-auto">
          {/* Badge row */}
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center shrink-0">
              2
            </div>
            <span className="text-[12px] sm:text-[13px] font-medium border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-gray-900">
              Featured AI Technology
            </span>
          </div>

          {/* Heading h2 */}
          <h2 className="px-5 sm:px-8 lg:px-12 text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-10 sm:mb-14 lg:mb-16">
            Our AI capabilities
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 px-5 sm:px-8 lg:px-12">
            {/* Card 1: Narrativ AI Engine */}
            <div onClick={() => navigate("/dashboard")}>
              <div className="aspect-[329/246] rounded-2xl overflow-hidden bg-[#1a1d2e] relative group cursor-pointer shadow-sm">
                <video
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 h-9 w-9 group-hover:w-[148px] bg-white rounded-full flex items-center justify-between px-2.5 transition-all duration-300 ease-in-out overflow-hidden shadow-md">
                  <span className="text-[13px] font-medium text-gray-900 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pl-1">
                    Learn more
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 transition-transform duration-300 -rotate-45 group-hover:rotate-0 text-gray-900 ml-auto"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
              </div>
              <p className="text-[13px] sm:text-[14px] text-gray-600 mt-4 leading-relaxed">
                Winner of AI Career Tool 2025 - instant ATS score analysis & intelligent skill matching engine driving 98% interview success
              </p>
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mt-1">
                Narrativ AI Engine
              </h3>
            </div>

            {/* Card 2: Luminar Resume Suite */}
            <div onClick={() => navigate("/dashboard")}>
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#6b6b6b] relative group cursor-pointer shadow-sm">
                <video
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 h-9 w-9 group-hover:w-[168px] bg-gray-900 rounded-full flex items-center justify-between px-2.5 transition-all duration-300 ease-in-out overflow-hidden shadow-md">
                  <span className="text-[13px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pl-1">
                    Try templates
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white shrink-0 transition-transform duration-300 -rotate-45 group-hover:rotate-0 ml-auto" />
                </div>
              </div>
              <p className="text-[13px] sm:text-[14px] text-gray-600 mt-4 leading-relaxed">
                Transforming standard CVs into conversion-focused executive visual resumes with instant PDF export
              </p>
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mt-1">
                Luminar Resume Suite
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA Section */}
      <footer id="connect" className="bg-gray-900 text-white py-16 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-gray-800 pb-12 mb-8">
          <div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 text-[11px] font-bold tracking-tight mb-4">
              AX
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight">Ready to land your dream role with AI?</h3>
            <p className="text-gray-400 text-sm mt-2">Let's craft your high-impact resume together.</p>
          </div>
          <button 
            onClick={() => navigate("/dashboard")}
            className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-[14px] font-medium rounded-full pl-6 pr-2 py-2.5 group inline-flex items-center gap-3 transition-colors duration-300 cursor-pointer"
          >
            <div className="h-[20px] overflow-hidden">
              <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                <span className="h-[20px] flex items-center">Build your resume now</span>
                <span className="h-[20px] flex items-center">Build your resume now</span>
              </div>
            </div>
            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
            </div>
          </button>
        </div>
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© 2026 AI Resume Builder • Axion Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;