import React, { useEffect, useId, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
	startOnLoad: false,
	theme: 'dark',
	securityLevel: 'loose',
});

const toNodeId = (label, index) => {
	const normalized = String(label)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '_')
		.replace(/^_+|_+$/g, '');

	return normalized || `node_${index}`;
};

const normalizeChart = (chart) => {
	if (typeof chart !== 'string') return '';

	let value = chart
		.replace(/^```mermaid\s*/i, '')
		.replace(/^```\s*/i, '')
		.replace(/```$/i, '')
		.replace(/\\n/g, '\n')
		.trim();

	if (!value) return '';

	const lines = value.split('\n');
	const transformed = lines.map((line, index) => {
		const match = line.match(/^\s*\[([^\]]+)\]\s*-->\s*\[([^\]]+)\]\s*$/);
		if (!match) return line;

		const sourceLabel = match[1].trim();
		const targetLabel = match[2].trim();
		const sourceId = toNodeId(sourceLabel, index);
		const targetId = toNodeId(targetLabel, index + 100);

		return `${sourceId}[${sourceLabel}] --> ${targetId}[${targetLabel}]`;
	});

	if (!/^\s*(graph|flowchart)\b/i.test(transformed[0] || '')) {
		return `graph TD\n${transformed.join('\n')}`;
	}

	return transformed.join('\n');
};

function Mermaid({ chart }) {
	const [svg, setSvg] = useState('');
	const [error, setError] = useState('');
	const id = useId().replace(/:/g, '-');

	useEffect(() => {
		let isMounted = true;
		const normalizedChart = normalizeChart(chart);

		const renderDiagram = async () => {
			if (!normalizedChart) {
				setSvg('');
				setError('');
				return;
			}

			try {
				const renderId = `${id}-${Date.now()}`;
				const { svg: rendered } = await mermaid.render(renderId, normalizedChart);
				if (isMounted) {
					setSvg(rendered);
					setError('');
				}
			} catch {
				if (isMounted) {
					setSvg('');
					setError('Unable to render diagram for this topic.');
				}
			}
		};

		renderDiagram();

		return () => {
			isMounted = false;
		};
	}, [chart, id]);

	if (!chart) {
		return (
			<p className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-400">
				No diagram available.
			</p>
		);
	}

	return (
		<div className="rounded-2xl border border-white/10 bg-black/25 p-4">
			{error ? (
				<p className="text-sm text-amber-300">{error}</p>
			) : (
				<div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: svg }} />
			)}
		</div>
	);
}

export default Mermaid;
