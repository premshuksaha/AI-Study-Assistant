const Notes = require('../models/notes.model');

exports.getMyNotes = async (req, res) => {
	try {
		const userId = req.user?.id;

		const notes = await Notes.find({ user: userId })
			.select('topic classLevel examType createdAt')
			.sort({ createdAt: -1 });

		return res.status(200).json(notes);
	} catch (error) {
		return res.status(500).json({ message: `getCurrentUser notes error ${error}` });
	}
};

exports.getNotes = async (req, res) => {
	try {
		const userId = req.user?.id;

		const notes = await Notes.findOne({
			_id: req.params.id,
			user: userId,
		});

		if (!notes) {
			return res.status(404).json({
				error: 'Note not found',
			});
		}

		return res.status(200).json({ content: notes.content , topic: notes.topic });
	} catch (error) {
		return res.status(500).json({ message: `getNotes error ${error}` });
	}
};
