import React from 'react'
import Markdown from '../Markdown';
import Mermaid from '../Mermaid';
import Recharts from '../Recharts';
import { IoIosArrowBack } from "react-icons/io";

const parseContent = (rawContent) => {
  if (!rawContent) return null;
  if (typeof rawContent === 'object') return rawContent;

  try {
    return JSON.parse(rawContent);
  } catch {
    return { notes: String(rawContent) };
  }
};

function Notes({ note, loading = false, onBack }) {
  if (loading) {
    return (
      <section className="rounded-2xl border border-white/10 bg-black/25 p-6">
        <p className="text-sm text-zinc-400">Loading note details...</p>
      </section>
    );
  }

  if (!note) {
    return (
      <section className="rounded-2xl border border-white/10 bg-black/25 p-6">
        <p className="text-sm text-zinc-400">Select a note from history to view details.</p>
      </section>
    );
  }

  const parsed = parseContent(note?.content);
  const topic = note?.topic || parsed?.topic || 'Note';
  const noteMarkdown = parsed?.notes || '';
  const diagram = parsed?.diagram?.data || '';
  const charts = Array.isArray(parsed?.charts) ? parsed.charts : [];

  return (
    <section className="space-y-4 rounded-2xl p-5">
      <div>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mb-3 rounded-lg border border-white/20 bg-black/20 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-white/35"
          >
            <IoIosArrowBack className="inline mr-1.5" />
            Back
          </button>
        )}
        <h2 className="text-xl font-semibold text-zinc-100">{topic}</h2>
        <p className="mt-1 text-sm text-zinc-400">Detailed view of the selected note.</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold text-zinc-100">Markdown Notes</h3>
        <Markdown content={noteMarkdown} />
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold text-zinc-100">Mermaid Diagram</h3>
        <Mermaid chart={diagram} />
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold text-zinc-100">Charts</h3>
        <Recharts charts={charts} />
      </div>
    </section>
  )
}

export default Notes