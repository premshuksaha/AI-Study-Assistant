const PDFDocument = require('pdfkit');

exports.pdfDownload = async (req, res) => {
	try {
		const { result } = req.body;

		if (!result) {
			return res.status(400).json({ error: 'No content provided' });
		}

		const doc = new PDFDocument({ margin: 50 });

		const rawTopic = result.topic || req.body.topic || 'AI_Study_Notes';
		const safeTopic = String(rawTopic)
			.trim()
			.replace(/\s+/g, '_')
			.replace(/[^a-zA-Z0-9_-]/g, '')
			.slice(0, 60) || 'AI_Study_Notes';
		const now = new Date();
		const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
			now.getDate()
		).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(
			2,
			'0'
		)}-${String(now.getSeconds()).padStart(2, '0')}`;
		const fileName = `${safeTopic}_${timestamp}.pdf`;

		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

		doc.pipe(res);

		// Title
		doc.fontSize(20).text('AI Study Assistant', { align: 'center' });
		doc.moveDown();
		doc.fontSize(14).text(`Importance: ${result.importance || 'Not specified'}`);
		doc.moveDown();

		// Sub Topics
		doc.fontSize(16).text('Sub Topics');
		doc.moveDown(0.5);
		Object.entries(result.subTopics || {}).forEach(([star, topics]) => {
			doc.moveDown(0.5);
			doc.fontSize(13).text(`${star} Topics:`);

			(topics || []).forEach((t) => {
				doc.fontSize(12).text(`• ${t}`);
			});
		});

		doc.moveDown();

		// Notes
		doc.fontSize(16).text('Notes');
		doc.moveDown(0.5);
		doc.fontSize(12).text(String(result.notes || '').replace(/[#*`]/g, ''));

		doc.moveDown();

		// Revision Points
		doc.fontSize(16).text('Revision Points');
		doc.moveDown(0.5);
		(result.revisionPoints || []).forEach((p) => {
			doc.fontSize(12).text(`• ${p}`);
		});

		doc.moveDown();

		// Questions
		doc.fontSize(16).text('Important Questions');
		doc.moveDown(0.5);

		doc.fontSize(13).text('Short Questions:');
		((result.questions && result.questions.short) || []).forEach((q) => {
			doc.fontSize(12).text(`• ${q}`);
		});

		doc.moveDown(0.5);
		doc.fontSize(13).text('Long Questions:');
		((result.questions && result.questions.long) || []).forEach((q) => {
			doc.fontSize(12).text(`• ${q}`);
		});

		doc.moveDown(0.5);
		doc.fontSize(13).text('Diagram Question:');
		doc.fontSize(12).text(result.questions?.diagram || 'N/A');

		doc.end();
	} catch (error) {
		console.error('PDF download error:', error);
		return res.status(500).json({ error: 'Failed to generate PDF' });
	}
};
