import React from 'react';

const formatResult = (result) => {
	if (!result) return '';
	if (typeof result === 'string') return result;

	try {
		return JSON.stringify(result, null, 2);
	} catch {
		return String(result);
	}
};

function Result({ result }) {
	if (!result) {
		return (
			<div className='text-center mt-3'>
			    <p className="bg-black/30 inline-block px-60 py-30 text-sm text-zinc-400 rounded-2xl">
					Generated notes will appear here.
				</p>
			</div>
		);
	}

	return (
		<div >
			<h3 className="text-lg text-zinc-100 px-2.5">Generated Result</h3>
			<pre className="mt-3 whitespace-pre-wrap bg-black/30 p-4 text-sm leading-6 text-zinc-200">
				{formatResult(result)}
			</pre>
		</div>
	);
}

export default Result;
