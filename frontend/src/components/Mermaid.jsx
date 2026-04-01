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

const parseNodeToken = (token, index) => {
	const trimmed = String(token || '').trim();
	const withIdMatch = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\[([^\]]+)\]$/);

	if (withIdMatch) {
		return {
			id: withIdMatch[1],
			label: withIdMatch[2].trim(),
		};
	}

	const bracketOnlyMatch = trimmed.match(/^\[([^\]]+)\]$/);
	if (bracketOnlyMatch) {
		const label = bracketOnlyMatch[1].trim();
		return {
			id: toNodeId(label, index),
			label,
		};
	}

	return null;
};

const getDirection = (input) => {
	const directionMatch = String(input || '').match(/^\s*(graph|flowchart)\s+([A-Za-z]+)\b/i);
	if (!directionMatch) return 'TD';
	return directionMatch[2].toUpperCase();
};

const rebuildCompactEdges = (input) => {
	const edgeRegex = /([A-Za-z_][A-Za-z0-9_]*\[[^\]]+\]|\[[^\]]+\])\s*-->\s*([A-Za-z_][A-Za-z0-9_]*\[[^\]]+\]|\[[^\]]+\])/g;
	const matches = Array.from(String(input || '').matchAll(edgeRegex));

	if (!matches.length) return '';

	const direction = getDirection(input);
	const idMap = new Map();
	let counter = 0;

	const resolveNode = (token) => {
		const parsed = parseNodeToken(token, counter);
		if (!parsed) return null;

		if (!idMap.has(parsed.id)) {
			idMap.set(parsed.id, parsed.label);
			counter += 1;
		}

		return parsed;
	};

	const edges = matches
		.map((match) => {
			const source = resolveNode(match[1]);
			const target = resolveNode(match[2]);
			if (!source || !target) return '';
			return `${source.id}[${source.label}] --> ${target.id}[${target.label}]`;
		})
		.filter(Boolean);

	if (!edges.length) return '';

	return `graph ${direction}\n${edges.join('\n')}`;
};

const rebuildBracketOnlyEdges = (input) => {
	const edgeRegex = /\[([^\]]+)\]\s*-->\s*\[([^\]]+)\]/g;
	const matches = Array.from(input.matchAll(edgeRegex));

	if (!matches.length) return '';

	const idMap = new Map();
	let counter = 0;

	const getId = (label) => {
		const key = label.trim();
		if (!idMap.has(key)) {
			idMap.set(key, toNodeId(key, counter));
			counter += 1;
		}
		return idMap.get(key);
	};

	const edges = matches.map((match) => {
		const sourceLabel = match[1].trim();
		const targetLabel = match[2].trim();
		const sourceId = getId(sourceLabel);
		const targetId = getId(targetLabel);

		return `${sourceId}[${sourceLabel}] --> ${targetId}[${targetLabel}]`;
	});

	return `graph TD\n${edges.join('\n')}`;
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

	const compact = rebuildCompactEdges(value);
	if (compact) return compact;

	const rebuilt = rebuildBracketOnlyEdges(value);
	if (rebuilt) return rebuilt;

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
				await mermaid.parse(normalizedChart, { suppressErrors: false });
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
