"use client";

import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip
} from "recharts";

// ---------- Shared helpers (refactored out of duplicated inline logic) ----------

type ScoreStyle = {
  text: string;
  bg: string;
  border: string;
  gradient: string;
  label: string;
};

function getScoreStyle(value: number): ScoreStyle {
  if (value >= 8) {
    return {
      text: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      gradient: "from-green-400 to-emerald-500",
      label: "Excellent"
    };
  }

  if (value >= 5) {
    return {
      text: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      gradient: "from-yellow-400 to-orange-500",
      label: "Good"
    };
  }

  return {
    text: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    gradient: "from-red-400 to-rose-500",
    label: "Needs Improvement"
  };
}

function getRelativeDate(dateString: string) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Unknown date";

  const now = new Date();

  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  const diffDays = Math.round(
    (startOfDay(now) - startOfDay(date)) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays > 1 && diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export default function Home() {

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [paperLanguage, setPaperLanguage] = useState("English");
  const [feedbackLanguage, setFeedbackLanguage] = useState("English");

  const [judgePersona, setJudgePersona] = useState("ISEF Judge");

  const [loadingStep, setLoadingStep] = useState(0);

  // History dashboard controls
  const [historySearch, setHistorySearch] = useState("");
  const [historySort, setHistorySort] = useState<
    "newest" | "oldest" | "highest" | "lowest"
  >("newest");

  useEffect(() => {

    const savedResult = localStorage.getItem("scijudge_report");
  
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  
  }, []);
  
  useEffect(() => {
  
    const savedHistory = localStorage.getItem("scijudge_history");
  
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  
  }, []);
  
  useEffect(() => {
  
    if (result) {
  
      localStorage.setItem(
        "scijudge_report",
        JSON.stringify(result)
      );
  
    }
  
  }, [result]);

  const loadingMessages = [

    "Initializing AI Judges...",

    "Analyzing Innovation...",

    "Reviewing Methodology...",

    "Evaluating Scientific Impact...",

    "Generating Final Verdict..."

  ];

  const isArabic = feedbackLanguage === "Arabic";
  const isFrench = feedbackLanguage === "French";

  const text = {

    overall:
      isArabic ? "التقييم العام"
      : isFrench ? "Score Global"
      : "Overall Score",

    innovation:
      isArabic ? "الابتكار"
      : isFrench ? "Innovation"
      : "Innovation",

    methodology:
      isArabic ? "المنهجية"
      : isFrench ? "Méthodologie"
      : "Methodology",

    impact:
      isArabic ? "التأثير"
      : isFrench ? "Impact"
      : "Impact",

    clarity:
      isArabic ? "الوضوح"
      : isFrench ? "Clarté"
      : "Clarity",

    strengths:
      isArabic ? "نقاط القوة"
      : isFrench ? "Points Forts"
      : "Strengths",

    weaknesses:
      isArabic ? "نقاط الضعف"
      : isFrench ? "Faiblesses"
      : "Weaknesses",

    questions:
      isArabic ? "أسئلة المحكمين"
      : isFrench ? "Questions des Juges"
      : "Judge Questions",

    verdict:
      isArabic ? "الحكم النهائي"
      : isFrench ? "Verdict Final"
      : "Final Verdict",

    paper:
      isArabic ? "البحث العلمي"
      : isFrench ? "Document de Recherche"
      : "Research Paper",

    upload:
      isArabic ? "ارفع البحث العلمي"
      : isFrench ? "Télécharger la Recherche"
      : "Upload Research Paper",

    analyzing:
      isArabic ? "جاري التحليل..."
      : isFrench ? "Analyse en cours..."
      : "Analyzing..."
  };

  const radarData = result?.analysis
    ? [
        {
          subject: text.innovation,
          value: result.analysis.innovation_score
        },
        {
          subject: text.methodology,
          value: result.analysis.methodology_score
        },
        {
          subject: text.impact,
          value: result.analysis.impact_score
        },
        {
          subject: text.clarity,
          value: result.analysis.clarity_score
        }
      ]
    : [];

  const downloadPDF = (reportToDownload: any) => {

    if (!reportToDownload?.analysis) return;

    const pdf = new jsPDF("p", "mm", "a4");

    const pageHeight = 280;

    let y = 20;

    const addTextBlock = (
      title: string,
      content: string[]
    ) => {

      pdf.setFontSize(18);
      pdf.text(title, 20, y);

      y += 10;

      pdf.setFontSize(12);

      content.forEach((item) => {

        const lines = pdf.splitTextToSize(
          `• ${item}`,
          170
        );

        if (y + lines.length * 7 > pageHeight) {

          pdf.addPage();

          y = 20;

        }

        pdf.text(lines, 20, y);

        y += lines.length * 7 + 4;

      });

      y += 10;
    };

    pdf.setFontSize(24);
    pdf.text("SCIJUDGE AI REPORT", 20, y);

    y += 20;

    pdf.setFontSize(16);

    const scores = [
      `Overall Score: ${reportToDownload.analysis.overall_score}`,
      `Innovation: ${reportToDownload.analysis.innovation_score}`,
      `Methodology: ${reportToDownload.analysis.methodology_score}`,
      `Impact: ${reportToDownload.analysis.impact_score}`,
      `Clarity: ${reportToDownload.analysis.clarity_score}`
    ];

    scores.forEach((score) => {

      if (y > pageHeight) {

        pdf.addPage();

        y = 20;

      }

      pdf.text(score, 20, y);

      y += 10;

    });

    y += 10;

    addTextBlock(
      "Strengths",
      reportToDownload.analysis.strengths
    );

    addTextBlock(
      "Weaknesses",
      reportToDownload.analysis.weaknesses
    );

    addTextBlock(
      "Judge Questions",
      reportToDownload.analysis.judge_questions
    );

    pdf.setFontSize(18);

    if (y > pageHeight - 40) {

      pdf.addPage();

      y = 20;

    }

    pdf.text("Final Verdict", 20, y);

    y += 10;

    pdf.setFontSize(12);

    const verdictLines = pdf.splitTextToSize(
      reportToDownload.analysis.final_verdict,
      170
    );

    pdf.text(verdictLines, 20, y);

    const baseName = (reportToDownload.filename || "SciJudge_Report")
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]+/g, "_");

    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-");

    pdf.save(`${baseName}_${timestamp}.pdf`);
  };

  const handleUpload = async (file: File) => {

    setLoading(true);

    setLoadingStep(0);

    const interval = setInterval(() => {

      setLoadingStep((prev) => {

        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        }

        return prev;

      });

    }, 1400);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("paper_language", paperLanguage);
    formData.append("feedback_language", feedbackLanguage);
    formData.append("judge_persona", judgePersona);

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setResult(data);
      const updatedHistory = [

        {
          ...data,
          savedAt: new Date().toISOString()
        },
      
        ...history
      
      ];
      
      setHistory(updatedHistory);
      
      localStorage.setItem(
        "scijudge_history",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {

      console.error(error);

    }

    clearInterval(interval);

    setLoading(false);
  };
  const trendData = [
    {
      name: "Innovation",
      score: result?.analysis?.innovation_score || 0
    },
    {
      name: "Methodology",
      score: result?.analysis?.methodology_score || 0
    },
    {
      name: "Impact",
      score: result?.analysis?.impact_score || 0
    },
    {
      name: "Clarity",
      score: result?.analysis?.clarity_score || 0
    }
  ];

  // ---------- History dashboard derived data ----------

  const historyOverallScores: number[] = history
    .map((r) => r?.analysis?.overall_score)
    .filter((v) => typeof v === "number");

  const totalReports = history.length;

  const avgScore =
    historyOverallScores.length > 0
      ? (
          historyOverallScores.reduce((a, b) => a + b, 0) /
          historyOverallScores.length
        ).toFixed(1)
      : "N/A";

  const highestScore =
    historyOverallScores.length > 0
      ? Math.max(...historyOverallScores)
      : "N/A";

  const lowestScore =
    historyOverallScores.length > 0
      ? Math.min(...historyOverallScores)
      : "N/A";

  const filteredHistory = history.filter((report) =>
    (report.filename || "")
      .toLowerCase()
      .includes(historySearch.toLowerCase())
  );

  const sortedHistory = [...filteredHistory].sort((a, b) => {

    const scoreA = a?.analysis?.overall_score ?? 0;
    const scoreB = b?.analysis?.overall_score ?? 0;

    switch (historySort) {
      case "oldest":
        return (
          new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime()
        );
      case "highest":
        return scoreB - scoreA;
      case "lowest":
        return scoreA - scoreB;
      default:
        return (
          new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
        );
    }

  });

  const deleteReport = (savedAt: string) => {

    const filtered = history.filter((r) => r.savedAt !== savedAt);

    setHistory(filtered);

    localStorage.setItem(
      "scijudge_history",
      JSON.stringify(filtered)
    );

  };

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a22,transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#7c3aed22,transparent_40%)]" />

      {/* Animated Glow Orbs */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity
        }}
        className="absolute top-40 left-20 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"
      />

      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full"
      />
{/* Floating Particles */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">

  {[
    { left: "10%", top: "20%" },
    { left: "25%", top: "70%" },
    { left: "40%", top: "35%" },
    { left: "60%", top: "80%" },
    { left: "75%", top: "25%" },
    { left: "85%", top: "60%" }
  ].map((particle, i) => (

    <motion.div
      key={i}
      animate={{
        y: [0, -100],
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: 6 + i,
        repeat: Infinity
      }}
      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
      style={{
        left: particle.left,
        top: particle.top
      }}
    />

  ))}

</div>
      {/* Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 flex flex-col items-center px-6 py-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >

          {/* Badge */}
          <div className="mb-6 border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 rounded-full text-cyan-300 text-sm backdrop-blur-md shadow-lg shadow-cyan-500/10 inline-block">
            AI Scientific Evaluation System
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight mb-6 bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent">
            SCIJUDGE
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-zinc-400 text-lg md:text-xl leading-relaxed mb-10">
            Upload your research paper.
            Face AI judges trained to evaluate innovation,
            methodology, scientific impact, and presentation quality.
          </p>

          {/* Language Settings */}
          <div className="grid md:grid-cols-2 gap-6 mb-10 w-full max-w-2xl">

            {/* Paper Language */}
            <motion.div
              whileHover={{
                y: -10,
                scale: 1.02
              }}
              className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-xl text-left hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all duration-500"
            >

              <p className="text-cyan-300 text-sm mb-2">
                Research Paper Language
              </p>

              <p className="text-zinc-400 text-sm mb-4">
                Select the original language of your uploaded research paper.
              </p>

              <select
                value={paperLanguage}
                onChange={(e) => {
                  setPaperLanguage(e.target.value);
                  setResult(null);
                }}
                className="w-full bg-black/40 border border-cyan-500/20 rounded-2xl px-5 py-3 text-white outline-none"
              >
                <option>English</option>
                <option>Arabic</option>
                <option>French</option>
              </select>

            </motion.div>

            {/* Feedback Language */}
            <motion.div
              whileHover={{
                y: -10,
                scale: 1.02
              }}
              className="rounded-3xl border border-purple-500/20 bg-white/5 p-6 backdrop-blur-xl text-left hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] transition-all duration-500"
            >

              <p className="text-purple-300 text-sm mb-2">
                AI Feedback Language
              </p>

              <p className="text-zinc-400 text-sm mb-4">
                Choose the language you want the AI evaluation to appear in.
              </p>

              <select
                value={feedbackLanguage}
                onChange={(e) => {
                  setFeedbackLanguage(e.target.value);
                  setResult(null);
                }}
                className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-3 text-white outline-none"
              >
                <option>English</option>
                <option>Arabic</option>
                <option>French</option>
              </select>

            </motion.div>

          </div>

          {/* Judge Persona */}
          <motion.div
            whileHover={{
              y: -10,
              scale: 1.02
            }}
            className="w-full max-w-2xl mb-10"
          >

            <div className="rounded-3xl border border-yellow-500/20 bg-white/5 p-6 backdrop-blur-xl text-left hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500">

              <p className="text-yellow-300 text-sm mb-2">
                AI Judge Persona
              </p>

              <p className="text-zinc-400 text-sm mb-4">
                Choose how the AI judge should evaluate your research paper.
              </p>

              <select
                value={judgePersona}
                onChange={(e) => {
                  setJudgePersona(e.target.value);
                  setResult(null);
                }}
                className="w-full bg-black/40 border border-yellow-500/20 rounded-2xl px-5 py-3 text-white outline-none"
              >
                <option>ISEF Judge</option>
                <option>MIT Professor</option>
                <option>Harsh Reviewer</option>
                <option>Supportive Mentor</option>
              </select>

            </div>

          </motion.div>

          {/* Upload */}
          <label>
            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: -1,
                boxShadow: "0px 0px 40px rgba(34,211,238,0.5)"
              }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-6 md:px-8 py-4 text-base md:text-lgfont-medium transition-all duration-300 hover:bg-cyan-500/20 shadow-lg shadow-cyan-500/20 cursor-pointer inline-block"
            >
