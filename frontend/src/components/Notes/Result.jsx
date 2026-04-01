import React from 'react';
import Markdown from '../Markdown';
import Mermaid from '../Mermaid';
import Recharts from '../Recharts';
import Download from '../Download';

const parseResult = (result) => {
	if (!result) return null;
	if (typeof result === 'object') return result;

	try {
		return JSON.parse(result);
	} catch {
		return null;
	}
};

const TOPIC_BUCKETS = [
	{ key: '⭐⭐⭐', title: 'Very Important Topics', tone: 'border-amber-400/40 bg-amber-500/10' },
	{ key: '⭐⭐', title: 'Important Topics', tone: 'border-cyan-400/40 bg-cyan-500/10' },
	{ key: '⭐', title: 'Frequently Asked Topics', tone: 'border-emerald-400/40 bg-emerald-500/10' },
];

const DotItem = ({ children, className = '' }) => (
	<li className={`flex items-start gap-2 rounded-md px-2.5 py-1.5 ${className}`}>
		<span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-violet-400/90" />
		<span>{children}</span>
	</li>
);

const isMermaidLike = (value) => {
	if (typeof value !== 'string') return false;
	const text = value.trim();
	if (!text) return false;

	return /(^|\n)\s*(graph|flowchart)\s+[A-Za-z]+\b/i.test(text)
		|| /-->/.test(text)
		|| /\[[^\]]+\]/.test(text);
};

function Result({ result }) {
	const parsed = parseResult(result);

	if (!result) {
		return (
			<div className='text-center mt-6'>
			    <p className="text-center bg-black/30 inline-block px-22 sm:px-8 md:px-60 lg:px-60 py-14 sm:py-6 md:py-30 lg:py-30 text-xs sm:text-sm md:text-base lg:text-sm text-zinc-400 rounded-2xl">
					📚 Generated notes will appear here.
				</p>
			</div>
            
		);
	}

	if (!parsed) {
		return (
			<div>
				<h3 className="text-lg text-zinc-100 px-2.5">Generated Result</h3>
				<pre className="mt-3 whitespace-pre-wrap rounded-2xl bg-black/30 p-4 text-sm leading-6 text-zinc-200">
					{String(result)}
				</pre>
			</div>
		);
	}

	const subTopics = parsed?.subTopics || {};
	const questions = parsed?.questions || {};

    const revisionPoints = Array.isArray(parsed?.revisionPoints) ? parsed.revisionPoints.filter(Boolean) : [];
    const hasRevisionPoints = revisionPoints.length > 0;

	const rawDiagramData = parsed?.diagram?.data;
	const questionDiagramField = questions?.diagram;

	const diagramData = typeof rawDiagramData === 'string' && rawDiagramData.trim()
		? rawDiagramData
		: '';
    const hasDiagram = typeof diagramData === 'string' && diagramData.trim().length > 0;

	const diagramQuestion = [
		parsed?.diagramQuestion,
		parsed?.diagram?.question,
		questionDiagramField,
	].find((value) => typeof value === 'string' && value.trim().length > 0 && !isMermaidLike(value)) || '';
	const hasDiagramQuestion = diagramQuestion.trim().length > 0;

    const chartItems = Array.isArray(parsed?.charts) ? parsed.charts : [];
	const hasCharts = chartItems.some(
		(chart) => Array.isArray(chart?.data) && chart.data.some((item) => item && item.name)
	);

	return (
		<div className="mt-4 space-y-6 bg-zinc-900 p-5">
			<div className="flex items-center justify-between gap-3">
				<h3 className="text-lg text-zinc-100">Generated Result</h3>
				<Download result={parsed} topic={parsed?.topic} />
			</div>

			<section className="space-y-3">
				<h4 className="text-base font-semibold text-zinc-100">Sub Topics</h4>
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{TOPIC_BUCKETS.map((bucket) => {
						const topics = Array.isArray(subTopics[bucket.key]) ? subTopics[bucket.key] : [];

						return (
							<div key={bucket.key} className={`rounded-2xl border p-4 ${bucket.tone}`}>
								<p className="mb-2 text-sm font-semibold text-zinc-100">{bucket.title}</p>
								{topics.length ? (
									<ul className="space-y-1 text-sm text-zinc-200">
										{topics.map((topic, index) => (
											<DotItem key={`${bucket.key}-${index}`}>{topic}</DotItem>
										))}
									</ul>
								) : (
									<p className="text-sm text-zinc-400">No topics found.</p>
								)}
							</div>
						);
					})}
				</div>
			</section>

			<section className="space-y-4 rounded-2xl border border-white/10 bg-black/25 p-5">
				<div className="flex flex-wrap items-center gap-2">
					<h4 className="text-base font-semibold text-zinc-100">Importance</h4>
					<span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs font-medium text-violet-200">
						{parsed?.importance || 'Not specified'}
					</span>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<h5 className="mb-2 text-sm font-semibold text-zinc-100">Short Questions</h5>
						{Array.isArray(questions.short) && questions.short.length ? (
							<ul className="space-y-2 text-sm text-zinc-200">
								{questions.short.map((question, index) => (
									<DotItem key={`short-${index}`} className="rounded-lg px-3 py-2">
										{question}
									</DotItem>
								))}
							</ul>
						) : (
							<p className="text-sm text-zinc-400">No short questions available.</p>
						)}
					</div>

					<div>
						<h5 className="mb-2 text-sm font-semibold text-zinc-100">Long Questions</h5>
						{Array.isArray(questions.long) && questions.long.length ? (
							<ul className="space-y-2 text-sm text-zinc-200">
								{questions.long.map((question, index) => (
									<DotItem key={`long-${index}`} className="rounded-lg px-3 py-2">
										{question}
									</DotItem>
								))}
							</ul>
						) : (
							<p className="text-sm text-zinc-400">No long questions available.</p>
						)}
					</div>
				</div>
			</section>

			<section className="space-y-3">
				<h4 className="text-base font-semibold text-zinc-100">Notes</h4>
				<Markdown content={parsed?.notes || ''} />
			</section>

			{hasRevisionPoints && (
				<section className="space-y-3 rounded-2xl border border-white/10 bg-black/25 p-5">
					<h4 className="text-base font-semibold text-zinc-100">Revision Points</h4>
					<ul className="space-y-2 text-sm text-zinc-200">
						{revisionPoints.map((point, index) => (
							<DotItem key={`revision-${index}`}>{point}</DotItem>
						))}
					</ul>
				</section>
			)}

			{(hasDiagram || hasDiagramQuestion) && (
				<section className="space-y-3">
					<h4 className="text-base font-semibold text-zinc-100">Diagram</h4>
					{hasDiagramQuestion && (
						<div className="rounded-xl border border-white/10 p-3 text-sm text-violet-100">
							<p className="mt-1">{diagramQuestion}</p>
						</div>
					)}
					{hasDiagram && <Mermaid chart={diagramData} />}
				</section>
			)}

			{hasCharts && (
				<section className="space-y-3">
					<h4 className="text-base font-semibold text-zinc-100">Charts</h4>
					<Recharts charts={chartItems} />
				</section>
			)}
		</div>
	);
}

export default Result;
