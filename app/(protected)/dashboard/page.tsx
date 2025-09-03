"use client";

import { useState } from "react";
import { Upload, BookOpen, Brain } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSubmitted(false);
    }
  };

  const handleSubmit = () => {
    if (file && title.trim()) {
      setSubmitted(true);
    }
  };

  const handleSummary = async () => {
    if (!file || !title.trim()) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`/api/${encodeURIComponent(title)}/summary`, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (!res.ok) {
            console.log(res);
          }
          res.json();
        })
        .catch((err) => {
          console.log("a", err);
          throw err;
        });

      router.push(`/summary/${encodeURIComponent(title)}`);
    } catch (err) {
      console.error("Error generating summary:", err);
      alert("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="absolute z-50 top-10 left-1/3 w-40 h-40 md:w-80 md:h-80 rounded-full bg-blue-500 opacity-30 blur-3xl animate-pop-blob"></div>
      <div className="absolute z-50 top-10 right-1/3 w-40 h-40 md:w-80 md:h-80 rounded-full bg-purple-500 opacity-30 blur-3xl animate-pop-blob"></div>
      <div className="min-h-screen dark text-white flex flex-col items-center px-4 md:px-6 py-5 relative overflow-hidden">
        <div className="text-center mb-10 pb-5 max-w-3xl relative z-10">
          <h1 className="text-3xl md:text-6xl font-bold leading-tight">
            Transform Your <span className="gradient-text">Learning</span>
          </h1>
          <p className="text-gray-400 mt-3 text-sm md:text-base">
            Upload your study materials and let AI create personalized summaries
            and practice questions
          </p>
        </div>

        <div className="w-full max-w-2xl relative z-10">
          {!submitted && (
            <>
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-xl p-8 md:p-10 cursor-pointer bg-black/30 backdrop-blur-lg hover:border-purple-400 transition-all duration-300"
              >
                <Upload className="h-10 w-10 text-gray-400 mb-3" />
                <p className="text-lg font-medium">
                  Upload your study material
                </p>
                <p className="text-sm text-gray-400 text-center">
                  Drag and drop your PDF files here, or click to browse
                </p>
                <input
                  id="file-upload"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {file && (
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    placeholder="Enter title for your material"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none"
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={!title.trim()}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 p-3 rounded-lg text-white font-semibold transition-all duration-300"
                  >
                    Submit
                  </button>
                </div>
              )}
            </>
          )}

          {submitted && file && (
            <div className="mt-6 p-5 bg-gray-900/70 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold mb-2">Uploaded Material</h3>
              <p className="text-sm text-gray-300">
                <span className="font-medium text-purple-400">Title:</span>{" "}
                {title}
              </p>
              <p className="text-sm text-gray-300 mt-1">
                <span className="font-medium text-purple-400">File:</span>{" "}
                {file.name}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center w-full relative z-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Choose Your <span className="gradient-text">Learning Mode</span>
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="bg-gray-900/50 p-6 md:p-8 rounded-xl shadow-lg w-56 h-40 flex flex-col items-center justify-center hover:border hover:border-purple-400 transition-all duration-300 cursor-pointer hover:bg-gray-800/50 animate-pop-blob">
              <BookOpen className="h-8 w-8 text-purple-400 mb-3" />
              <h3 className="font-semibold">
                {loading ? "Generating..." : "PYQs"}
              </h3>
              <p className="text-xs text-gray-400">Practice Questions</p>
            </div>

            <div
              onClick={handleSummary}
              className="bg-gray-900/50 p-6 md:p-8 rounded-xl shadow-lg w-56 h-40 flex flex-col items-center justify-center hover:border hover:border-purple-400 transition-all duration-300 cursor-pointer hover:bg-gray-800/50 animate-pop-blob"
            >
              <Brain className="h-8 w-8 text-purple-400 mb-3" />
              <h3 className="font-semibold">
                {loading ? "Generating..." : "Summary"}
              </h3>
              <p className="text-xs text-gray-400">Smart Summaries</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
