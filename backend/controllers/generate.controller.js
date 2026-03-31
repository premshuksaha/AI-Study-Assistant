const User = require('../models/users.model');
const Notes = require('../models/notes.model');
const { generateContent } = require('../services/gemini.service');
const { buildPrompt } = require('../utils/prompt');

exports.generateNotes = async (req, res) => {
	try {
		const {
			topic,
			classLevel,
			examType,
			revisionMode = false,
			includeDiagram = false,
			includeChart = false,
		} = req.body;

		if (!topic) {
			return res.status(400).json({ message: 'Topic is required' });
		}

		const user = await User.findById(req.user?.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		if (user.credits < 10) {
			user.isCreditAvailable = false;
			await user.save();
			return res.status(403).json({ message: 'Insufficient credits' });
		}

		const prompt = buildPrompt({
			topic,
			classLevel,
			examType,
			revisionMode,
			includeDiagram,
			includeChart,
		});

		const aiResponse = await generateContent(prompt);

		const note = await Notes.create({
			user: user._id,
			topic,
			classLevel,
			examType,
			revisionMode,
			includeDiagram,
			includeChart,
			content: aiResponse,
		});

		user.credits -= 10;
		if (user.credits <= 0) {
			user.isCreditAvailable = false;
		}

		if (!Array.isArray(user.notes)) {
			user.notes = [];
		}

		user.notes.push(note._id);
		await user.save();

		return res.status(200).json({
			data: aiResponse,
			noteId: note._id,
			creditsLeft: user.credits,
		});
	} catch (error) {
		console.error('Generate notes error:', error);
		return res.status(500).json({
			message: 'Failed to generate notes',
			error: error.message,
		});
	}
};
