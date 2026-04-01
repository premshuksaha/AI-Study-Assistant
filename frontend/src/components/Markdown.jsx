import React from 'react';
import ReactMarkdown from 'react-markdown';

function Markdown({ content }) {
	if (!content) {
		return (
			<p className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-400">
				No notes available.
			</p>
		);
	}

	return (
		<div className="rounded-2xl border border-white/10 bg-black/25 p-5 text-zinc-200">
			<ReactMarkdown
				components={{
					h1: ({ children }) => <h1 className="mb-3 text-xl font-semibold text-zinc-100">{children}</h1>,
					h2: ({ children }) => <h2 className="mb-2 mt-4 text-lg font-semibold text-zinc-100">{children}</h2>,
					h3: ({ children }) => <h3 className="mb-2 mt-3 text-base font-semibold text-zinc-100">{children}</h3>,
					p: ({ children }) => <p className="mb-2 leading-7 text-zinc-200">{children}</p>,
					ul: ({ children }) => <ul className="mb-3 list-disc space-y-1 pl-5 text-zinc-200">{children}</ul>,
					ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1 pl-5 text-zinc-200">{children}</ol>,
					li: ({ children }) => <li className="leading-6">{children}</li>,
					code: ({ children }) => (
						<code className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-xs text-emerald-300">{children}</code>
					),
					strong: ({ children }) => <strong className="font-semibold text-zinc-100">{children}</strong>,
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}

export default Markdown;
