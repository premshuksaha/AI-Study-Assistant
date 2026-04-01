import React from 'react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const COLORS = ['#22c55e', '#06b6d4', '#f59e0b', '#8b5cf6', '#ef4444', '#14b8a6'];

const normalizeData = (data) => {
	if (!Array.isArray(data)) return [];
	return data
		.filter((item) => item && typeof item.name === 'string')
		.map((item) => ({
			name: item.name,
			value: Number(item.value) || 0,
		}));
};

function Recharts({ charts }) {
	if (!Array.isArray(charts) || charts.length === 0) {
		return (
			<p className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-400">
				No charts available.
			</p>
		);
	}

	return (
		<div className="grid gap-4 lg:grid-cols-2">
			{charts.map((chart, index) => {
				const chartData = normalizeData(chart?.data);
				if (!chartData.length) return null;

				const type = (chart?.type || '').toLowerCase();

				return (
					<div
						key={`${chart?.title || 'chart'}-${index}`}
						className="rounded-2xl border border-white/10 bg-black/25 p-4"
					>
						<h4 className="mb-3 text-sm font-semibold text-zinc-100">{chart?.title || 'Chart'}</h4>

						<div className="h-72 w-full">
							{type === 'bar' && (
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={chartData}>
										<CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
										<XAxis dataKey="name" stroke="#d4d4d8" />
										<YAxis stroke="#d4d4d8" />
										<Tooltip />
										<Legend />
										<Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />
									</BarChart>
								</ResponsiveContainer>
							)}

							{type === 'line' && (
								<ResponsiveContainer width="100%" height="100%">
									<LineChart data={chartData}>
										<CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
										<XAxis dataKey="name" stroke="#d4d4d8" />
										<YAxis stroke="#d4d4d8" />
										<Tooltip />
										<Legend />
										<Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3} />
									</LineChart>
								</ResponsiveContainer>
							)}

							{type === 'pie' && (
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={chartData}
											dataKey="value"
											nameKey="name"
											cx="50%"
											cy="50%"
											outerRadius={90}
											label
										>
											{chartData.map((entry, cellIndex) => (
												<Cell key={`${entry.name}-${cellIndex}`} fill={COLORS[cellIndex % COLORS.length]} />
											))}
										</Pie>
										<Tooltip />
										<Legend />
									</PieChart>
								</ResponsiveContainer>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Recharts;
