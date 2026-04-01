import React from 'react'

const formatDate = (value) => {
  if (!value) return 'Unknown date';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown date';

  return date.toLocaleString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const Noteshistory = ({ notes = [], loading = false, selectedNoteId, onSelect }) => {
  return (
    <aside className="rounded-2xl p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-zinc-100">Your Notes</h2>
        <p className="text-sm text-zinc-400">Click any note to view full content.</p>
      </div>

      {loading && <p className="text-sm text-zinc-400">Loading note history...</p>}

      {!loading && notes.length === 0 && (
        <p className="text-center rounded-xl bg-black/20 border border-black/30 p-4 text-sm text-zinc-200">
          No notes found yet.
        </p>
      )}

      {!loading && notes.length > 0 && (
        <div className="space-y-2 overflow-y-auto pr-1">
          {notes.map((note) => {
            const isActive = selectedNoteId === note?._id;

            return (
              <button
                key={note?._id}
                type="button"
                onClick={() => onSelect?.(note?._id)}
                className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                  isActive
                    ? 'border-violet-400/70 bg-violet-500/20'
                    : 'border-white/10 bg-black/20 hover:border-white/20 hover:bg-black/30'
                }`}
              >
                <h3 className="line-clamp-1 text-sm font-semibold text-zinc-100">{note?.topic || 'Untitled Topic'}</h3>
                <p className="mt-1 text-xs text-zinc-400">
                  {note?.classLevel || 'Class not set'}
                  {' · '}
                  {note?.examType || 'Exam not set'}
                </p>
                <p className="mt-2 text-xs text-zinc-500">{formatDate(note?.createdAt)}</p>
              </button>
            );
          })}
        </div>
      )}
    </aside>
  )
}

export default Noteshistory