<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-400/20 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative z-10">
                {loading ? text.analyzing : text.upload}
              </span>

            </motion.div>

            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {

                const file = e.target.files?.[0];

                if (file) {
                  handleUpload(file);
                }

                e.target.value = "";

              }}
            />
          </label>

{/* AI Thinking Screen */}
{loading && (

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
>

  <div className="w-full max-w-xl rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl p-8 shadow-2xl shadow-cyan-500/10">

    <div className="flex items-center gap-4 mb-6">

      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear"
        }}
        className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full"
      />

      <h3 className="text-2xl font-bold text-cyan-300">
        AI Judges Working...
      </h3>

    </div>

    <motion.p
      key={loadingStep}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-zinc-300 text-lg"
    >
      {loadingMessages[loadingStep]}
    </motion.p>

    <div className="mt-6 h-2 rounded-full bg-white/10 overflow-hidden">

      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: `${((loadingStep + 1) / loadingMessages.length) * 100}%`
        }}
        transition={{
          duration: 0.8
        }}
        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
      />

    </div>

  </div>

</motion.div>

)}

        </motion.div>
        {!result && !loading && (

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="mt-20 text-center"
>

  <div className="w-24 h-24 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-4xl mb-6">
    📄
  </div>

  <h3 className="text-2xl font-bold text-white mb-3">
    No Research Uploaded Yet
  </h3>

  <p className="text-zinc-500 max-w-md">
    Upload your scientific paper and receive a complete AI-powered evaluation report instantly.
  </p>

</motion.div>

)}
   {/* History Section */}
{history.length > 0 && (

<div className="w-full max-w-6xl mb-10">

  <div className="flex items-center justify-between mb-6 flex-wrap gap-4">

    <h2 className="text-3xl font-black text-white">
      Previous Reports
    </h2>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => {

        localStorage.removeItem("scijudge_history");

        setHistory([]);

      }}
      className="px-5 py-3 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-300 font-semibold"
    >
      Clear History
    </motion.button>

  </div>

  {/* Stats Overview */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">

    {[
      { label: "Total Reports", value: totalReports, color: "text-white" },
      { label: "Average Score", value: avgScore, color: "text-cyan-300" },
      { label: "Highest Score", value: highestScore, color: "text-green-400" },
      { label: "Lowest Score", value: lowestScore, color: "text-red-400" }
    ].map((stat, index) => (

      <motion.div
        key={stat.label}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        whileHover={{ y: -6, scale: 1.02 }}
        className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6 backdrop-blur-xl"
      >

        <p className="text-zinc-400 text-xs md:text-sm mb-2 uppercase tracking-wide">
          {stat.label}
        </p>

        <h3 className={`text-2xl md:text-4xl font-black ${stat.color}`}>
          {stat.value}
        </h3>

      </motion.div>

    ))}

  </div>

  {/* Search + Sort Controls */}
  <div className="flex flex-col md:flex-row gap-4 mb-8">

    <div className="relative flex-1">

      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500">
        🔍
      </span>

      <input
        type="text"
        value={historySearch}
        onChange={(e) => setHistorySearch(e.target.value)}
        placeholder="Search reports by filename..."
        className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-5 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-cyan-500/40 transition-colors"
      />

    </div>

    <select
      value={historySort}
      onChange={(e) => setHistorySort(e.target.value as typeof historySort)}
      className="bg-black/40 border border-white/10 rounded-2xl px-5 py-3 text-white outline-none focus:border-cyan-500/40 transition-colors md:w-56"
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="highest">Highest Score</option>
      <option value="lowest">Lowest Score</option>
    </select>

  </div>

  {/* Empty search state */}
  {sortedHistory.length === 0 ? (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl py-16 px-6 text-center"
    >

      <div className="w-20 h-20 mx-auto rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-3xl mb-5">
        🔎
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        No reports match "{historySearch}"
      </h3>

      <p className="text-zinc-500 max-w-sm mx-auto mb-6">
        Try a different filename, or clear the search to see all your reports.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setHistorySearch("")}
        className="px-5 py-2.5 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 font-medium"
      >
        Clear Search
      </motion.button>

    </motion.div>

  ) : (

    <div className="grid md:grid-cols-2 gap-6">

      <AnimatePresence>

        {sortedHistory.map((report) => {

          const overall = report?.analysis?.overall_score;
          const innovation = report?.analysis?.innovation_score;

          const overallStyle =
            typeof overall === "number" ? getScoreStyle(overall) : null;

          return (

            <motion.div
              layout
              key={report.savedAt}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{
                y: -8,
                scale: 1.015,
                boxShadow: "0px 0px 40px rgba(34,211,238,0.15)"
              }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6 backdrop-blur-xl"
            >

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-4 min-w-0">

                  <div className="shrink-0 w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xl">
                    📄
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 truncate">
                      {report.filename}
                    </h3>

                    <p className="text-zinc-500 text-sm mb-4">
                      {getRelativeDate(report.savedAt)}
                    </p>

                    <div className="flex gap-2 flex-wrap">

                      <div
                        className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium border ${
                          overallStyle
                            ? `${overallStyle.bg} ${overallStyle.text} ${overallStyle.border}`
                            : "bg-white/5 text-zinc-400 border-white/10"
                        }`}
                      >
                        Overall: {overall ?? "N/A"}
                      </div>

                      <div className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs md:text-sm font-medium">
                        Innovation: {innovation ?? "N/A"}
                      </div>

                    </div>

                  </div>

                </div>

              </div>

              <div className="flex gap-3 mt-5">

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {

                    setResult(report);

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    });

                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-medium"
                >
                  Open
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deleteReport(report.savedAt)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 font-medium"
                >
                  Delete
                </motion.button>

              </div>

            </motion.div>

          );

        })}

      </AnimatePresence>

    </div>

  )}

</div>

)}     {/* RESULTS */}
        {result?.analysis && (

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-6xl mt-20"
          >

            {/* Download Button */}
            <div className="flex justify-center gap-4 flex-wrap mb-10">

              <motion.button
                whileHover={{
                  scale: 1.08,
                  rotate: -1,
                  boxShadow: "0px 0px 40px rgba(34,211,238,0.5)"
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => downloadPDF(result)}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow-lg transition-all duration-300"
              >
                Download AI Report
              </motion.button>
              <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  onClick={() => {

    localStorage.removeItem("scijudge_report");

    setResult(null);

  }}
  className="px-6 py-4 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-300 font-semibold"
>
  Clear Report
</motion.button>
            </div>
{/* Quick Stats */}
<div className="grid md:grid-cols-3 gap-6 mb-10">

  {[
    {
      title: "AI Confidence",
      value: "98%"
    },
    {
      title: "Review Speed",
      value: "12s"
    },
    {
      title: "Evaluation Depth",
      value: "Advanced"
    }
  ].map((item, index) => (

    <motion.div
      key={index}
      whileHover={{
        y: -8,
        scale: 1.03
      }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >

      <p className="text-zinc-400 mb-2">
        {item.title}
      </p>

      <h3 className="text-4xl font-black text-cyan-300">
        {item.value}
      </h3>

    </motion.div>

  ))}

</div>
            {/* Top Card */}
            <div className="rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl p-8 shadow-2xl shadow-cyan-500/10 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all duration-500">

              <div className="flex items-center justify-between flex-wrap gap-6">

                <div>
                  <p className="text-zinc-400 mb-2">
                    {text.paper}
                  </p>

                  <h2 className="text-3xl font-bold text-white">
                    {result.filename}
                  </h2>
                </div>

                <div className="text-center">
                  <p className="text-zinc-400 mb-2">
                    {text.overall}
                  </p>

                  <div className="text-5xl md:text-7xl font-black text-cyan-300">
                    {result.analysis.overall_score}
                  </div>
                </div>

              </div>

            </div>

            {/* Score Cards */}
            <div className="grid md:grid-cols-4 gap-6 mt-8">

              {[
                {
                  title: text.innovation,
                  value: result.analysis.innovation_score
                },
                {
                  title: text.methodology,
                  value: result.analysis.methodology_score
                },
                {
                  title: text.impact,
                  value: result.analysis.impact_score
                },
                {
                  title: text.clarity,
                  value: result.analysis.clarity_score
                }
              ].map((item, index) => {

                const percentage = item.value * 10;

                const style = getScoreStyle(item.value);

                return (

                  <motion.div
                    key={index}
                    whileHover={{
                      y: -10,
                      scale: 1.02
                    }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-lg hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all duration-500"
                  >

                    <p className="text-zinc-400 mb-3">
                      {item.title}
                    </p>

                    <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
                      {item.value}
                    </h3>

                    <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">

                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{
                          duration: 1.2,
                          delay: index * 0.2
                        }}
                        className={`h-full rounded-full bg-gradient-to-r ${style.gradient}`}
                      />

                    </div>

                    <p className="text-sm text-zinc-500 mt-3">
                      {percentage}%
                    </p>

                    <p className={`text-sm mt-2 font-medium ${style.text}`}>
                      {style.label}
                    </p>

                  </motion.div>

                );

              })}

            </div>

            {/* Radar Chart */}
            <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl mt-8 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all duration-500">

              <h3 className="text-3xl font-bold text-cyan-300 mb-8 text-center">
                AI Performance Analysis
              </h3>

              <div className="w-full h-[400px] overflow-x-auto">

                <ResponsiveContainer width="100%" height="100%">

                  <RadarChart data={radarData}>

                    <PolarGrid stroke="#ffffff22" />

                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "#ffffffaa", fontSize: 14 }}
                    />

<Radar
  name="Score"
  dataKey="value"
  stroke="#22d3ee"
  fill="#22d3ee"
  fillOpacity={0.5}
  animationDuration={1500}
/>

                  </RadarChart>

                </ResponsiveContainer>

              </div>

            </div>
{/* Score Trend */}
<div className="rounded-3xl border border-purple-500/20 bg-white/5 p-8 backdrop-blur-xl mt-8">

  <h3 className="text-3xl font-bold text-purple-300 mb-8 text-center">
    Score Trend
  </h3>

  <div className="w-full h-[300px]">

    <ResponsiveContainer width="100%" height="100%">

      <AreaChart data={trendData}>

        <XAxis
          dataKey="name"
          stroke="#ffffff88"
        />

<Tooltip
  contentStyle={{
    backgroundColor: "#09090b",
    border: "1px solid #a855f7",
    borderRadius: "16px",
    color: "white"
  }}
/>
        <Area
          type="monotone"
          dataKey="score"
          stroke="#a855f7"
          fill="#a855f7"
          fillOpacity={0.3}
        />

      </AreaChart>

    </ResponsiveContainer>

  </div>

</div>
            {/* Strengths + Weaknesses */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">

              {/* Strengths */}
              <div className="rounded-3xl border border-green-500/20 bg-green-500/5 p-8 backdrop-blur-xl hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] transition-all duration-500">

                <h3 className="text-3xl font-bold text-green-400 mb-6">
                  {text.strengths}
                </h3>

                <div className="space-y-4">

                  {result.analysis.strengths.map((item: string, index: number) => (

                    <div
                      key={index}
                      className="rounded-2xl bg-black/30 border border-green-500/10 p-4 text-zinc-200"
                    >
                      {item}
                    </div>

                  ))}

                </div>

              </div>

              {/* Weaknesses */}
              <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-xl hover:shadow-[0_0_40px_rgba(239,68,68,0.2)] transition-all duration-500">

                <h3 className="text-3xl font-bold text-red-400 mb-6">
                  {text.weaknesses}
                </h3>

                <div className="space-y-4">

                  {result.analysis.weaknesses.map((item: string, index: number) => (

                    <div
                      key={index}
                      className="rounded-2xl bg-black/30 border border-red-500/10 p-4 text-zinc-200"
                    >
                      {item}
                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* Judge Questions */}
            <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-8 backdrop-blur-xl mt-8 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500">

              <h3 className="text-3xl font-bold text-yellow-300 mb-6">
                {text.questions}
              </h3>

              <div className="space-y-4">

                {result.analysis.judge_questions.map((item: string, index: number) => (

                  <div
                    key={index}
                    className="rounded-2xl bg-black/30 border border-yellow-500/10 p-4 text-zinc-200"
                  >
                    {item}
                  </div>

                ))}

              </div>

            </div>

            {/* Verdict */}
            <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-8 backdrop-blur-xl mt-8 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all duration-500">

              <h3 className="text-3xl font-bold text-cyan-300 mb-6">
                {text.verdict}
              </h3>

              <p className="text-xl leading-relaxed text-zinc-200">
                {result.analysis.final_verdict}
              </p>

            </div>

          </motion.div>

        )}

      </div>

      <footer className="mt-8 mb-10 text-center relative z-10">

<div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-8" />

<p className="text-zinc-500 text-sm">
  Made with passion by
</p>

<h3 className="text-2xl font-black bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mt-2">
  Yassin Ali
</h3>

<div className="flex items-center justify-center gap-6 mt-6 flex-wrap">

  <a
    href="https://linktr.ee/yassin.ali"
    target="_blank"
    className="px-5 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:scale-105 transition"
  >
    Linktree
  </a>
<a
  href="https://github.com/YassinAliElDeeb"
  target="_blank"
  rel="noopener noreferrer"
  className="px-5 py-2 rounded-2xl bg-zinc-500/10 border border-zinc-500/20 text-zinc-300 hover:bg-zinc-500/20 hover:scale-105 transition-all duration-300"
>
  GitHub
</a>
  <a
    href="https://www.linkedin.com/in/yassinali30/"
    target="_blank"
    className="px-5 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:scale-105 transition"
  >
    LinkedIn
  </a>

</div>

</footer>

    </main>
  );
}