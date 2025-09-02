"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Topic {
  title: string;
  summary: string;
  details?: string;
}

export default function SummaryPage() {
  const { pdfName } = useParams();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(`/api/${pdfName}/summary`);
        if (!res.ok) throw new Error("Failed to fetch summary");

        const data = await res.json();
        setTopics(data.topics || []);
      } catch (err) {
        console.error(err);
        setTopics([{ title: "Error", summary: "Failed to load summary" }]);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [pdfName]);

  if (loading) return <p className="text-center mt-10">Loading summary...</p>;

  return (
    <div className="container mx-auto py-10 grid gap-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Summary for {pdfName}
      </h1>

      {topics.map((topic, idx) => (
        <div key={idx} className="rounded-2xl border p-6 shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
          <p className="mb-2 text-gray-700">{topic.summary}</p>
          {topic.details && (
            <p className="text-gray-500 text-sm whitespace-pre-line">
              {topic.details}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
